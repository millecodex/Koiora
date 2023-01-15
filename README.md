# Koiora Project
Koiora project[^1] is a proof of concept for event logging to Polygon's Mumbai testnet. [Polygon](https://polygon.technology/) is an Ethereum layer 2. Essentially this is immutable timestamping with a blockchain that is quick and cheap and can be easily verified at some point in the future, possibly by third parties that are given access to the source logs. It should be quick to post and confirm transactions, cheap for high volume throughput with low gas fees, and verifiable by reading from the chain and comparing a hash output.
[^1]: Koiora means 'life' in [M&#x0101;ori](https://maoridictionary.co.nz/search?idiom=&phrase=&proverb=&loan=&histLoanWords=&keywords=koiora)

## Pre-requirements
1. [npm](https://www.npmjs.com/)\
   to update: `npm install npm@latest -g`
2. [node.js](https://nodejs.org/en/download/)\
   install instructions [here](https://learnubuntu.com/install-node/)

## Requirements
1. [Alchemy](https://www.alchemy.com/) provides a connection to the blockchain, in this case the Polygon testnet Mumbai. This is in lieu of running your own node.\
   install: `npm install alchemy-sdk`
2. [Hardhat](https://hardhat.org/) provides a developer environment so that we can easily configure environments, settings, and tests.\
   install: `npm install --save-dev hardhat`
3. [Ethers.js](https://docs.ethers.io/v5/) is a Javascript SDK that provides a nice developer experience when you're writing code by wrapping lower-level JSON-RPC API calls. Ethers is implicitly available within Hardhat.
4. [dotenv](https://www.npmjs.com/package/dotenv) initiated in your working directory\
   install: `npm install dotenv --save`

# Contracts
Two contracts have been deployed on Mumbai, they can be found in the `contracts` folder. The Public version allows anyone to call the contract and write data. The regular version is restricted to the contract owner with whitelist functionality.
1. `KoioraTestLogger.sol`\
   contract address: `0x2b7e6291E5eAACd2f8515b007850622807e8F994`, ([polygonscan](https://mumbai.polygonscan.com/address/0x2b7e6291e5eaacd2f8515b007850622807e8f994))
2. `KoioraTestLoggerPublic.sol`\
   contract address: `0x1a61eCd9d21610B0E8c315d57a0730848494E072`, ([polygonscan](https://mumbai.polygonscan.com/address/0x1a61eCd9d21610B0E8c315d57a0730848494E072))

# Writing to Polygon
Hardhat will handle the following workflow with the `update.js` script:
1. compile solidity contracts
2. create contract ABI
3. create blockchain transaction
4. send transaction to the chain

```
npx hardhat run scripts/update.js
```

The function call returns a transaction hash:
```js
async function main() {
    const setTx = await KoioraTestLoggerContract.writeHash(hash);
    await setTx.wait();
    console.log("Transaction hash: " + setTx.hash);
}
```

# Reading from Polygon
The [Alchemy SDK](https://docs.alchemy.com/) is used to pull data from the blockchain. It works like a regular API; you need a developer api key from signing up with Alchemy. The API follows a JSON-RPC standard. JSON-RPC is a stateless, lightweight, remote procedure call (RPC) protocol that is commonly used when interacting with Ethereum.

The `getTxInfo.js` script takes in a transaction hash and retrieves the receipt with `getTransactionReceipt`. Code examples (in myriad languages) can be found on the [docs](https://docs.alchemy.com/reference/sdk-gettransactionreceipt) page. 

```js
async function main() {
  //pass a transaction hash
  const txHash = "0xe32d30995238e0d043f99efc743642233991a230ddd0f6de54aee9fde51a887c";
  const txinfo = await alchemy.core.getTransactionReceipt(txHash);
  console.log("The info is", txinfo);
}
```

### Full Receipt data (JSON)
```json5
{
  to: '0x1a61eCd9d21610B0E8c315d57a0730848494E072',
  from: '0xA9889c0819B7F83c36C7aFBB176Eae59637be780',
  contractAddress: null,
  transactionIndex: 1,
  gasUsed: BigNumber { _hex: '0x5a8f', _isBigNumber: true },
  logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000008000000000000000000008000400000080000000000008004000000000000000004000000000000800000000000000000000100000000000000000000000000000000000002000000000000000000000080000000002000000000000000000000000000000000000000000000000000000000000000000000200000000000000000080000000000000000000000000000000000000000004000000000000000000001000000000100000000000000000000100100000000000000000000000000000000000000000000000010000000000000000000100000',
  blockHash: '0x484e0647ce4d431e56ca7d3d86da836a6d06bfb22b2f69bc7a25a9390d139c2f',
  transactionHash: '0xe32d30995238e0d043f99efc743642233991a230ddd0f6de54aee9fde51a887c',
  logs: [
    {
      transactionIndex: 1,
      blockNumber: 30879181,
      transactionHash: '0xe32d30995238e0d043f99efc743642233991a230ddd0f6de54aee9fde51a887c',
      address: '0x1a61eCd9d21610B0E8c315d57a0730848494E072',
      topics: [Array],
      data: '0x0eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
      logIndex: 2,
      blockHash: '0x484e0647ce4d431e56ca7d3d86da836a6d06bfb22b2f69bc7a25a9390d139c2f'
    },
    {
      transactionIndex: 1,
      blockNumber: 30879181,
      transactionHash: '0xe32d30995238e0d043f99efc743642233991a230ddd0f6de54aee9fde51a887c',
      address: '0x0000000000000000000000000000000000001010',
      topics: [Array],
      data: '0x00000000000000000000000000000000000000000000000000001fa091b841000000000000000000000000000000000000000000000000000586f7ef0307bb690000000000000000000000000000000000000000000001d5d6a627cedf8470850000000000000000000000000000000000000000000000000586d84e714f7a690000000000000000000000000000000000000000000001d5d6a6476f713cb185',
      logIndex: 3,
      blockHash: '0x484e0647ce4d431e56ca7d3d86da836a6d06bfb22b2f69bc7a25a9390d139c2f'
    }
  ],
  blockNumber: 30879181,
  confirmations: 10284,
  cumulativeGasUsed: BigNumber { _hex: '0xb137', _isBigNumber: true },
  effectiveGasPrice: BigNumber { _hex: '0x59682f0f', _isBigNumber: true },
  status: 1,
  type: 2,
  byzantium: true
}
```

The data we wrote to the chain is in the first logs.data field:
```
data: '0x0eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
```

# Verifying the Data
🏗️ under construction 🚧
