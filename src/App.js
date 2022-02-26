import './App.css';
import Header  from './components/Header';
import Layout from './components/Layout';
import Footer from './components/Footer';
import BidNFTsCollection from './components/BidNFTsCollections';
import { NftProvider} from "use-nft";
import { ethers } from "ethers";
import { getDefaultProvider, } from "ethers";

const fetcher = ["ethers", { ethers,  provider: getDefaultProvider("rinkeby") }] // Implement the Ethers fetcher from ethers library 

function App() {
  return (
  <Layout >
    <NftProvider fetcher={fetcher}> 
      <Header></Header>
      <BidNFTsCollection/>
      <Footer/>
    </NftProvider>
  </Layout>
  );
}

export default App;
