//update.js
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const hre = require("hardhat");
const ContractJson = require("../artifacts/contracts/KoioraTestLogger.sol/KoioraTestLogger.json");
const abi = ContractJson.abi;

// Provider
const alchemyProvider = new ethers.providers.AlchemyProvider(network="maticmum", ALCHEMY_API_KEY);

// Signer
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

// Contract
const KoioraTestLoggerContract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

// uncomment to print the ABI to the console
//console.log(JSON.stringify(ContractJson.abi));

// test data (should be a 32-byte hash: '0x[hash]')
var t1 = "0x09aaa9118c65f9d3efaabc5f7d8e5cba50d7c09a03eb9f7b8a94f7d7ac1c2a04";
var t2 = "JEFF";
var t3 = "0x0eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";

async function main() {
    const setTx = await KoioraTestLoggerContract.writeHash(t3);
    await setTx.wait();
    console.log("Update sent to the mempool");
}
 
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
      }
    );