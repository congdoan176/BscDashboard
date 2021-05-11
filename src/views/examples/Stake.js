import React, {useState, useEffect} from "react";
import {
    Card,
    CardHeader,
    Container,
    Row,
    CardBody, Form, Col, FormGroup, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter
} from "reactstrap";
import Header from "components/Headers/Header.js";
import Web3 from "web3";
import jsonFtx from "../../json/contract/contract.json";
import fdJson from "../../json/founder/contract.json";
import DataContext from "../../context";

const Stake = () => {
    const [totalAmountFTXF, setTotalAmountFTXF] = useState(0);
    const [totalAmountApprove, setTotalAmountApprove] = useState(0);


    const [amountStake, setAmountStake] = useState(0);
    const [quantityStake, setQuantityStake] = useState(0);
    const [rewardStake, setRewardStake] = useState(0);
    const [quantityUnStake, setQuantityUnStake] = useState(0);

    const [nextFromStake, setNextFromStake] = useState(true);
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    async function getTotalAmountFTXF(){
        const web3 = new Web3(Web3.givenProvider);
        const account = await web3.eth.getAccounts();
        if (account.length > 0){
            const data = new web3.eth.Contract(jsonFtx, "0x0957C89Bfa6A9F6737dACFB27389A1cCC22514e9");
            data.methods.balanceOf(account[0]).call(function (err, res){
                if (err){
                    console.log("get balance FTXT of user fail", err);
                    return
                }
                setTotalAmountFTXF(res);
            })
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

    useEffect(async () => {
        await getTotalAmountFTXF();
        await getTotalStakeReward();
        await getTotalAmountApprove()
    })

    async function geTotalQuantityStake(){
        const web3 = new Web3(Web3.givenProvider);
        const account = await web3.eth.getAccounts();
        if (account.length > 0){
            const data = new web3.eth.Contract(fdJson, "0x017e8004c46e2e25E3B55D2656eBAf437ddD02C6");
        }
    }

    async function getTotalStakeReward(){
        const web3 = new Web3(Web3.givenProvider);
        const account = await web3.eth.getAccounts();
        if(account.length > 0){
            const data = new web3.eth.Contract(fdJson, "0x017e8004c46e2e25E3B55D2656eBAf437ddD02C6");
            data.methods.getStakeReward(account[0]).call(function (err, res){
                if (err){
                    console.log("get reward stake error");
                    return;
                }
                setRewardStake(res);
            })
        }
    }

    async function getTotalAmountApprove(){
        if (nextFromStake){
            const web3 = new Web3(Web3.givenProvider);
            const account = await web3.eth.getAccounts();
            if (account.length > 0){
                const data = new web3.eth.Contract(jsonFtx, "0x0957C89Bfa6A9F6737dACFB27389A1cCC22514e9");
                data.methods.allowance(account[0], "0x017e8004c46e2e25E3B55D2656eBAf437ddD02C6").call(function (err, res){
                    if (err){
                        console.log("get amount approved of user fail", err)
                        return;
                    }
                    setTotalAmountApprove(res);
                })
            }
        }
    }

    async function submitAmountApprove(){
        const web3 = new Web3(Web3.givenProvider);
        const account = await web3.eth.getAccounts();
        if (account.length > 0){
            const data = new web3.eth.Contract(jsonFtx, "0x0957C89Bfa6A9F6737dACFB27389A1cCC22514e9");
            try {
                await data.methods.approve("0x017e8004c46e2e25E3B55D2656eBAf437ddD02C6", totalAmountFTXF).send({
                    from: account[0]
                })
                await setNextFromStake(true);
            }catch (err){
                console.log(err)
            }
        }
    }

    function changeAmountStake(e){
        setAmountStake(e.target.value);
    }

    async function submitAmountStack(){
        if (amountStake > totalAmountFTXF){
            alert("Amount stake must be less than or equal amount approve");
            return;
        }
        try {
            const web3 = new Web3(Web3.givenProvider);
            const account = await web3.eth.getAccounts();
            const data = new web3.eth.Contract(fdJson, "0x017e8004c46e2e25E3B55D2656eBAf437ddD02C6");
            data.methods.stake(amountStake).send({
                from: account[0]
            })

        }catch (err){
            console.log(err)
            return;
        }
    }

    async function withdrawRewardStake(){
        const web3 = new Web3(Web3.givenProvider);
        const account = await web3.eth.getAccounts();
        if(account.length > 0){
            const data = new web3.eth.Contract(fdJson, "0x017e8004c46e2e25E3B55D2656eBAf437ddD02C6");
            try {
                await data.methods.redeemStakeReward().send({
                    from: account[0],
                })
                console.log(1)
            }catch (err){
                console.log("withdraw reward stake error", err)
            }
        }
    }

    function changeQuantityUnStake(e){
        setQuantityUnStake(e.target.value);
    }

    async function withdrawStake(){
        const web3 = new Web3(Web3.givenProvider);
        const account = await web3.eth.getAccounts();
        if(account.length > 0){
            const data = new web3.eth.Contract(fdJson, "0x017e8004c46e2e25E3B55D2656eBAf437ddD02C6");
            try {
                await data.methods.unstake(quantityUnStake).send({
                    from: account[0],
                })
            }catch (err){
                console.log("withdraw reward stake error", err)
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
                            <div className="col">
                                <Card className="shadow border-0">
                                    <CardHeader className="bg-transparent">
                                        <Row className="align-items-center">
                                            <div className="col ">
                                                <h2 className="mb-0">{!nextFromStake ? "FTXF" : "Amount approve"}:
                                                    <span>{!nextFromStake ? " " + totalAmountFTXF : " " + totalAmountApprove}</span>
                                                </h2>
                                            </div>
                                            {
                                                ! nextFromStake ?
                                                    <div className="col-2">
                                                        <Button
                                                            color="primary"
                                                            onClick={async () => {
                                                                await submitAmountApprove();
                                                            }}
                                                            size="lgs"
                                                            type={'reset'}
                                                        >
                                                            Approve
                                                        </Button>
                                                    </div> : null
                                            }
                                        </Row>
                                    </CardHeader>
                                    <CardBody>
                                        <Form>
                                            <div className="pl-lg-4">
                                                {
                                                    nextFromStake ?
                                                        <Row>
                                                            <Col lg="6">
                                                                <FormGroup>
                                                                    <label
                                                                        className="form-control-label"
                                                                        htmlFor="input-username"
                                                                    >
                                                                        Stake amount
                                                                    </label>
                                                                    <Input
                                                                        className="form-control-alternative"
                                                                        id="input-username"
                                                                        placeholder="Stake amount"
                                                                        type="number"
                                                                        onChange={(e) => changeAmountStake(e)}
                                                                    />
                                                                </FormGroup>
                                                                <hr className="my-4"/>
                                                                <Row>
                                                                    <Col lg="9">

                                                                    </Col>
                                                                    <Col lg="3">
                                                                        <Button
                                                                            color="primary"
                                                                            onClick={async () => {
                                                                                await submitAmountStack();
                                                                            }}
                                                                            size="lgs"
                                                                            type={'reset'}
                                                                        >
                                                                            Submit
                                                                        </Button>
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                            <Col lg="6">
                                                                <Card className="shadow">
                                                                    <CardHeader className="bg-transparent">
                                                                        <Row className="align-items-center">
                                                                            <div className="col text-center">
                                                                                <h2 className="mb-0">Staking</h2>
                                                                            </div>
                                                                        </Row>
                                                                    </CardHeader>
                                                                    <CardBody>
                                                                        <Row>
                                                                            <div className="lg-6">
                                                                                <h3 className="mt-2">
                                                                                    Quantity stake
                                                                                    <span className="font-weight-light">: {quantityStake}</span>
                                                                                </h3>
                                                                            </div>
                                                                            <div className="lg-6 ml-3">
                                                                                <Button
                                                                                    color="primary"
                                                                                    onClick={toggle}
                                                                                    size="lgs"
                                                                                    type={'reset'}
                                                                                >
                                                                                    Withdraw
                                                                                </Button>
                                                                            </div>
                                                                        </Row>
                                                                        <Row className="mt-5">
                                                                            <div className="lg-6">
                                                                                <h3 className="mt-2">
                                                                                    Reward stake
                                                                                    <span className="font-weight-light">: {rewardStake}</span>
                                                                                </h3>
                                                                            </div>
                                                                            <div className="lg-6 ml-3">
                                                                                <Button
                                                                                    color="primary"
                                                                                    onClick={async () => {
                                                                                        await withdrawRewardStake();
                                                                                    }}
                                                                                    size="lgs"
                                                                                    type={'reset'}
                                                                                >
                                                                                    Withdraw
                                                                                </Button>
                                                                            </div>
                                                                        </Row>
                                                                    </CardBody>
                                                                </Card>
                                                            </Col>
                                                        </Row> : ""
                                                }

                                            </div>
                                        </Form>
                                    </CardBody>
                                </Card>
                            </div>
                        </Row>
                        <Modal isOpen={modal} toggle={toggle}>
                            <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                            <ModalBody>
                                <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-username"
                                    >
                                        Quantity Withdraw
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        id="input-username"
                                        placeholder="Quantity Withdraw"
                                        type="number"
                                        onChange={(e) => changeQuantityUnStake(e)}
                                    />
                                </FormGroup>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="secondary" onClick={async () => {
                                    await withdrawStake();
                                }}>Withdraw</Button>
                            </ModalFooter>
                        </Modal>
                    </Container>
                )}
            </DataContext.Consumer>
        </>
    );
};

export default Stake;
