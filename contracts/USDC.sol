// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

//Arbitrum Sepolia: 0xF50876b0c719c828aEfb87ECAECE1DadaaE7A3D4
contract USDCToken is ERC20 {
    constructor()
        ERC20("USDC Token", "USDC")
    {
        _mint(msg.sender, 10000 * 10 ** decimals());
    }

    function mint(address to, uint256 amount) public {
        _mint(to, amount * 10**decimals());
    }
}
