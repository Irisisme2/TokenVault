// contracts/TokenTrade.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract TokenTrade is Ownable {
    IERC20 public assetToken;

    event TradeExecuted(address indexed buyer, address indexed seller, uint256 amount);

    constructor(IERC20 _assetToken) {
        assetToken = _assetToken;
    }

    function trade(address seller, uint256 amount) public {
        require(assetToken.balanceOf(seller) >= amount, "Insufficient balance");
        require(assetToken.transferFrom(seller, msg.sender, amount), "Transfer failed");
        emit TradeExecuted(msg.sender, seller, amount);
    }

    // Additional functions here
}
