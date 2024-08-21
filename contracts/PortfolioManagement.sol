// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract PortfolioManagement {
    IERC20 public assetToken;
    
    mapping(address => uint256) public userHoldings;

    constructor(address _assetToken) {
        assetToken = IERC20(_assetToken);
    }

    function updateHoldings(address user, uint256 amount) external {
        require(assetToken.transferFrom(user, address(this), amount), "Transfer failed");
        userHoldings[user] += amount;
    }

    function getHoldings(address user) external view returns (uint256) {
        return userHoldings[user];
    }
}
