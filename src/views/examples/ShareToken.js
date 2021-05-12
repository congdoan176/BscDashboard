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
import jsonFtx from "../../json/contract/contract.json";
import eshareJson from "../../json/eshare/contract.json"

const ShareToken = () => {

    const [amountShare, setAmountShare] = useState(0);
    const [addressToken, setAddressToken] = useState("");
    const [totalUsdtEshare, setTotalUsdtEshare] = useState(0);

    async function getUsdtInEshare() {
        const web3 = new Web3(Web3.givenProvider);
        const data = new web3.eth.Contract(jsonFtx, "0x337610d27c682e347c9cd60bd4b3b107c9d34ddd");
        data.methods.balanceOf("0xf11FFA5612cd127b362902e3443b974fc13EF1F9").call(function (err, res) {
            if (err) {
                console.log("get balance of eshare error.");
                return;
            }
            let usdt = res / 1000000000000000000
            setTotalUsdtEshare(usdt);
        })
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
            alert("Amount Share must be less than or equal amount USDT");
            return;
        }
        const web3 = new Web3(Web3.givenProvider);
        let account = await web3.eth.getAccounts();
        if (account.length > 0) {
            try {
                const data = new web3.eth.Contract(eshareJson, "0xf11FFA5612cd127b362902e3443b974fc13EF1F9");
                let amount = amountShare * 1000000000000000000;
                data.methods.payDividend(Math.floor(amount), addressToken).send({
                    from: account[0],
                })
            } catch (err) {
                console.log("On share token is error", err);
            }
        }
    }

    return (
        <>
            <Header/>
            <Container className="mt--7" fluid>
                <Row>
                    <Col lg="3"/>
                    <Col lg="6">
                        <Card className="shadow border-0">
                            <CardHeader className="bg-transparent" style={{borderBottom: 'none'}}>
                                <Row className="align-items-center">
                                    <div className="col text-center">
                                        <h2 className="mb-0">
                                            Share
                                        </h2>
                                    </div>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Form>
                                    <div className="pl-lg-4">
                                        <Row style={{marginBottom: 30}}>
                                            <Col lg="1"/>
                                            <Col lg="10">
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="input-email"
                                                >
                                                    Currency species
                                                </label>
                                                <div style={{
                                                    border: '1px solid #e0e0e0',
                                                    height: 50,
                                                    width: '100%',
                                                    borderRadius: 15,
                                                }}>
                                                    <Col lg="2" sm="2" style={{
                                                        position: 'absolute',
                                                        top: 43,
                                                        left: 35,
                                                        overflow: 'hidden'
                                                    }}>
                                                        <img
                                                            className="navbar-brand-img"
                                                            src={require("../../assets/img/icons/Tether-USDT-icon.png").default}
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
                                                            onChange={(e) => changeAddressToken(e)}
                                                            type="select"
                                                            style={{
                                                                width: '100%',
                                                                height: 48,
                                                                borderTopRightRadius: 15,
                                                                borderBottomRightRadius: 15,
                                                                boxShadow: 'none'
                                                            }}
                                                        >
                                                            <option value="0x337610d27c682e347c9cd60bd4b3b107c9d34ddd">
                                                                USDT
                                                            </option>
                                                        </Input>
                                                    </Col>
                                                </div>
                                            </Col>
                                            <Col lg="1"/>
                                        </Row>
                                        <Row>
                                            <Col lg="1"/>
                                            <Col lg="10" style={{marginBottom: 30}}>
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="input-username"
                                                >
                                                    Amount Share
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
                                                                    src={require("../../assets/img/icons/Tether-USDT-icon.png").default}
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
                                                                    id="input-username"
                                                                    placeholder="Amount Share"
                                                                    type="number"
                                                                    min={0}
                                                                    style={{
                                                                        width: '100%',
                                                                        height: 48,
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
                                                <small>Total USDT assets: ~{totalUsdtEshare}</small>
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
                                                    onClick={async () => onShareToken()}
                                                    size="lg"
                                                    type={'reset'}
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
                    <Col lg="3"/>
                </Row>
            </Container>
        </>
    );
};

export default ShareToken;
