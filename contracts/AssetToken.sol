// contracts/AssetToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract AssetToken is ERC20, Ownable {
    struct Asset {
        uint256 id;
        string name;
        address owner;
    }

    mapping(uint256 => Asset) public assets;
    uint256 public nextAssetId;

    constructor(string memory name, string memory symbol, address initialOwner) ERC20(name, symbol) {
        transferOwnership(initialOwner);
    }

    function createAsset(string memory name) public onlyOwner {
        uint256 assetId = nextAssetId++;
        assets[assetId] = Asset(assetId, name, msg.sender);
    }

    function getAsset(uint256 assetId) public view returns (Asset memory) {
        return assets[assetId];
    }

    // Additional functions here
}
