# Koiora Project
Proof of Concept for event logging to Polygon's Mumbai testnet. Polygon is an Ethereum layer 2.

## Pre-requirements
1. [npm](https://www.npmjs.com/)
> to update: `npm install npm@latest -g`
2. [node.js](https://nodejs.org/en/download/)
> instructions [here](https://learnubuntu.com/install-node/)

## Requirements
1. [Alchemy](https://www.alchemy.com/) provides a connection to the blockchain, in this case the Polygon testnet Mumbai. This is in lieu of running your own node.
> install: `npm install alchemy-sdk`
2. [Hardhat](https://hardhat.org/) provides a developer environment so that we can easily configure environments, settings, and tests.
> install: `npm install --save-dev hardhat`
3. [Ethers.js](https://docs.ethers.io/v5/) is a Javascript SDK that provides a nice developer experience when you're writing code by wrapping lower-level JSON-RPC API calls.
4. [dotenv](https://www.npmjs.com/package/dotenv) initiated in your working directory
> install: `npm install dotenv --save`

# Contracts
Two contracts have been deployed on Mumbai, they can be found in the `\contracts\` folder. The Public version allows anyone to call the contract and write data. The regular version is restricted to the contract owner with whitelist functionality.
1. `KoioraTestLogger.sol`
> contract address: `0xXXX`
2. `KoioraTestLoggerPublic.sol`
> contract address: `0x1a61eCd9d21610B0E8c315d57a0730848494E072`

# Writing to Polygon
Hardhat will handle the following workflow with the `update.js` script:
1. compile solidity contracts
2. create contract ABI
3. create blockchain transaction
4. send transaction to the chain

# Reading from Polygon
The Alchemy SDK is used to pull data from the blockchain. It works like a regular API; you need a developer api key from signing up.