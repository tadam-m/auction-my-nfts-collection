//SPDX-License-Identifier: UNLICENSED

pragma solidity 0.8.1;

interface IERC721 {
    function transfer(address, uint) external;

    function transferFrom(
        address,
        address,
        uint
    ) external;
}

contract Auction {
    event Start();
    event End(address highestBidder, uint highestBid);
    event Bid(address indexed sender, uint amount);
    event Withdraw(address indexed bidder, uint amount);

    address payable public seller;

    bool public started;
    bool public ended;
    uint public endAt;

    IERC721 public nft;
    uint public nftId;

    uint public highestBid;
    address public highestBidder;
    mapping(address => uint) public bids;

    constructor () {
        seller = payable(msg.sender);
    }

    function start(IERC721 _nft, uint _nftId, uint startingBid) external {
        require(!started, "Already started!");
        require(msg.sender == seller, "You are not the owner of this NFT !");
        highestBid = startingBid;

        nft = _nft;
        nftId = _nftId;
        nft.transferFrom(msg.sender, address(this), nftId);

        started = true;
        ended = false;
        endAt = block.timestamp + 2 minutes;

        emit Start();
    }

    function bid() external payable {
        require(started, "Not started.");
        require(block.timestamp < endAt, "Ended!");
        require(msg.value > highestBid);

        if (highestBidder != address(0)) {
            bids[highestBidder] += highestBid;
        }

        highestBid = msg.value;
        highestBidder = msg.sender;

        emit Bid(highestBidder, highestBid);
    }

    function withdraw() external payable {
        uint bal = bids[msg.sender];
        bids[msg.sender] = 0;
        (bool sent, bytes memory data) = payable(msg.sender).call{value: bal}("");
        require(sent, "Could not withdraw");

        emit Withdraw(msg.sender, bal);
    }

    function end() external {
        require(started, "You need to start first!");
        require(block.timestamp >= endAt, "Auction is still ongoing!");
        require(!ended, "Auction already ended!");

        if (highestBidder != address(0)) {
            (bool sent, bytes memory data) = seller.call{value: highestBid}("");
            require(sent, "Could not pay seller!");
            nft.transferFrom(address(this), highestBidder, nftId);
        } else {
            nft.transferFrom(address(this), seller, nftId);
        }

        ended = true;
        started = false;
        emit End(highestBidder, highestBid);
    }
}