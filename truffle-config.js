const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  networks: {
    shibarium: {
      provider: () => new HDWalletProvider('various plate lecture ocean odor hat load require episode lens struggle defy', 'https://rpc.shibrpc.com'),
      network_id: 109, // Shibarium Mainnet network ID
      gas: 5000000,
      gasPrice: 1000000000 // 1 Gwei
    },
    puppynet: {
      provider: () => new HDWalletProvider('various plate lecture ocean odor hat load require episode lens struggle defy', 'https://puppynet.shibrpc.com'),
      network_id: 157, // Shibarium Puppynet (Testnet) network ID
      gas: 5000000,
      gasPrice: 1000000000 // 1 Gwei
    }
  },
  compilers: {
    solc: {
      version: "^0.8.0"
    }
  }
};
