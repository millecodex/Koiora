// search for transactions associated with a contract
// output a tx count, the block number, hash, and data
// write the data to 'transactions.txt'
const { Network, Alchemy } = require("alchemy-sdk");
const API_KEY = process.env.ALCHEMY_API_KEY;

const settings = {
  apiKey: API_KEY,
  // examples of Networks:
  //network: Network.MATIC_MAINNET
  //network: Network.ETH_MAINNET
  network: Network.MATIC_MUMBAI
};

const fs = require('fs');
const alchemy = new Alchemy(settings);

// getLogs retrieves all activity associated with the contract address
async function getTransactions() {
  let transactions = await alchemy.core.getLogs({
      fromBlock: 'earliest', //1D69B14, //30841620 decimal
      toBlock: 'latest',
      address: '0x1a61eCd9d21610B0E8c315d57a0730848494E072'
  });
  return transactions;
}

async function getData(transactions) {
  let data = [];
  for (let i = 0; i < transactions.length; i++) {
      let tx = transactions[i];
      data.push(tx.data);
  }
  return data;
}

// just pull blockNumber, transactionHash, and data for prettyprinting
async function getDataSubset(transactions) {
  let dataSS = transactions.map(tx => {
    return {
      blockNumber: tx.blockNumber,
      transactionHash: tx.transactionHash,
      data: tx.data
    }
  });
  return dataSS;
}

// search the tx log for a specific value and print to the console
function searchData(data, searchValue) {
  console.log(`Searching for ${searchValue}`);
  let found = data.filter(tx => tx.data === searchValue);
  if(found.length > 0) {
    console.log(`I found ${found.length} matching results:`);
    let foundData = found.map(tx => {
        return {      
          blockNumber: tx.blockNumber,
          transactionHash: tx.transactionHash,
          data: tx.data
        }
    });
    foundData.forEach(result => {
      console.log(result);
    });
    return foundData;
  } else {
    console.log(`No data found for value ${searchValue}`);
    return `No data found for value ${searchValue}`;
  }
}

async function main() {
  let transactions = await getTransactions();
  let data = await getData(transactions);
  let dataSS = await getDataSubset(transactions);
  fs.writeFileSync('transactions.txt', JSON.stringify(transactions, null, 2), 'utf8');
  console.log(`I found ${dataSS.length} transactions in total. The full data has been written to transactions.txt.\n`);
  
  // output a pretty table of all txs
  //console.table(dataSS);

  // search for a specific value
  let searchValue = '0x2e99758548972a8e8822ad47fa1017ff72f06f3ff6a016851f45c398732bc50c';
  let searchResult = searchData(dataSS,searchValue);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
});
