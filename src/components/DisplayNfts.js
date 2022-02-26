import React from "react"
import { useNft } from "use-nft"


const DisplayNfts  = () => {
    const {loading, error, nft } = useNft(
        "0x1D8EC5FD2e83ab1Da2EA8980f53Bd31B3d31549d",
        "1"
    )
  // nft.loading is true during load.
    if (loading) return "Loading…";

  // nft.error is an Error instance in case of error.
    if (error) return "Error.";

  // You can now display the NFT metadata.
  return (
    <section>
      <h1>{nft.name}</h1>
      <img src={nft.image} alt="" />
      <p>{nft.description}</p>
    </section>
  )
}

export default DisplayNfts
