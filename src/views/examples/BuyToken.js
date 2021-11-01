import React, {useEffect, useState} from "react";
import {Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Row} from "reactstrap";
import DataContext from "../../context";
import Web3 from "web3";
import jsonFtx from "../../json/contract/readContract.json";
import sellerJson from "../../json/seller/seller.json";
import Address from "../../json/addressContract/address.json"
import HeaderFake from "../../components/Headers/HeaderFake";
import Round from "../../share/roud/roud"
import {BigNumber} from "@ethersproject/bignumber"
var bigdecimal = require("bigdecimal");
const BuyToken = () => {
    const two = new bigdecimal.BigDecimal('1000000000000000000');
    const [salePrice, setSalePrice] = useState(0);
    const [salePriceDiv, setSalePriceDiv] = useState(0);
    const [numberToken, setNumberToken] = useState("");
    const [numberBNB, setNumberBNB] = useState(0);
    const [errText, setErrText] = useState("");
    const [currentRound, setCurrentRound] = useState(0);
    const [buyAmount, setByAmount] = useState(0);
    const [disabled, setDisabled] = useState(false);
    const [balanceSeller, setBalanceSeller] = useState(0);

    async function getPrice() {
        const web3 = new Web3(Web3.givenProvider);
        try {
            const daiToken = new web3.eth.Contract(sellerJson, Address.SellerAddress);
            daiToken.methods._salePrice().call(function (err, res) {
                if (err) {
                    console.log("An error occured", err)
                    return
                }
                setSalePrice(res);
            })
            daiToken.methods._salePriceDiv().call(function (err, res) {
                if (err) {
                    console.log("An error occured", err);
                    return;
                }
                setSalePriceDiv(res)
            })
        } catch (err) {
            console.log("get price sale price and sale price div error", err);
        }
    }

    async function getCurrentRound(){
        let data = await Round.getRound()
        let dataJson = JSON.parse(data);
        setCurrentRound(dataJson.currentRound);
    }

    async function getByAmount(){
        const web3 = new Web3(Web3.givenProvider);
        const account = await web3.eth.getAccounts();
        if (account.length > 0){
            let data = await Round.byAmount(account[0].toLowerCase(), currentRound);
            let dataJson = JSON.parse(data);
            if (dataJson._size === undefined){
                await setByAmount(0);
            }else {
                await setByAmount(dataJson._size);
            }

        }
    }

    useEffect(async () => {
        await getCurrentRound();
        await getPrice();
        await getByAmount();
        await getBalanceOfSellerAddress()
    }, [currentRound])

    function changeSaleValue(e) {
        let a = e.target.value;
        setNumberToken(a);
            let number = a / salePrice * salePriceDiv;
        setNumberBNB(number);
    }

    async function getBalanceOfSellerAddress(){
        const web3 = new Web3(Web3.givenProvider);
        const daiToken = new web3.eth.Contract(jsonFtx, Address.FTXFTokenAddress);
        daiToken.methods.balanceOf(Address.SellerAddress).call(function (err, res) {
            if (err) {
                console.log("An error occured", err)
                return
            }
            let one = new bigdecimal.BigDecimal(res);
            setBalanceSeller(Number(one.divide(two).toString()).toFixed(4));
        })
    }

    async function onBuyToken(totalAmountBNB, sponsorAddress) {
        if (numberToken > Number(balanceSeller)){
            alert("The amount of tokens you bought exceeds the amount of tokens available.");
            return;
        }
        if (totalAmountBNB < numberBNB) {
            alert("The amount of FTXF you buy exceeds the allowed quantity.")
            return;
        }
        // if (numberToken < 1000){
        //     alert("The minimum number of FTXF tokens to buy is 1000!");
        //     return;
        // }
        // if (numberToken > 10000){
        //     alert("The maximum number of FTXF tokens that can be purchased is 10000!");
        //     return;
        // }
        // if (buyAmount !== 0){
        //     alert("You bought FTXF at this round.");
        //     return;
        // }
        // setDisabled(true)
        const web3 = new Web3(Web3.givenProvider);
        const accounts = await web3.eth.getAccounts();
        if (accounts.length > 0) {
            try {
                let string = numberBNB.toString().split('.');
                let lengthDecimal = 0, totalAmount= "";
                if (string.length === 1){
                    lengthDecimal = 0;
                    totalAmount = string[0] + "";
                }else {
                    lengthDecimal = string[1].length;
                    totalAmount = string[0] + string[1];
                }
                const daiToken = new web3.eth.Contract(sellerJson, Address.SellerAddress, {
                    gas: 100000
                });
                daiToken.methods.buy(sponsorAddress).send({
                    from: accounts[0],
                    value: BigNumber.from(10).pow(18 - lengthDecimal).mul(totalAmount).toString()
                }).then((data) => {
                    alert("Buy Successful.")
                }).catch(err => {
                    alert("An error occurred, please try again later.")
                })

            } catch (err) {
                console.log("Buy token error", err);
            }
        }
    }

    return (
        <>
            <HeaderFake/>
            <DataContext.Consumer>
                {data => (
                    <Container className="mt-lg--5 mt--9" fluid>
                        <Row>
                            <Col lg={2}/>
                            <Col lg={8}>
                                <Card className="shadow" style={{borderRadius: 15}}>
                                    <CardBody style={{border: "2px solid #11cdef", borderRadius: 15}}>
                                        <div className="col text-center"
                                             style={{
                                                 border: "1px solid #11cdef", width: 150,
                                                 height: 50, background: "linear-gradient(87deg, #11cdef 0, #1171ef 100%)",
                                                 borderRadius:10, position: "absolute", top: -25
                                             }}>
                                            <h2 className="pt-2" style={{color: "white"}}>Sale</h2>
                                        </div>
                                        <Form>
                                            <div className="mt-5">
                                                <Row style={{marginBottom: 40}}>
                                                    <Col lg="12" xs="12">
                                                        <small style={{color: "#1171ef"}}>Remaining amount of tokens: ~{balanceSeller}</small>
                                                        <div style={{
                                                            border: '1px solid #11cdef',
                                                            height: 60,
                                                            width: '100%',
                                                            borderRadius: 10,
                                                        }}>
                                                            <FormGroup>
                                                                <Row style={{position: 'relative'}}>
                                                                    <Col lg="2" xs="3" style={{
                                                                        position: 'absolute',
                                                                        top: 10,
                                                                        left: 45,
                                                                        overflow: 'hidden'
                                                                    }}>
                                                                        <img
                                                                            className="navbar-brand-img"
                                                                            src={require("../../assets/img/icons/img/logo/Asset 4.png").default}
                                                                            style={{width: 40, height: 40}}
                                                                        />
                                                                    </Col>
                                                                    <Col lg="10" xs="7" style={{
                                                                        position: 'absolute',
                                                                        left: 120,
                                                                        width: '100%'
                                                                    }}>
                                                                        <Input
                                                                            className="form-control-alternative"
                                                                            type="number"
                                                                            placeholder="0"
                                                                            style={{

                                                                                height: 58,
                                                                                borderTopRightRadius: 15,
                                                                                borderBottomRightRadius: 15,
                                                                                boxShadow: 'none',
                                                                                color: "black"
                                                                            }}
                                                                            onChange={(e) => {
                                                                                changeSaleValue(e);
                                                                            }}
                                                                        />
                                                                    </Col>
                                                                </Row>
                                                            </FormGroup>
                                                        </div>
                                                        <small style={{color: "red", fontSize: 10}}>{errText}</small>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col lg="12" xs="12">
                                                        <small style={{color: "#1171ef"}}>Total BNB assets: ~{data.balanceBNB}</small>
                                                        <div style={{
                                                            border: '1px solid #11cdef',
                                                            height: 60,
                                                            width: '100%',
                                                            borderRadius: 10,
                                                            backgroundColor: 'white'
                                                        }}>
                                                            <FormGroup>
                                                                <Row style={{position: 'relative'}}>
                                                                    <Col lg="2" xs="4" style={{
                                                                        position: 'absolute',
                                                                        top: 10,
                                                                        left: 45,
                                                                        overflow: 'hidden'
                                                                    }}>
                                                                        <img
                                                                            className="navbar-brand-img"
                                                                            src={require("../../assets/img/icons/img/logo/Asset 1.png").default}
                                                                            style={{width: 40, height: 40}}
                                                                        />
                                                                    </Col>
                                                                    <Col lg="10" xs="7" style={{
                                                                        position: 'absolute',
                                                                        left: 120
                                                                    }}>
                                                                        <Input
                                                                            className="form-control-alternative"
                                                                            value={numberBNB}
                                                                            style={{
                                                                                width: '100%',
                                                                                height: 58,
                                                                                borderTopRightRadius: 15,
                                                                                borderBottomRightRadius: 15,
                                                                                boxShadow: 'none',
                                                                                backgroundColor: "white",
                                                                                color: "black"
                                                                            }}
                                                                            disabled={true}
                                                                            type="text"
                                                                        />
                                                                    </Col>
                                                                </Row>
                                                            </FormGroup>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>
                                            <br/><br/>
                                            <div>
                                                <Row>
                                                    <Col lg="9">

                                                    </Col>
                                                    <Col lg="3">
                                                        <Button
                                                            onClick={async () => {
                                                                 await onBuyToken(data.balanceBNB, data.addSponsor)
                                                            }}
                                                            size="lg"
                                                            block
                                                            disabled={disabled}
                                                            style={{background: "linear-gradient(87deg, #11cdef 0, #1171ef 100%)",
                                                                borderColor: "#11cdef", color: "white", borderRadius: 10}}
                                                        >
                                                            BUY NOW
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Form>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col lg={2}/>
                        </Row>
                    </Container>
                )}
            </DataContext.Consumer>
        </>
    );
};

export default BuyToken;
