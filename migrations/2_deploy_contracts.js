// migrations/2_deploy_contracts.js
const AssetToken = artifacts.require("AssetToken");
const TokenTrade = artifacts.require("TokenTrade");

module.exports = async function (deployer, network, accounts) {
  const initialOwner = accounts[0]; // Use the first account as the initial owner

  // Deploy AssetToken
  await deployer.deploy(AssetToken, "AssetTokenName", "ATT", initialOwner);

  // Deploy TokenTrade
  await deployer.deploy(TokenTrade, initialOwner);
};
