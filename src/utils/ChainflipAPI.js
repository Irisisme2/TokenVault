// utils/ChainflipAPI.js
import axios from 'axios';

const CHAINFLIP_API_URL = 'https://api.chainflip.io'; // Replace with actual Chainflip API URL

// Function to generate a deposit address
export const generateDepositAddress = async (fromToken, amount) => {
  try {
    const response = await axios.post(`${CHAINFLIP_API_URL}/generate-deposit-address`, {
      fromToken,
      amount,
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to generate deposit address: ' + error.message);
  }
};

// Function to execute swap via smart contract
export const executeSwap = async (fromToken, toToken, amount) => {
  try {
    const response = await axios.post(`${CHAINFLIP_API_URL}/execute-swap`, {
      fromToken,
      toToken,
      amount,
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to execute swap: ' + error.message);
  }
};

// Function to open a Deposit Channel
export const openDepositChannel = async (fromToken, amount, destinationChain, destinationAddress) => {
  try {
    const response = await axios.post(`${CHAINFLIP_API_URL}/open-deposit-channel`, {
      fromToken,
      amount,
      destinationChain,
      destinationAddress,
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to open deposit channel: ' + error.message);
  }
};

// Function to execute a direct vault trade
export const executeDirectVaultTrade = async (fromToken, toToken, amount, destinationAddress) => {
  try {
    const response = await axios.post(`${CHAINFLIP_API_URL}/direct-vault-trade`, {
      fromToken,
      toToken,
      amount,
      destinationAddress,
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to execute direct vault trade: ' + error.message);
  }
};
