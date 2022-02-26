# Auction My Nft Collection Project

### Init the env variable 

First of all you need to edit the .env file.

For that you will need to put your alchemy key and your metamask account private key.

### Installation 
 
At the root of the repository, Run : 

```shell
npm install
```

You can now compile the smart contract with this command:

```shell
npx hardhat compile
```

And finally, deploy the smart contract :

```shell
npx hardhat deploy
```

Don't forget to copy / paste the Auction and NFTsCollection contract hash from the deploy output into your .env file.


### Run the App 

You are now ready to run the app. 
Start the app with : 

```shell
npm start
```

You should be able to see the page on "localhost:3000"

Enjoy your Auction ! 