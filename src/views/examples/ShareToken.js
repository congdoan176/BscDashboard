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

    async function getUsdtInEshare(){
        const web3 = new Web3(Web3.givenProvider);
        const data = new web3.eth.Contract(jsonFtx, "0x337610d27c682e347c9cd60bd4b3b107c9d34ddd");
        data.methods.balanceOf("0xf11FFA5612cd127b362902e3443b974fc13EF1F9").call(function (err, res){
            if (err){
                console.log("get balance of eshare error.");
                return;
            }
            console.log(res)
            let usdt = res
            setTotalUsdtEshare(usdt);
        })
    }

    useEffect(async () => {
        await getUsdtInEshare();
    })

    function changeAmountShare(e){
        // let a = Number(e.target.value);
        // a = a * 1000000000000000000
        // let bigNumber = BigNumber(a);
        setAmountShare(e.target.value);
    }

    function changeAddressToken(e){
        setAddressToken(e.target.value);
    }

    async function onShareToken(){
        const web3 = new Web3(Web3.givenProvider);
        let account = await web3.eth.getAccounts();
        if (account.length > 0){
            try {
                const data = new web3.eth.Contract(eshareJson, "0xf11FFA5612cd127b362902e3443b974fc13EF1F9");
                data.methods.payDividend(amountShare, addressToken).send({
                    from: account[0],
                })
            }catch (err){
                console.log("On share token is error", err);
            }
        }
    }

    function sliceBalance(balance){
        let numberBalance = "";
        if (balance === "0"){
            numberBalance = balance;
        }else {
            numberBalance = balance.slice(0, balance.length - 18).concat('.').concat(balance.slice(balance.length - 18, balance.length))
            while (numberBalance.endsWith('0')) {
                numberBalance = numberBalance.slice(0, numberBalance.length - 1)
            }
        }
        return numberBalance;
    }

    return (
        <>
            <Header/>
            <Container className="mt--7" fluid>
                <Row>
                    <div className="col">
                        <Card className="shadow border-0">
                            <CardHeader className="bg-transparent">
                                <Row className="align-items-center">
                                    <div className="col ">
                                        <h2 className="mb-0">USDT:
                                            <span>{" " + totalUsdtEshare}</span>
                                        </h2>
                                    </div>
                                </Row>
                            </CardHeader>
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
                                                    <Input className="form-control-alternative" defaultValue={""}  onChange={(e) => changeAddressToken(e)} type="select">
                                                        <option value="">Select Token eShare</option>
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
                                                    onClick={async () => onShareToken()}
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

export default ShareToken;
