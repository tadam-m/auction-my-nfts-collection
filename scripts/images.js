let fs = require('fs');
let axios = require('axios');

let ipfsArray = [];
let promises = [];

for (let i = 0; i < 10; i++) {
    let paddedHex = ("0000000000000000000000000000000000000000000000000000000000000000" 
        + i.toString(16)).substr("-64");
    promises.push(new Promise((res, rej) => {
        fs.readFile(`./export/${paddedHex}.jpg`, (err, data) => {
            if (err) rej();
            ipfsArray.push({
                path: `images/${paddedHex}.jpg`,
                content: data.toString("base64")
            })
            res();
        });
    }));

}

Promise.all(promises).then(() => {
    axios.post("https://deep-index.moralis.io/api/v2/ipfs/uploadFolder",
        ipfsArray,
        {
            headers: {
                "X-API-KEY": 'eld1nw42UfdClX8xLVbSgiOgyXxRoZbuR4Y0KfwhUKgOD4cAMgvinyTTSBJxd4Ju',
                "Content-Type": "application/json",
                "accept": "application/json"
            }
        }
    ).then((res => {
        console.log(res.data);
    })).catch((error => {
        console.log(error);
    }))
})
// 'https://ipfs.moralis.io:2053/ipfs/QmRSmAsaT6WWMkM8ikFmyvBskCnoRSMPTgpyKmKr23Z9dx/images/0000000000000000000000000000000000000000000000000000000000000002.jpg'