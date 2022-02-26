const { task } = require("hardhat/config");
const { getAccount } = require("./helpers");

task("check-balance", "Prints out the balance of your account").setAction(async function (taskArguments, hre) {
    const account = getAccount();
    console.log(`Account balance for ${account.address}: ${await account.getBalance()}`);
});

task("deploy", "Deploys the NFT.sol contract").setAction(async function (taskArguments, hre) {
    const NFTsAuction = await ethers.getContractFactory("Auction") // Get Auction contract
    const _NFTsAuction = await NFTsAuction.deploy() // Deploy contract

    await _NFTsAuction.deployed() // Wait for Auction contract to be deployed
    console.log(`Contract Auction successfully deployed to ${_NFTsAuction.address}`)

    const NFTsCollection = await ethers.getContractFactory("NFTsCollection") // Get NftsCollection contract
    const _NFTsCollection = await NFTsCollection.deploy("NFTsCollection", "NFTC") // deploy contract with name and symbol

    await _NFTsCollection.deployed() // Wait for NftsCollection contract to be deployed
    console.log(`Contract NFTsCollection successfully deployed to ${_NFTsCollection.address}`)

    await _NFTsCollection.setApprovalForAll(_NFTsAuction.address, true); // Set Approvall for all tokens in the contract, Auction contract is allowed to change token owner

    for (i = 0; i < 10; i++) {
        const newItemId = await _NFTsCollection.mint("https://ipfs.io/ipfs/QmWhJQcssFcze2mctTSeXmfCbG6G2zJSHG9WcRqaEAWQgH/metadata/000000000000000000000000000000000000000000000000000000000000000" + i.toString() + ".json")
        console.log(`NFT minted successfully :: ${newItemId}`)
    }
});