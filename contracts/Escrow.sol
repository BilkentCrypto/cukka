// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

interface IERC20 {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 value) external returns (bool);
}

contract GitHubFunding {
    address public owner;
    address public usdcAddress;

    mapping(string => uint256) public ethBalances;
    mapping(string => uint256) public usdcBalances;

    event FundsDeposited(string indexed username, uint256 amount, bool isETH);
    event FundsClaimed(string indexed username, uint256 amount, bool isETH);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    constructor(address _usdcAddress) {
        owner = msg.sender;
        usdcAddress = _usdcAddress;
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

    function claimETH(string calldata username) external {
        uint256 amount = ethBalances[username];
        require(amount > 0, "No ETH balance to claim");
        payable(msg.sender).transfer(amount);
        ethBalances[username] = 0;
        emit FundsClaimed(username, amount, true);
    }

    function claimUSDC(string calldata username) external {
        uint256 amount = usdcBalances[username];
        require(amount > 0, "No USDC balance to claim");
        IERC20(usdcAddress).transfer(msg.sender, amount);
        usdcBalances[username] = 0;
        emit FundsClaimed(username, amount, false);
    }
}