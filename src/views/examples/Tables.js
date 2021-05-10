import React, {useState, useEffect} from "react";
import {
    Card,
    CardHeader,
    CardFooter,
    Container,
    Row,
    CardBody, Form, Col, FormGroup, Input, Button,
} from "reactstrap";
import Header from "components/Headers/Header.js";
import Web3 from "web3";

const Tables = () => {

    const [amountShare, setAmountShare] = useState("");
    const [addressToken, setAddressToken] = useState("");

    async function getUsdtInEshare(){
        const web3 = new Web3(Web3.givenProvider);
    }

    useEffect(async () => {

    })

    function changeAmountShare(e){
        setAmountShare(e.target.value);
    }

    function changeAddressToken(e){
        setAddressToken(e.target.value);
    }

    async function onShareToken(){

    }

    return (
        <>
            <Header/>
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
                                                        Amount Share
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-username"
                                                        placeholder="Amount Share"
                                                        type="number"
                                                        onChange={(e) => changeAmountShare(e)}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-email"
                                                    >
                                                        Currency species
                                                    </label>
                                                    <Input className="form-control-alternative" type="select">
                                                        <option value="0x0957C89Bfa6A9F6737dACFB27389A1cCC22514e9">FTXF</option>
                                                        <option value="0x337610d27c682e347c9cd60bd4b3b107c9d34ddd">USDT</option>
                                                    </Input>
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
                                                    onClick={() => {}}
                                                    size="lgs"
                                                    type={'reset'}
                                                >
                                                    Share
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
        </>
    );
};

export default Tables;
