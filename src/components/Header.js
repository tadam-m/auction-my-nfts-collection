import React, { Component } from "react";
import Fade from "react-reveal/Fade"
import Button from '@mui/material/Button';

const { ethereum } = window;

class Header extends Component {
  constructor (props){
    super(props);
    this.state = {
        inputButton: ""
      }
  }

  componentDidMount() {
    if (!this.isMetaMaskInstalled()) { // Check if Metamask is installed 
      this.setState({inputButton: "Install Metamask extension" });
    } else {
      this.setState({inputButton: "Connect to Metamask" });
    }
  }

  isMetaMaskInstalled = () => {
    return (Boolean(ethereum && ethereum.isMetaMask));
  };

  MetaMaskClientCheck = async () => {
    if (this.isMetaMaskInstalled()) {
      await this.onClickConnect();
    }
  }

  onClickConnect = async () => {
    try {
      // Will open the MetaMask UI
      var response = await ethereum.request({ method: 'eth_requestAccounts' });
      this.setState({inputButton: response[0].slice(0, 12).concat('...') });
    } catch (error) {
      console.error(error);
    }
  };

  render () {
    return (
      <div className="section" id="home">
        <div className="container">
          <div className="header-wrapper">
            <Fade bottom>
              <h2>
                Hi, I'm Mathis {" "}
                <span role="img" aria-label="Emoji">
                  👋
                </span>
              </h2>
            </Fade>
            <Fade bottom cascade>
              <div className="heading-wrapper">
                <h1>
                  NFT Auction Platform
                </h1>
              </div>
            </Fade>
            <Fade bottom>
              <p>Here you can bid on my NFTs collection !</p>
            </Fade>
            <Fade bottom>
              <Button className="metamask-button" variant="contained" onClick={this.MetaMaskClientCheck}>
                {this.state.inputButton}
              </Button>
            </Fade>
          </div>
        </div>
      </div>
    )
  }
}

export default Header
