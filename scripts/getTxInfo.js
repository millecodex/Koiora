const { Network, Alchemy } = require("alchemy-sdk");
const API_KEY = process.env.ALCHEMY_API_KEY;

const settings = {
  apiKey: API_KEY,
  // examples of others:
  //network: Network.MATIC_MAINNET
  //network: Network.ETH_MAINNET
  network: Network.MATIC_MUMBAI
};

const alchemy = new Alchemy(settings);

async function main() {
  const latestBlock = await alchemy.core.getBlockNumber();
  console.log("The latest block number is", latestBlock);
  const txHash = "0xe32d30995238e0d043f99efc743642233991a230ddd0f6de54aee9fde51a887c";
  const txinfo = await alchemy.core.getTransactionReceipt(txHash);
  console.log("The info is", txinfo);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
});
