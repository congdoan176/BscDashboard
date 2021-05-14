import React, {useEffect, useState} from "react";
import {Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Row} from "reactstrap";
import Header from "../../components/Headers/Header.js";
import DataContext from "../../context";
import Web3 from "web3";
import jsonFtx from "../../json/founder/contract.json";
import Address from "../../json/addressContract/address.json"
import {BigNumber} from "@ethersproject/bignumber";


const BuyToken = () => {
    const [salePrice, setSalePrice] = useState(0);
    const [salePriceDiv, setSalePriceDiv] = useState(0);
    const [numberToken, setNumberToken] = useState("");
    const [numberBNB, setNumberBNB] = useState(0);
    const [errText, setErrText] = useState("");

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

    useEffect(async () => {
        await getPrice();
    })

    function changeSaleValue(e) {
        let a = e.target.value;
        setNumberToken(a);
        let number = a / salePrice * salePriceDiv;
        setNumberBNB(number);
    }

    async function onBuyToken(totalAmountBNB) {
        if (totalAmountBNB < numberBNB) {
            setErrText("Number BNB must be less than or equal total BNB assets")
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
            } catch (err) {
                console.log("Buy token error", err);
            }
        }
    }

    return (
        <>
            <Header/>
            <DataContext.Consumer>
                {data => (
                    <Container className="mt--7" fluid>
                        <Row>
                            <Col lg={3}/>
                            <Col lg={6}>
                                <Card className="shadow" style={{}}>
                                    <CardHeader className="bg-transparent" style={{borderBottom: 'none'}}>
                                        <Row className="align-items-center">
                                            <div className="col text-center">
                                                <h2 className="mb-0">Buy FTX token</h2>
                                            </div>
                                        </Row>
                                    </CardHeader>
                                    <CardBody>
                                        <Form>
                                            <div className="pl-lg-4">
                                                <Row style={{marginBottom: 40}}>
                                                    <Col lg="1"/>
                                                    <Col lg="10">
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-username"
                                                        >
                                                            Number Token
                                                        </label>
                                                        <div style={{
                                                            border: '1px solid #e0e0e0',
                                                            height: 50,
                                                            width: '100%',
                                                            borderRadius: 15,
                                                        }}>
                                                            <FormGroup>
                                                                <Row style={{position: 'relative'}}>
                                                                    <Col lg="2" sm="2" style={{
                                                                        position: 'absolute',
                                                                        top: 10,
                                                                        left: 35,
                                                                        overflow: 'hidden'
                                                                    }}>
                                                                        <img
                                                                            className="navbar-brand-img"
                                                                            src={require("../../assets/img/icons/ftxf-dapps.png").default}
                                                                            style={{width: 25, height: 25}}
                                                                        />
                                                                    </Col>
                                                                    <Col lg="10" sm="10" style={{
                                                                        position: 'absolute',
                                                                        left: 87,
                                                                        width: '100%'
                                                                    }}>
                                                                        <Input
                                                                            className="form-control-alternative"
                                                                            type="number"
                                                                            min="0"
                                                                            placeholder="Enter quantity token"
                                                                            style={{
                                                                                width: '100%',
                                                                                height: 48,
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
                                                        <small>Total BNB assets: ~{data.balanceBNB}</small>
                                                        <br/>
                                                        <small style={{color: "red"}}>{errText}</small>
                                                    </Col>
                                                    <Col lg="1"/>
                                                </Row>
                                                <Row>
                                                    <Col lg="1"/>
                                                    <Col lg="10">
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-username"
                                                        >
                                                            Number BNB
                                                        </label>
                                                        <div style={{
                                                            border: '1px solid #e0e0e0',
                                                            height: 50,
                                                            width: '100%',
                                                            borderRadius: 15,
                                                            backgroundColor: '#e9ecef'
                                                        }}>
                                                            <FormGroup>
                                                                <Row style={{position: 'relative'}}>
                                                                    <Col lg="2" sm="3" style={{
                                                                        position: 'absolute',
                                                                        top: 10,
                                                                        left: 35,
                                                                        overflow: 'hidden'
                                                                    }}>
                                                                        <img
                                                                            className="navbar-brand-img"
                                                                            src={require("../../assets/img/icons/Binance-Coin-BNB-icon.png").default}
                                                                            style={{width: 25, height: 25}}
                                                                        />
                                                                    </Col>
                                                                    <Col lg="10" sm="9" style={{
                                                                        position: 'absolute',
                                                                        left: 87
                                                                    }}>
                                                                        <Input
                                                                            className="form-control-alternative"
                                                                            value={numberBNB}
                                                                            style={{
                                                                                width: '100%',
                                                                                height: 48,
                                                                                borderTopRightRadius: 15,
                                                                                borderBottomRightRadius: 15,
                                                                                boxShadow: 'none'
                                                                            }}
                                                                            disabled={true}
                                                                            type="text"
                                                                        />
                                                                    </Col>
                                                                </Row>
                                                            </FormGroup>
                                                        </div>
                                                    </Col>
                                                    <Col lg="1"/>
                                                </Row>
                                            </div>
                                            <hr className="my-4"/>
                                            <div>
                                                <Row>
                                                    <Col lg="7">

                                                    </Col>
                                                    <Col lg="4" className="mr-2">
                                                        <Button
                                                            color="primary"
                                                            onClick={() => onBuyToken(data.balanceBNB)}
                                                            size="lg"
                                                            block
                                                        >
                                                            EXCHANGE NOW
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Form>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col lg={3}/>
                        </Row>
                    </Container>
                )}
            </DataContext.Consumer>
        </>
    );
};

export default BuyToken;
