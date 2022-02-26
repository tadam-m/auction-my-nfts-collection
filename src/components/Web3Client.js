import Web3 from 'web3';
import Auction from "../../artifacts/contracts/Auction.sol/Auction.json";

let selectedAccount;
let nftContract;
let isInitialized = false;
let web3;

export const init = async () => {
    let provider = window.ethereum; // Get the current provider

    if (typeof provider !== 'undefined') {
        provider.request({ method: 'eth_requestAccounts' }).then(async function(accounts) { // [SUCCESS]: Get the current account connected to Metamask
            selectedAccount = accounts[0];
            web3 = new Web3(window.ethereum); // Instantiate Web3 with the provider
            await window.ethereum.enable(); // Wait the provider to be enable
            web3.eth.defaultAccount = selectedAccount; // Instantiate the default web3 account 
            nftContract = new web3.eth.Contract(Auction.abi, process.env.REACT_APP_AUCTION_CONTRACT_ADDRESS); // Get the Auction Contract
            isInitialized = true; // Update the current state of the provider init
        }).catch((err) => { // [ERROR]: Return an error if the provider request failed
            console.log(err);
            return;
        })
    }

    window.ethereum.on("accountsChanged", function (accounts) { // Update the current user if the account change
        selectedAccount = accounts[0];
    })
}

/* Web3.js functions for differents methods of Auction contract  */

export const startAuctionMethod = async (contractHash, tokenId) => { // Call start(IERC721 _nft, uint _nftId, uint startingBid) of Auction contract 
    if (!isInitialized) {
        await init();
    }
    const txReponse = await nftContract.methods
        .start(contractHash, tokenId, 1000).send({from: selectedAccount});
    return (txReponse);
}

export const endAuctionMethod = async () => { // Call end() of Auction contract 
    if (!isInitialized) {
        await init();
    }
    const txReponse = await nftContract.methods
        .end().send({from: selectedAccount});
    return (txReponse);
}

export const bidNftMethod = async (weiAmount) => { // Call bid(WeiAmount) of Auction contract 
    if (!isInitialized) {
        await init();
    }
    const txReponse = await nftContract.methods
        .bid().send({from: selectedAccount, value: parseInt(weiAmount, 10)});
    return (txReponse);
}

export const getHighestBidMethod = async (weiAmount) => { // Get the HighestBid variable of Auction contract
    if (!isInitialized) {
        await init();
    }
    const txReponse = await nftContract.methods
        .highestBid.call().call();
    return (txReponse); // Return HighestBid variable
}

export const getHighestBidderMethod = async (weiAmount) => { // Get the HighestBidder variable of Auction contract
    if (!isInitialized) {
        await init();
    }
    const txReponse = await nftContract.methods
        .highestBidder.call().call();
    return (txReponse); // Return HighestBidder variable
}