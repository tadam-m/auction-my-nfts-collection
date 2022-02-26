import React, { useState, useEffect } from "react"
import { useNft } from "use-nft";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import LinearProgress from '@mui/material/LinearProgress';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';

import { ImageButton, ImageSrc, Image, ImageBackdrop, ImageMarked } from './custom-cards/custom-cards';
import { startAuctionMethod, endAuctionMethod, bidNftMethod, getHighestBidderMethod, getHighestBidMethod } from './Web3Client';

const NtfDisplay = ({ contractHash, tokenId }) => {

// Timer value to update minutes and seconds
  const initialMinute = 0;
  const initialSeconds = 0;
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);

// Auction state 
  const [isAuctionStarted, setAuctionState] = useState(false);
  const [isAuctionClosed, setAuctionCloseState] = useState(false);
  const [imgButtonAction, setImgButtonAction] = useState('Click to Start Auction !');
  const [pendingTx, setPendingTx] = useState(false); // [Loading Component]: Loading action when transaction is pending
  const [weiAmount, setweiAmount] = useState(''); // [TextField Component]: Wei amount to be send on the textfield 

  useEffect(() => {
    let myInterval = setInterval(() => { // Set the interval of the timer when an auction is started 
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval)
          if (isAuctionStarted === true) // Detect the end of the timer and end the current auction
            actionEnded();
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000)
    return () => {
      clearInterval(myInterval);
    };
  });

  const { loading, error, nft } = useNft( // Hook to get each ntf by passing the contract hash and the token id
    contractHash,
    tokenId,
  );

/* Call Web3.js Methods */

  const checkStartedAuction = () => { // Update the nft card with the current state of the auction
    if (isAuctionClosed) return; // Auction Closed 
    if (isAuctionStarted) { // Auction started state = true
      setImgButtonAction('Click to End Auction !')
      endAuction();
    } else { // Auction started state = false 
      startAuction(contractHash, tokenId);
    }
  }

  const startAuction = (_contractHash, _tokenId) => { // Call start Web3.js method  with the NftsCollection contract Hash and the token Id
    setPendingTx(true);
    startAuctionMethod(_contractHash, _tokenId).then(tx => { // [SUCCESS]: Update auction state, loading component and timer of 2 minutes
      setAuctionState(true);
      setPendingTx(false);
      setMinutes(2);
      setImgButtonAction(`Actual price is : 1000 wei` )
    }).catch(err => { // [ERROR]: Print the error of Web3.js call 
      console.log(err);
      setPendingTx(false);
    });
  }

  const endAuction = () => { // Call end Web3.js method
    setPendingTx(true);
    endAuctionMethod().then(tx => { // [SUCCESS]: Update auction state, loading component and close the auction
      setPendingTx(false);
      setAuctionCloseState(true);
      setAuctionState(false);
      setImgButtonAction('Auction Close !')
    }).catch(err => { // [ERROR]: Print the error of Web3.js call 
      console.log(err);
      setPendingTx(false);
    });
  }

  const bidNft = (weiAmount) => { // Call bid Web3.js method with an amount in wei 
    setPendingTx(true);
    bidNftMethod(weiAmount).then(tx => { // [SUCCESS]: Update auction state, loading component and the new HighestBid value
      setPendingTx(false);
      setweiAmount('');
      getHighestBid();
    }).catch(err => { // [ERROR]: Print the error of Web3.js call | the error could be due to the input value of the textfield component 
      console.log(err);
      setPendingTx(false);
    });
  }

  const getHighestBidder = () => { // Get HighestBidder Web3.js variable
    getHighestBidderMethod().then(tx => {
      setImgButtonAction(`Congrats to ${tx.slice(0, 12).concat('...') } \nClick to End Auction !`); // [SUCCESS]: Update card screen with the winner of the auction
    }).catch(err => { // [ERROR]: Print the error of Web3.js call 
      console.log(err);
    })
  }

  const getHighestBid = () => { // Get HighestBid Web3.js variable
    getHighestBidMethod().then(tx => {  // [SUCCESS]: Update card screen with the HighestBid
      setImgButtonAction(`Highest bid is actually : ${tx} wei`);
    }).catch(err => { // [ERROR]: Print the error of Web3.js call 
      console.log(err);
    })
  }

  const actionEnded = async () => {  // Function to close the auction and disable the Auction button 
    setAuctionState(false);
    if (!isAuctionClosed) {
      await getHighestBidder();
    }
    return ('');
  }

  if (loading) return "";
  if (error) return "Error.";
  return (
    <Card sx={{ maxWidth: 500 }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
        <ImageButton
          focusRipple
          key={nft.name}
          style={{
            width: 350,
            height: 350,
          }}
          onClick={() => { checkStartedAuction() }}
        >
          <ImageSrc style={{ backgroundImage: `url(${nft.image})` }} />
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <Image>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              sx={{
                position: 'relative',
                p: 4,
                pt: 2,
                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
              }}
            >
              <div>
                {imgButtonAction}
              </div>
              <div>
                {minutes === 0 && seconds === 0
                  ? null
                  : <h1> {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
                }
              </div>
              <ImageMarked className="MuiImageMarked-root" />
            </Typography>
          </Image>
        </ImageButton>
      </Box>
      <Box sx={{ height: 40 }}>
        <Fade
          in={pendingTx}
          style={{
            transitionDelay: pendingTx ? '800ms' : '0ms',
          }}
          unmountOnExit
        >
          <LinearProgress />
        </Fade>
      </Box>
      <CardContent>
        <Typography align="center" gutterBottom variant="h6" component="div">
          {nft.name}
        </Typography>
        <Typography align="center" variant="body2" color="text.secondary">
          {nft.description}
        </Typography>
        {isAuctionStarted && <Stack direction="row" spacing={1}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: "center" }}>
            <div>
              <TextField
                label="Enter amount !"
                id="outlined-start-adornment"
                sx={{ m: 3, width: '20ch', height: '5ch' }}
                InputProps={{
                  startAdornment: <InputAdornment position="start">Wei</InputAdornment>,
                }}
                value={weiAmount}
                onChange={(e) => setweiAmount(e.target.value)}
              />
            </div>
          </Box>
          <Button sx={{ color: "#ffffff", backgroundColor: "#000000" }} size="small" variant="text"
            onClick={() => { bidNft(weiAmount) }}>
            Bid
          </Button>
        </Stack>}
      </CardContent>
    </Card>
  );
}

export default NtfDisplay