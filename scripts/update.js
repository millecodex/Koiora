// Script update.js
// sign a transaction and submit to the polygon Mumbai testnet
// HardHat compiles the contract/ABI and
// Alchemy submits the transaction
//
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
// error case
var t2 = "JEFF";
// big number
var t3 = "0x0eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
//"Project 123 bioactives updated to include xxx on 14-01-2023"
var t4 = "0x300afe6e96653bc54ff92fbe968ebfed7c6afc47e14f62563a90a1af0f4ef27f";
//"Project 002 closed as of 09-09-2023"
var t5 = "0x15c213cd8133dd1630018f6587ed64423dbbef81ac96ad21a9763e400625dd45";
//"Project 1a11 ownership transferred to Japanese office on 02-02-2022"
var t6 = "0xd6bea181ef1b6a8823d97a5104b4a3407d955f0db9d8a61bd022b16df1ca80f7";
//"Project 001 funded. Approved by managing director on 01-01-2023"
var t7 = "0x11415535087105619940cb037a4775bd671872f15839864a3fbba455af77e056";
//"this is a test"
var t8 = "0x2e99758548972a8e8822ad47fa1017ff72f06f3ff6a016851f45c398732bc50c";
//"this is a Test"
var t9 = "0x41b03e3dfa951ad27dc2fec6a8547292577c6160b24bf8db5d931315f3da5197";
//"polygon is cheap!"
var t10 = "0x44c2e995440058cbc5092f5ad096986ed39fd658e301ee5668a8d9ac6c9e600e";

// set hash for main()
let hash = t6;

// enforce a 32-byte hex string
let hexRegex = /^0x[a-fA-F0-9]{64}$/;

async function main() {

  if (!hexRegex.test(hash)) {
    console.log(`${hash} is not a 32-byte hex object`);
    return;
  }

  // set a timer
  const start = Date.now();
  const setTx = await KoioraTestLoggerContract.writeHash(hash);
  console.log("Transaction sent to the mempool.");
  await setTx.wait();
  console.log(`Transaction mined in ${(Date.now() - start) / 1000} seconds.`);
  //console.log("Transaction mined at a gas cost of " + setTx.maxFeePerGas / 1000000000 + " Gwei.");
  console.log("Transaction hash: " + setTx.hash);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
      }
    );