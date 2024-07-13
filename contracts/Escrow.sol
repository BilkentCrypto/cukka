// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {FunctionsClient} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/FunctionsClient.sol";
import {FunctionsRequest} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/libraries/FunctionsRequest.sol";
import "@openzeppelin/contracts@4.9.3/token/ERC20/IERC20.sol";

contract GitHubFunding is FunctionsClient {
    using FunctionsRequest for FunctionsRequest.Request;

    address public owner;
    address public usdcAddress;
    uint64 public subscriptionId;

    address router = 0x234a5fb5Bd614a7AA2FfAB244D603abFA0Ac5C5C;
    uint32 gasLimit = 300000;
    bytes32 donID =
        0x66756e2d617262697472756d2d7365706f6c69612d3100000000000000000000;


    // Define platforms
    enum Platform { GitHub, Twitter }

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
        "const city = args[0];"
        "const apiResponse = await Functions.makeHttpRequest({"
        "url: `https://wttr.in/${city}?format=3&m`,"
        "responseType: 'text'"
        "});"
        "if (apiResponse.error) {"
        "throw Error('Request failed');"
        "}"
        "const { data } = apiResponse;"
        "return Functions.encodeString(data);";

    event FundsDeposited(string indexed username, uint256 amount, bool isETH);
    event FundsClaimed(string indexed username, uint256 amount);
    event ClaimRequestSent(string indexed username, bytes32 requestId);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    constructor(address _usdcAddress, uint64 _subscriptionId) FunctionsClient(router) {
        owner = msg.sender;
        usdcAddress = _usdcAddress;
        subscriptionId = _subscriptionId;
    }


    // function transferETH(string calldata username) external payable {
    //     require(msg.value > 0, "Deposit must be > 0");
    //     ethBalances[username] += msg.value;
    //     emit FundsDeposited(username, msg.value, true);
    // }

    // function transferUSDC(string calldata username, uint256 amount) external {
    //     require(amount > 0, "Deposit must be > 0");
    //     IERC20(usdcAddress).transferFrom(msg.sender, address(this), amount);
    //     usdcBalances[username] += amount;
    //     emit FundsDeposited(username, amount, false);
    // }

    function depositFunds(string calldata username, Platform platform, uint256 amount, bool isETH) external payable {
        bytes32 userKey = keccak256(abi.encodePacked(platform, username));
        if (isETH) {
            require(msg.value > 0 && msg.value == amount, "ETH amount mismatch");
            ethBalances[userKey] += msg.value;
        } else {
            require(amount > 0, "USDC amount must be > 0");
            IERC20(usdcAddress).transferFrom(msg.sender, address(this), amount);
            usdcBalances[userKey] += amount;
        }
        emit FundsDeposited(encodePlatformUser(username, platform), amount, isETH);
    }

    // function sendClaimRequest(string memory username, string memory test)
    //     external
    // {
    //     uint256 amountETH = ethBalances[username];
    //     uint256 amountUSDC = usdcBalances[username];
    //     require((amountETH > 0) || (amountUSDC > 0), "No balance to claim");

    //     bytes32 _requestID = initializeFunctionsRequest(
    //         test,
    //         username,
    //         msg.sender
    //     );
    //     //payable(msg.sender).transfer(amount);
    //     //ethBalances[username] = 0;

    //     emit ClaimRequestSent(username, _requestID);
    // }

    function sendClaimRequest(string calldata username, Platform platform) external {
        bytes32 userKey = keccak256(abi.encodePacked(platform, username));
        uint256 amountETH = ethBalances[userKey];
        uint256 amountUSDC = usdcBalances[userKey];
        require((amountETH > 0) || (amountUSDC > 0), "No balance to claim");

        bytes32 requestId = initializeFunctionsRequest(username, platform, msg.sender);
        emit ClaimRequestSent(encodePlatformUser(username, platform), requestId);
    }


    // function claimUSDC(string calldata username) external {
    //     uint256 amount = usdcBalances[username];
    //     require(amount > 0, "No USDC balance to claim");
    //     IERC20(usdcAddress).transfer(msg.sender, amount);
    //     usdcBalances[username] = 0;
    //     emit FundsClaimed(username, amount);
    // }

    function initializeFunctionsRequest(string memory username, Platform platform, address caller) internal returns (bytes32) {
        FunctionsRequest.Request memory req;
        req.initializeRequestForInlineJavaScript(source); // Assuming a valid source for external API
        bytes32 requestId = _sendRequest(req.encodeCBOR(), subscriptionId, gasLimit, donID);
        requestToAddress[requestId] = RequestIdentity(caller, username, platform);
        return requestId;
    }

    // // Receive authentication result from GitHub / Twitter
    // function fulfillRequest(
    //     bytes32 requestId,
    //     bytes memory response,
    //     bytes memory err
    // ) internal override {
    //     RequestIdentity memory _requestIdentity = requestToAddress[requestId];
    //     require(_requestIdentity.payee != address(0), "request not found");
    //     string memory username = _requestIdentity.username;

    //     uint256 ethAmount = ethBalances[username];
    //     uint256 usdcAmount = usdcBalances[username];

    //     if (usdcAmount > 0) {
    //         usdcBalances[username] = 0;
    //         IERC20(usdcAddress).transfer(_requestIdentity.payee, usdcAmount);

    //         emit FundsClaimed(username, usdcAmount);
    //     }

    //     if (ethAmount > 0) {
    //         ethBalances[username] = 0;
    //         (bool sent, ) = payable(_requestIdentity.payee).call{
    //             value: ethAmount
    //         }("");
    //         require(sent, "Not sent");

    //         emit FundsClaimed(username, ethAmount);
    //     }
    // }



    function fulfillRequest(bytes32 requestId, bytes memory response, bytes memory err) internal override {
        RequestIdentity memory identity = requestToAddress[requestId];
        require(identity.payee != address(0), "Request not found");

        bytes32 userKey = keccak256(abi.encodePacked(identity.platform, identity.username));
        uint256 ethAmount = ethBalances[userKey];
        uint256 usdcAmount = usdcBalances[userKey];

        if (ethAmount > 0) {
            ethBalances[userKey] = 0;
            (bool ethSent, ) = payable(identity.payee).call{value: ethAmount}("");
            require(ethSent, "ETH Transfer failed");
        }

        if (usdcAmount > 0) {
            usdcBalances[userKey] = 0;
            require(IERC20(usdcAddress).transfer(identity.payee, usdcAmount), "USDC Transfer failed");
        }

        emit FundsClaimed(encodePlatformUser(identity.username, identity.platform), ethAmount + usdcAmount);
        delete requestToAddress[requestId];
    }

    function encodePlatformUser(string memory username, Platform platform) private pure returns (string memory) {
        return string(abi.encodePacked(platform == Platform.GitHub ? "GitHub:" : "Twitter:", username));
    }

}