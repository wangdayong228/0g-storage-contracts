// require("@nomicfoundation/hardhat-toolbox");
import { HardhatUserConfig } from "hardhat/config";
// import "@nomiclabs/hardhat-waffle";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-gas-reporter";

/** @type import('hardhat/config').HardhatUserConfig */
const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.16",
    settings: {
      outputSelection: {
        "*": {
          "*": [
            "evm.bytecode.object",
            "evm.deployedBytecode.object",
            "abi",
            "evm.bytecode.sourceMap",
            "evm.deployedBytecode.sourceMap",
            "metadata",
          ],
          "": ["ast"],
        },
      },
      evmVersion: "istanbul",
      // viaIR: true,
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    localtest: {
      url: "http://127.0.0.1:8545",
      accounts: [
        "46b9e861b63d3509c88b7817275a30d22d62c8cd8fa6486ddee35ef0d8e0495f",
      ],
    },
    ecfx_test: {
      url: "https://evmtestnet.confluxrpc.com",
      accounts: [
        "7c5da44cf462b81e0b61a582f8c9b23ca78fc23e7104138f4e4329a9b2076e23",//0x26154DF6A79a6C241b46545D672A3Ba6AE8813bE
      ]
    },
    bsc: {
      url: "https://bsc-testnet.publicnode.com",
      accounts: [
        "36b9e861b63d3509c88b7817275a30d22d62c8cd8fa6486ddee35ef0d8e0495f",
      ],
    },
    conflux: {
      url: "http://evmtestnet.confluxrpc.com",
      accounts: [
        "36b9e861b63d3509c88b7817275a30d22d62c8cd8fa6486ddee35ef0d8e0495f",
      ],
    },
    zg: {
      url: "https://rpc-testnet.0g.ai",
      accounts: [
        "36b9e861b63d3509c88b7817275a30d22d62c8cd8fa6486ddee35ef0d8e0495f",
      ],
    }
  },
  gasReporter: {
    currency: 'Gwei',
    gasPrice: 10,
    enabled: false,
  }
};

export default config;
