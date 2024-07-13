// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {FunctionsClient} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/FunctionsClient.sol";
import {FunctionsRequest} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/libraries/FunctionsRequest.sol";
import "@openzeppelin/contracts@4.9.3/token/ERC20/IERC20.sol";

contract GitHubFunding is FunctionsClient {
    using FunctionsRequest for FunctionsRequest.Request;


    // usdc: 0xF50876b0c719c828aEfb87ECAECE1DadaaE7A3D4

    address public owner;
    address public usdcAddress;
    uint64 public subscriptionId;

    //fees
    uint256 public totalEthFees;
    uint256 public totalUsdcFees;


    address router = 0x234a5fb5Bd614a7AA2FfAB244D603abFA0Ac5C5C;
    uint32 gasLimit = 300000;
    bytes32 donID =
        0x66756e2d617262697472756d2d7365706f6c69612d3100000000000000000000;

    // Define platforms
    enum Platform {
        GitHub,
        Twitter
    }

    mapping(bytes32 => uint256) public ethBalances;
    mapping(bytes32 => uint256) public usdcBalances;

    mapping(bytes32 => RequestIdentity) public requestToAddress; /* requestId --> requestStatus */
    bytes32[] public requestIds;

    struct RequestIdentity {
        address payee;
        string username;
        Platform platform;
    }

    string public source =
        "const accessToken = args[0];"
        "const username = args[1];"
        "const url = 'https://api.github.com/user';"
        "const githubRequest = Functions.makeHttpRequest({"
        "  url: url,"
        "  method: 'GET',"
        "  headers: {'Authorization':  'Bearer ' + accessToken}"
        "});"
        "const githubResponse = await githubRequest;"
        "if (githubResponse.error) {"
        "  console.error(githubResponse.error);"
        "  throw Error('Request failed');"
        "};"
        "const result = (githubResponse.data.login == username) ? 1 : 0;"
        "return Functions.encodeUint256(result);";

    event FundsDeposited(string indexed username, uint256 amount, bool isETH);
    event FundsClaimed(string indexed username, uint256 amount);
    event ClaimRequestSent(string indexed username, bytes32 requestId);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    constructor(address _usdcAddress, uint64 _subscriptionId)
        FunctionsClient(router)
    {
        owner = msg.sender;
        usdcAddress = _usdcAddress;
        subscriptionId = _subscriptionId;
    }

    function depositFunds(
        string calldata username,
        Platform platform,
        uint256 amount,
        bool isETH
    ) external payable {
        bytes32 userKey = keccak256(abi.encodePacked(platform, username));
        if (isETH) {
            require(
                msg.value > 0,
                "ETH amount mismatch"
            );
            ethBalances[userKey] += msg.value;
        } else {
            require(amount > 0, "USDC amount must be > 0");
            IERC20(usdcAddress).transferFrom(msg.sender, address(this), amount);
            usdcBalances[userKey] += amount;
        }
        emit FundsDeposited(
            encodePlatformUser(username, platform),
            amount,
            isETH
        );
    }

    function sendClaimRequest(
        string calldata username,
        string calldata accessToken,
        Platform platform
    ) external {
        bytes32 userKey = keccak256(abi.encodePacked(platform, username));
        uint256 amountETH = ethBalances[userKey];
        uint256 amountUSDC = usdcBalances[userKey];
        require((amountETH > 0) || (amountUSDC > 0), "No balance to claim");

        bytes32 requestId = initializeFunctionsRequest(
            username,
            accessToken,
            platform,
            msg.sender
        );
        emit ClaimRequestSent(
            encodePlatformUser(username, platform),
            requestId
        );
    }

    function initializeFunctionsRequest(
        string memory username,
        string memory accessToken,
        Platform platform,
        address caller
    ) internal returns (bytes32) {
        FunctionsRequest.Request memory req;
        string[] memory args = new string[](2);
        args[0] = accessToken;
        args[1] = username;

        if (args.length > 0) req.setArgs(args);

        req.initializeRequestForInlineJavaScript(source); // Assuming a valid source for external API
        bytes32 requestId = _sendRequest(
            req.encodeCBOR(),
            subscriptionId,
            gasLimit,
            donID
        );
        requestToAddress[requestId] = RequestIdentity(
            caller,
            username,
            platform
        );
        return requestId;
    }

    function fulfillRequest(
        bytes32 requestId,
        bytes memory response,
        bytes memory err
    ) internal override {
        RequestIdentity memory identity = requestToAddress[requestId];

        require(identity.payee != address(0), "Request not found");
        require(uint256(bytes32(response)) == 1, "Not authenticated");

        bytes32 userKey = keccak256(
            abi.encodePacked(identity.platform, identity.username)
        );
        uint256 ethAmount = ethBalances[userKey];
        uint256 usdcAmount = usdcBalances[userKey];

        if (ethAmount > 0) {
            uint256 ethFee = ethAmount / 100; // 1% fee
            uint256 ethToTransfer = ethAmount - ethFee;
            totalEthFees += ethFee;
            ethBalances[userKey] = 0;
            (bool ethSent, ) = payable(identity.payee).call{value: ethToTransfer}("");
            require(ethSent, "ETH Transfer failed");
        }

        if (usdcAmount > 0) {
            uint256 usdcFee = usdcAmount / 100; // 1% fee
            uint256 usdcToTransfer = usdcAmount - usdcFee;
            totalUsdcFees += usdcFee;
            usdcBalances[userKey] = 0;
            require(
                IERC20(usdcAddress).transfer(identity.payee, usdcToTransfer),
                "USDC Transfer failed"
            );
        }

        emit FundsClaimed(
            encodePlatformUser(identity.username, identity.platform),
            ethAmount + usdcAmount
        );
    }

    // withdraw fees
    function withdrawEthFees() external onlyOwner {
        uint256 amount = totalEthFees;
        require(amount > 0, "No ETH fees to withdraw");
        totalEthFees = 0;
        (bool sent, ) = payable(owner).call{value: amount}("");
        require(sent, "Failed to send ETH fees");
    }

    function withdrawUsdcFees() external onlyOwner {
        uint256 amount = totalUsdcFees;
        require(amount > 0, "No USDC fees to withdraw");
        totalUsdcFees = 0;
        require(IERC20(usdcAddress).transfer(owner, amount), "Failed to send USDC fees");
    }

    // Function to get the userKey for a given username and platform
    function getUserKey(string calldata username, Platform platform) external pure returns (bytes32) {
        return keccak256(abi.encodePacked(platform, username));
    }

    function encodePlatformUser(string memory username, Platform platform)
        private
        pure
        returns (string memory)
    {
        return
            string(
                abi.encodePacked(
                    platform == Platform.GitHub ? "GitHub:" : "Twitter:",
                    username
                )
            );
    }
}
