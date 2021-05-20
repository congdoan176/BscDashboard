import React, {useEffect, useState} from "react";
import {Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Row} from "reactstrap";
import DataContext from "../../context";
import Web3 from "web3";
import jsonFtx from "../../json/founder/contract.json";
import Address from "../../json/addressContract/address.json"
import HeaderFake from "../../components/Headers/HeaderFake";
import Round from "../../share/roud/index"

const BuyToken = () => {
    const [salePrice, setSalePrice] = useState(0);
    const [salePriceDiv, setSalePriceDiv] = useState(0);
    const [numberToken, setNumberToken] = useState("");
    const [numberBNB, setNumberBNB] = useState(0);
    const [errText, setErrText] = useState("");
    const [currentRound, setCurrentRound] = useState(0);
    const [buyAmount, setByAmount] = useState([]);

    async function getPrice() {
        const web3 = new Web3(Web3.givenProvider);
        try {
            const daiToken = new web3.eth.Contract(jsonFtx, Address.FounderAddress);
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
            let data = await Round.byAmount(account[0], currentRound);
            let dataJson = JSON.parse(data);
            setByAmount(dataJson);
        }
    }

    useEffect(async () => {
        await getPrice();
        await getByAmount();
        await getCurrentRound();
        console.log(salePrice, salePriceDiv)
    })

    function changeSaleValue(e) {
        let a = e.target.value;
        setNumberToken(a);
        let number = a / salePrice * salePriceDiv;
        setNumberBNB(number);
    }

    async function onBuyToken(totalAmountBNB) {
        if (totalAmountBNB < numberBNB) {
            setErrText("Number BNB must be less than or equal total BNB assets.")
            return;
        }
        if (numberToken < 1000){
            setErrText("The minimum number of FTXF tokens to buy is 1000!");
            return;
        }
        if (numberToken > 10000){
            setErrText("The maximum number of FTXF tokens that can be purchased is 30000!");
            return;
        }
        if (buyAmount.length > 0){
            setErrText("you bought FTXF at this round.");
            return;
        }
        const web3 = new Web3(Web3.givenProvider);
        const accounts = await web3.eth.getAccounts()
        if (accounts.length > 0) {
            try {
                let amount = numberBNB * 1000000000000000000;
                const daiToken = new web3.eth.Contract(jsonFtx, Address.FounderAddress);
                daiToken.methods.buy().send({
                    from: accounts[0],
                    value: Math.floor(amount)
                })
                await getByAmount();
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
                                            <h2 className="pt-2" style={{color: "white"}}>Public Sale</h2>
                                        </div>
                                        <Form>
                                            <div className="mt-5">
                                                <Row style={{marginBottom: 40}}>
                                                    <Col lg="12" xs="12">
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
                                                                            min="1000"
                                                                            max="10000"
                                                                            placeholder="0"
                                                                            style={{

                                                                                height: 58,
                                                                                borderTopRightRadius: 15,
                                                                                borderBottomRightRadius: 15,
                                                                                boxShadow: 'none'
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
                                                                                backgroundColor: "white"
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
                                                                 // await onBuyToken(data.balanceBNB)
                                                            }}
                                                            size="lg"
                                                            block
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
