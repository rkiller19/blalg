import { useState, useCallback } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./App.css";
import useEagerConnect from './hooks/useEagerConnect';
import { useWeb3React } from '@web3-react/core';
import useAuth from './hooks/useAuth';
import { ToastContainer, toast } from 'react-toastify';
import { useTotalSupply, useMaxSupply, usePrice } from './hooks/dataFetcher';
import useBuy from './hooks/useBuy';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  useEagerConnect();
  const { buy } = useBuy();


  const price = 800;
  const { login, logout } = useAuth();
  const { account } = useWeb3React();

  const [num, setNum] = useState(10);




  const connectMetamask = () => {
    localStorage.setItem('connectorId', 'injected');
    if (account) {
      logout();
    } else {
      login('injected');
    }
  };


  const Disconnect = async () => {
    logout();
    localStorage.setItem('connectorId', '');
  };


  const Buy = useCallback(async (e) => {
    e.preventDefault();
    if (!account) {
      toast.error('Please Connect Your Wallet');
      return;
    }


    try {
      await buy(num, price)
    } catch (error) {
      console.log(error)
    }
  }, [buy])



  return (
    <>
      <ToastContainer />

      <div className="root">
       {/*  <div className="lefttree">
          <img
            className="img-fluid leftimg"
            src={require("./assets/img/left.svg").default}
            alt=""
          />
        </div>
        <div className="righttree">
          <img
            className="img-fluid rightimg"
            src={require("./assets/img/right.png").default}
            alt=""
          />
        </div> */}
        {/* <div className="birdsdiv">
          <img
            className="img-fluid birdimg"
            src={require("./assets/img/bird.png").default}
            alt=""
          />
        </div> */}
        <Container>
        <div className="cus-navb mt-3 d-flex justify-content-between align-items-center">
           
        <div className="logo">
              <img
                className="img-fluid logo-img"
                src={require("./assets/img/logo.svg").default}
                alt=""
              />
            </div>
            <div className="con-btn">
              {
                !account ?
                  <button className="cusbtn" onClick={connectMetamask}>Connect Wallet</button> :
                  <button className="cusbtn" onClick={Disconnect}>Disconnect</button>
              }
            </div>
            
          </div>
          <Row className="mt-1 pt-1">
          <Col
              className=" d-flex justify-content-center align-items-center "
              lg="1.5"
            >
              
              <div>
                <h1 className="title">Arbitrex Decentralized Exchange</h1>
              </div> 
              
              
          </Col>
          </Row>
          <Row className="mt-3 pt-3">
          <Col
              className=" d-flex justify-content-end align-items-center "
              lg="30"
            >
              <div class="dropdown">
  <button class="dropbtn">Presale Details</button>
  <div class="dropdown-content">
  <a href="#">Start Time: 19 November 21:00 UTC</a>
    <a href="#">End Time: 20 November 21:00 UTC</a>
    <a href="#">Soft Cap: 30000$ USD</a>
    <a href="#">Hard Cap: 3000000$ USD </a>
    <a href="#">Price: 1.5$ USD </a>
    <a href="https://medium.com/@arbitrex/announcing-presale-details-arbx-airdrop-8da864f8a31f ">Click here for more information about our presale!</a>
  </div>
</div>
               
          </Col>

          </Row>
               
          
          <Row className="mt-3 pt-3">
            <Col
              className=" d-flex justify-content-center align-items-center "
              lg="12"
            > 
            
              <div className="">
              
              <div className="text-center mt-4">
                  <h3 className="subtitle">Join our Presale</h3>
                </div>
                <br>
                </br>
                <div className="button-mint d-flex justify-content-center">
                  {/* <button className="minus mr-3" onClick={minus}>
                    -
                  </button> */}
                  <div className="display-number d-flex justify-content-center align-items-center">
                    <input type="text" placeholder=" # of Tokens" value={num} onChange={(e) => setNum(e.target.value)}></input>
                  </div>
                  {/* <button className="plus ml-3" onClick={plus}>
                    <img
                      className="img-fluid opensealogo"
                      // src={require("./assets/img/plusimg.png").default}
                      alt=""
                    /> 
                    +
                  </button>  */}
                </div>
                
                <div className="mintnowdiv text-center mt-5">
                  <button className="cusbtn" onClick={Buy}>Buy Now</button>
                </div>
                <div className="text-center mt-4">
                  {/* <h3 className="subtitle"> {supply} / {supplyMax}</h3> */}
                </div>
                
                <div className="text-center mt-4">
                  <h3 className="subtitle">1 $ARBX = 1.5$ dollars</h3>
                </div>
                {/* <div className="text-center mt-5">
                  <img
                    className="img-fluid opensealogo"
                    // src={require("./assets/img/opensea.png").default}
                    alt=""
                  />
                </div> */}
                
                
                
              </div>
            </Col>
            {/* <Col lg="6" className="mbr">
              <div className="right-img">
                <img
                  className="img-fluid rightlogo"
                  // src={require("./assets/img/we.jpeg").default}
                  alt=""
                />
              </div>
            </Col> */}
          </Row>
        </Container>
      </div>
    </>
  );
}

export default App;
