import React, {useEffect, useState} from "react";
import {Button, Card, CardBody, Col, Container, Form, FormGroup, Input, Row} from "reactstrap";
import Header from "components/Headers/Header.js";
import DataContext from "../../context";
import Web3 from "web3";
import jsonFtx from "../../json/founder/contract.json";
const BuyToken = () => {
    const [salePrice, setSalePrice] = useState(0);
    const [salePriceDiv, setSalePriceDiv] = useState(0);
    const [numberToken, setNumberToken] = useState("");
    const [numberBNB, setNumberBNB] = useState(0);

    async function getPrice() {
        const web3 = new Web3(Web3.givenProvider);
        const daiToken = new web3.eth.Contract(jsonFtx, "0x017e8004c46e2e25E3B55D2656eBAf437ddD02C6");
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
        console.log()
    }

    useEffect(async () => {
        await getPrice();
    })

    function changeSaleValue(e) {
        let a = e.target.value;
        setNumberToken(a);
        let number = a / salePriceDiv *  salePrice;
        setNumberBNB(number);
    }

    async function onBuyToken(){
        const web3 = new Web3(Web3.givenProvider);
        const accounts = await web3.eth.getAccounts()
        let amount = numberBNB * 100000000
        const daiToken = new web3.eth.Contract(jsonFtx, "0x017e8004c46e2e25E3B55D2656eBAf437ddD02C6");
        daiToken.methods.buy().send({
            from: accounts[0],
            value: Math.floor(amount)
        })
    }

    return (
        <>
            <Header/>
            <DataContext.Consumer>
                {data => (
                    <Container className="mt--7" fluid>
                        <Row>
                            <div className="col">
                                <Card className="shadow border-0">
                                    <CardBody>
                                        <Form>
                                            <div className="pl-lg-4">
                                                <Row>
                                                    <Col lg="6">
                                                        <FormGroup>
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="input-username"
                                                            >
                                                                Number Token
                                                            </label>
                                                            <Input
                                                                className="form-control-alternative"
                                                                id="input-username"
                                                                placeholder="Number Token"
                                                                type="number"
                                                                onChange={(e) => {
                                                                    changeSaleValue(e);
                                                                }}
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col lg="6">
                                                        <FormGroup>
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="input-email"
                                                            >
                                                                Number BNB
                                                            </label>
                                                            <Input
                                                                className="form-control-alternative"
                                                                value={numberBNB}
                                                                id="input-email"
                                                                disabled={true}
                                                                type="text"
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                            </div>
                                            <hr className="my-4"/>
                                            <div>
                                                <Row>
                                                    <Col lg="11">

                                                    </Col>
                                                    <Col lg="1">
                                                        <Button
                                                            color="primary"
                                                            onClick={() => onBuyToken()}
                                                            size="lgs"
                                                            type={'reset'}
                                                        >
                                                            Buy
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Form>
                                    </CardBody>
                                </Card>
                            </div>
                        </Row>
                    </Container>
                )}
            </DataContext.Consumer>
        </>
    );
};

export default BuyToken;
