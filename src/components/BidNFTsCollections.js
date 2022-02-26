import React, { useEffect } from "react";
import Fade from "react-reveal/Fade";
import NtfDisplay from "./NtfDisplay"
import { init } from "./Web3Client";

const BidNFTsCollection = () => {
  const contractHash = process.env.REACT_APP_NFT_CONTRACT_ADDRESS; // Get NftCollection contract hash
  const tokensId = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // Array of all the tokens ids

  useEffect(() => {
    init(); // Init the provider and the Auction Contract 
  }, []);

  return (
    <div className="section" id="work">
      <div className="container">
        <div className="work-wrapper">
          <Fade bottom>
            <h1>Bid NFTs</h1>
          </Fade>
          <div className="grid">
            <Fade bottom cascade>
              {tokensId.map((tokenId, index)=>(
                <NtfDisplay key={index} contractHash={contractHash} tokenId={tokenId}/>
              ))}
            </Fade> 
			    </div>
        </div>
      </div>
    </div>
  )
}

export default BidNFTsCollection
