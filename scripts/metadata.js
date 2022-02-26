let fs = require("fs");
let axios = require("axios");

let ipfsArray = [];
let promises = [];
for (let i = 0; i < 10; i++) {
    let paddedHex = ("0000000000000000000000000000000000000000000000000000000000000000"
        + i.toString(16)).substr("-64");
    ipfsArray.push({
        path: `metadata/${paddedHex}.json`,
        content: {
            image: `https://ipfs.io/ipfs/QmRSmAsaT6WWMkM8ikFmyvBskCnoRSMPTgpyKmKr23Z9dx/images/${paddedHex}.jpg`,
            name: `My NFT Letter #${i}`,
            description: "Awesome NFT to be hired !",
            seller_fee_basis_points: 1000,
            fee_recipient: "0x892145e5D7fA29eFcE30f04EcCCaaFb2F9b4328E"
        }
    })
}
axios.post("https://deep-index.moralis.io/api/v2/ipfs/uploadFolder", 
    ipfsArray,
    {
        headers: {
            "X-API-KEY": 'eld1nw42UfdClX8xLVbSgiOgyXxRoZbuR4Y0KfwhUKgOD4cAMgvinyTTSBJxd4Ju',
            "Content-Type": "application/json",
            "accept": "application/json"
        }
    }
).then( (res) => {
    console.log(res.data);
})
.catch ( (error) => {
    console.log(error)
})