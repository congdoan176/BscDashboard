import React, {useState, useEffect} from "react";
import {
    Card,
    CardHeader,
    CardFooter,
    Container,
    Row,
    CardBody, Form, Col, FormGroup, Input, Button,
} from "reactstrap";
import Header from "../../components/Headers/Header.js";
import Web3 from "web3";
import jsonFtx from "../../json/contract/readContract.json";
import eshareJson from "../../json/eshare/contract.json"
import Address from "../../json/addressContract/address.json"
import {BigNumber} from "@ethersproject/bignumber";
import HeaderFake from "../../components/Headers/HeaderFake";

const ShareToken = () => {
    const divBigNumber = BigNumber.from(10).pow(18)
    const [amountShare, setAmountShare] = useState(0);
    const [addressToken, setAddressToken] = useState(Address.USDTAddess);
    const [totalUsdtEshare, setTotalUsdtEshare] = useState(0);
    const [errText, setErrText] = useState("");

    async function getUsdtInEshare() {
        const web3 = new Web3(Web3.givenProvider);
        const account = await web3.eth.getAccounts();
        if (account.length > 0){
            const data = new web3.eth.Contract(jsonFtx, Address.USDTAddess);
            data.methods.balanceOf(Address.FTXFEshareAddress).call(function (err, res) {
                if (err) {
                    console.log("get balance of eshare error.");
                    return;
                }
                setTotalUsdtEshare(BigNumber.from(res).div(divBigNumber).toString());
            })
        }
    }

    useEffect(async () => {
        await getUsdtInEshare();
    })

    function changeAmountShare(e) {
        setAmountShare(e.target.value);
    }

    function changeAddressToken(e) {
        setAddressToken(e.target.value);
    }

    async function onShareToken() {
        if (totalUsdtEshare < amountShare){
            setErrText("Amount Share must be less than or equal amount USDT")
            return;
        }
        const web3 = new Web3(Web3.givenProvider);
        let account = await web3.eth.getAccounts();
        if (account.length > 0) {
            try {
                const data = new web3.eth.Contract(eshareJson, Address.FTXFEshareAddress);
                data.methods.payDividend(BigNumber.from(10).pow(18).mul(amountShare).toString(), addressToken).send({
                    from: account[0],
                })
            } catch (err) {
                console.log("On share token is error", err);
            }
        }
    }

    return (
        <>
            <HeaderFake/>
            <Container className="mt-lg--5 mt--9" fluid>
                <Row>
                    <Col lg="2"/>
                    <Col lg="8">
                        <Card className="shadow" style={{borderRadius: 15}}>
                            <CardBody style={{border: "2px solid #11cdef", borderRadius: 15}}>
                                <div className="col text-center"
                                     style={{
                                         border: "1px solid #11cdef", width: 120,
                                         height: 50, background: "linear-gradient(87deg, #11cdef 0, #1171ef 100%)",
                                         borderRadius:10, position: "absolute", top: -25
                                     }}
                                >
                                    <h2 className="pt-2" style={{color: "white"}}>
                                        Share
                                    </h2>
                                </div>
                                <Form>
                                    <div className="mt-5">
                                        <Row style={{marginBottom: 30}}>
                                            <Col lg="12" xs="12">
                                                <label
                                                    className="form-control-label"
                                                    style={{fontSize: 20, color: "#1171ef"}}
                                                >
                                                    Currency species
                                                </label>
                                                <div style={{
                                                    border: '1px solid #11cdef',
                                                    height: 60,
                                                    width: '100%',
                                                    borderRadius: 10,
                                                }}>
                                                    <Col lg="2" xs="3" style={{
                                                        position: 'absolute',
                                                        top: 45,
                                                        left: 45,
                                                        overflow: 'hidden'
                                                    }}>
                                                        <img
                                                            className="navbar-brand-img"
                                                            src={require("../../assets/img/icons/img/logo/Asset 3.png").default}
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
                                                            onChange={(e) => changeAddressToken(e)}
                                                            defaultValue={Address.USDTAddess}
                                                            type="select"
                                                            style={{
                                                                width: '100%',
                                                                height: 58,
                                                                borderTopRightRadius: 15,
                                                                borderBottomRightRadius: 15,
                                                                boxShadow: 'none'
                                                            }}
                                                        >
                                                            <option value={Address.USDTAddess}>
                                                                USDT
                                                            </option>
                                                        </Input>
                                                    </Col>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="12" style={{marginBottom: 30}}>
                                                <label
                                                    className="form-control-label"
                                                    style={{fontSize: 20, color: "#1171ef"}}
                                                >
                                                    Amount share
                                                </label>
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
                                                                    src={require("../../assets/img/icons/img/logo/Asset 3.png").default}
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
                                                                    id="input-username"
                                                                    placeholder="Amount Share"
                                                                    type="number"
                                                                    min={0}
                                                                    style={{
                                                                        width: '100%',
                                                                        height: 58,
                                                                        borderTopRightRadius: 15,
                                                                        borderBottomRightRadius: 15,
                                                                        boxShadow: 'none'
                                                                    }}
                                                                    onChange={(e) => changeAmountShare(e)}
                                                                />
                                                            </Col>
                                                        </Row>
                                                    </FormGroup>
                                                </div>
                                                <small style={{color: "#1171ef"}}>Total USDT assets: ~{totalUsdtEshare}</small>
                                                <br/>
                                                <small style={{color: "red"}}>{errText}</small>
                                            </Col>
                                        </Row>
                                    </div>
                                    <br/>
                                    <div>
                                        <Row>
                                            <Col lg="9">

                                            </Col>
                                            <Col lg="3">
                                                <Button
                                                    onClick={async () => onShareToken()}
                                                    size="lg"
                                                    type={'reset'}
                                                    block
                                                    style={{background: "linear-gradient(87deg, #11cdef 0, #1171ef 100%)",
                                                        borderColor: "#11cdef", color: "white", borderRadius: 10}}
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
                    <Col lg="2"/>
                </Row>
            </Container>
        </>
    );
};

export default ShareToken;
