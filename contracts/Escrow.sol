// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {FunctionsClient} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/FunctionsClient.sol";
import {FunctionsRequest} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/libraries/FunctionsRequest.sol";

interface IERC20 {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 value) external returns (bool);
}

contract GitHubFunding is FunctionsClient {
    using FunctionsRequest for FunctionsRequest.Request;
    
    address public owner;
    address public usdcAddress;
    uint64 public subscriptionId;

    address router = 0x234a5fb5Bd614a7AA2FfAB244D603abFA0Ac5C5C;
    bytes32 donID =
        0x66756e2d617262697472756d2d7365706f6c69612d3100000000000000000000;

    mapping(string => uint256) public ethBalances;
    mapping(string => uint256) public usdcBalances;

    struct RequestStatus {
        bool fulfilled; // whether the request has been successfully fulfilled
        bool exists; // whether a requestId exists
        bytes response;
        bytes err;
    }
    mapping(bytes32 => RequestStatus) public requests; /* requestId --> requestStatus */          
    bytes32[] public requestIds;

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
    event FundsClaimed(string indexed username, uint256 amount, bool isETH);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    constructor(address _usdcAddress, uint64 _subscriptionId) FunctionsClient(router) {
        owner = msg.sender;
        usdcAddress = _usdcAddress;
        subscriptionId = _subscriptionId;
    }

    function transferETH(string calldata username) external payable {
        require(msg.value > 0, "Deposit must be > 0");
        ethBalances[username] += msg.value;
        emit FundsDeposited(username, msg.value, true);
    }

    function transferUSDC(string calldata username, uint256 amount) external {
        require(amount > 0, "Deposit must be > 0");
        IERC20(usdcAddress).transferFrom(msg.sender, address(this), amount);
        usdcBalances[username] += amount;
        emit FundsDeposited(username, amount, false);
    }

    function claimETH(string calldata username, string memory test) external {
        uint256 amount = ethBalances[username];
        require(amount > 0, "No ETH balance to claim");

        string[] memory args = new string[](1);
        args[0] = test;

        FunctionsRequest.Request memory req;
        req.initializeRequestForInlineJavaScript(source);
        if (args.length > 0) req.setArgs(args); 
        //payable(msg.sender).transfer(amount);
        //ethBalances[username] = 0;
        
        emit FundsClaimed(username, amount, true);
    }

    // Receive the weather in the city requested
    function fulfillRequest(
        bytes32 requestId,
        bytes memory response,
        bytes memory err
    ) internal override {
        require(requests[requestId].exists, "request not found");

    }

    function claimUSDC(string calldata username) external {
        uint256 amount = usdcBalances[username];
        require(amount > 0, "No USDC balance to claim");
        IERC20(usdcAddress).transfer(msg.sender, amount);
        usdcBalances[username] = 0;
        emit FundsClaimed(username, amount, false);
    }
}