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
import jsonFtx from "../../json/contract/readContract.json";
import fdJson from "../../json/founder/contract.json";
import DataContext from "../../context";
import Address from "../../json/addressContract/address.json"

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

    async function getTotalAmountFTXF() {
        const web3 = new Web3(Web3.givenProvider);
        const account = await web3.eth.getAccounts();
        if (account.length > 0) {
            const data = new web3.eth.Contract(jsonFtx, Address.FTXFTokenAddress);
            data.methods.balanceOf(account[0]).call(function (err, res) {
                if (err) {
                    console.log("get balance FTXT of user fail", err);
                    return
                }
                setTotalAmountFTXF(res);
            })
        }
    }

    useEffect(async () => {
        await getTotalAmountFTXF();
        await getTotalStakeReward();
        await getTotalAmountApprove()
        if (quantityStake > 0) {
            setNextFromStake(true);
        }
    })

    async function geTotalQuantityStake() {
        const web3 = new Web3(Web3.givenProvider);
        const account = await web3.eth.getAccounts();
        if (account.length > 0) {
            const data = new web3.eth.Contract(fdJson, Address.FounderAddress);
        }
    }

    async function getTotalStakeReward() {
        const web3 = new Web3(Web3.givenProvider);
        const account = await web3.eth.getAccounts();
        if (account.length > 0) {
            const data = new web3.eth.Contract(fdJson, Address.FounderAddress);
            data.methods.getStakeReward(account[0]).call(function (err, res) {
                if (err) {
                    console.log("get reward stake error");
                    return;
                }
                let reward = res / 1000000000000000000
                setRewardStake(reward.toFixed(4));
            })
        }
    }

    async function getTotalAmountApprove() {
        if (nextFromStake) {
            const web3 = new Web3(Web3.givenProvider);
            const account = await web3.eth.getAccounts();
            if (account.length > 0) {
                const data = new web3.eth.Contract(jsonFtx, Address.FTXFTokenAddress);
                data.methods.allowance(account[0], Address.FounderAddress).call(function (err, res) {
                    if (err) {
                        console.log("get amount approved of user fail", err)
                        return;
                    }
                    let amountApprove = res / 1000000000000000000
                    setTotalAmountApprove(amountApprove.toFixed(4));
                })
            }
        }
    }

    async function submitAmountApprove() {
        const web3 = new Web3(Web3.givenProvider);
        const account = await web3.eth.getAccounts();
        if (account.length > 0) {
            const data = new web3.eth.Contract(jsonFtx, Address.FTXFTokenAddress);
            try {
                await data.methods.approve(Address.FounderAddress, totalAmountFTXF).send({
                    from: account[0]
                })
                await setNextFromStake(true);
            } catch (err) {
                console.log(err)
            }
        }
    }

    function changeAmountStake(e) {
        setAmountStake(e.target.value);
    }

    async function submitAmountStack() {
        if (amountStake > totalAmountFTXF) {
            alert("Amount stake must be less than or equal amount approve");
            return;
        }
        try {
            const web3 = new Web3(Web3.givenProvider);
            const account = await web3.eth.getAccounts();
            const data = new web3.eth.Contract(fdJson, Address.FounderAddress);
            let amount = amountStake * 1000000000000000000;
            data.methods.stake(Math.floor(amount)).send({
                from: account[0]
            })

        } catch (err) {
            console.log(err)
            return;
        }
    }

    async function withdrawRewardStake() {
        const web3 = new Web3(Web3.givenProvider);
        const account = await web3.eth.getAccounts();
        if (account.length > 0) {
            const data = new web3.eth.Contract(fdJson, Address.FounderAddress);
            try {
                await data.methods.redeemStakeReward().send({
                    from: account[0],
                })
                console.log(1)
            } catch (err) {
                console.log("withdraw reward stake error", err)
            }
        }
    }

    function changeQuantityUnStake(e) {
        setQuantityUnStake(e.target.value);
    }

    async function withdrawStake() {
        const web3 = new Web3(Web3.givenProvider);
        const account = await web3.eth.getAccounts();
        if (account.length > 0) {
            const data = new web3.eth.Contract(fdJson, Address.FounderAddress);
            try {
                await data.methods.unstake(quantityUnStake).send({
                    from: account[0],
                })
            } catch (err) {
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
                                {
                                    !nextFromStake ?
                                        <Row>
                                            <Col lg="3"/>
                                            <Col lg="6">
                                                <Card className="shadow border-0">
                                                    <CardHeader className="bg-transparent">
                                                        <Row className="align-items-center">
                                                            <div className="col text-center">
                                                                <h2 className="mb-0">Approve amount</h2>
                                                            </div>
                                                        </Row>
                                                    </CardHeader>
                                                    <CardBody>
                                                        <Form>
                                                            <div className="pl-lg-4">
                                                                <Row>
                                                                    <Col lg="9">
                                                                        <label
                                                                            className="form-control-label"
                                                                            htmlFor="input-username"
                                                                        >
                                                                            FTXF amount
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
                                                                                            src={require("../../assets/img/icons/ftxf-dapps.png").default}
                                                                                            style={{
                                                                                                width: 25,
                                                                                                height: 25
                                                                                            }}
                                                                                        />
                                                                                    </Col>
                                                                                    <Col lg="10" sm="9" style={{
                                                                                        position: 'absolute',
                                                                                        left: 87
                                                                                    }}>
                                                                                        <Input
                                                                                            className="form-control-alternative"
                                                                                            id="input-username"
                                                                                            placeholder="Stake amount"
                                                                                            value={(totalAmountFTXF / 1000000000000000000).toFixed(4)}
                                                                                            disabled={true}
                                                                                            style={{
                                                                                                width: '100%',
                                                                                                height: 48,
                                                                                                borderTopRightRadius: 15,
                                                                                                borderBottomRightRadius: 15,
                                                                                                boxShadow: 'none'
                                                                                            }}
                                                                                            onChange={(e) => changeAmountStake(e)}
                                                                                        />
                                                                                    </Col>
                                                                                </Row>
                                                                            </FormGroup>
                                                                        </div>
                                                                    </Col>
                                                                    <Col lg="3" style={{
                                                                        marginTop: 30,
                                                                    }}>
                                                                        <div className="col-2">
                                                                            <Button
                                                                                color="primary"
                                                                                onClick={async () => {
                                                                                    await submitAmountApprove();
                                                                                }}
                                                                                size="lg"
                                                                                type={'reset'}
                                                                            >
                                                                                Approve
                                                                            </Button>
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                            </div>
                                                        </Form>
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                            <Col lg="3"/>
                                        </Row> :
                                        <Row>
                                            <Col lg="12">
                                                <Card className="shadow border-0">
                                                    <CardHeader className="bg-transparent">
                                                        <Row className="align-items-center">
                                                            <div className="col text-center">
                                                                <h2 className="mb-0">{"Stake"}
                                                                </h2>
                                                            </div>
                                                        </Row>
                                                    </CardHeader>
                                                    <CardBody>
                                                        <Form>
                                                            <div className="pl-lg-4">
                                                                <Row>
                                                                    <Col lg="6">
                                                                        <label
                                                                            className="form-control-label"
                                                                        >
                                                                            Stake amount
                                                                        </label>
                                                                        <Row style={{marginBottom: 60}}>
                                                                            <div style={{
                                                                                border: '1px solid #e0e0e0',
                                                                                height: 50,
                                                                                width: '100%',
                                                                                borderRadius: 15,
                                                                                backgroundColor: 'white'
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
                                                                                                src={require("../../assets/img/icons/ftxf-dapps.png").default}
                                                                                                style={{
                                                                                                    width: 25,
                                                                                                    height: 25
                                                                                                }}
                                                                                            />
                                                                                        </Col>
                                                                                        <Col lg="10" sm="9" style={{
                                                                                            position: 'absolute',
                                                                                            left: 87
                                                                                        }}>
                                                                                            <Input
                                                                                                className="form-control-alternative"
                                                                                                id="input-username"
                                                                                                placeholder="Stake amount"
                                                                                                type="number"
                                                                                                min={0}
                                                                                                style={{
                                                                                                    width: '100%',
                                                                                                    height: 48,
                                                                                                    borderTopRightRadius: 15,
                                                                                                    borderBottomRightRadius: 15,
                                                                                                    boxShadow: 'none'
                                                                                                }}
                                                                                                onChange={(e) => changeAmountStake(e)}
                                                                                            />
                                                                                        </Col>
                                                                                    </Row>
                                                                                </FormGroup>
                                                                            </div>
                                                                            <small>Total FTXF assets: ~{totalAmountApprove}</small>
                                                                        </Row>
                                                                        <hr className="my-4"/>
                                                                        <Row>
                                                                            <Col lg="9"></Col>
                                                                            <Col lg="3">
                                                                                <Button
                                                                                    color="primary"
                                                                                    onClick={async () => {
                                                                                        await submitAmountStack();
                                                                                    }}
                                                                                    size="lgs"
                                                                                    type={'reset'}>
                                                                                    Submit
                                                                                </Button>
                                                                            </Col>
                                                                        </Row>
                                                                    </Col>
                                                                    <Col lg="6">
                                                                        <Card className="shadow">
                                                                            <CardHeader className="bg-transparent"  style={{borderBottom: "none"}}>
                                                                                <Row className="align-items-center">
                                                                                    <div className="col text-center">
                                                                                        <h2 className="mb-0">Staking</h2>
                                                                                    </div>
                                                                                </Row>
                                                                            </CardHeader>
                                                                            <CardBody style={{
                                                                                backgroundColor: 'rgb(255, 213, 0)',
                                                                                borderTopRightRadius: '50%',
                                                                                borderTopLeftRadius: '50%',
                                                                                width: '100%',
                                                                                top: -20,
                                                                                left: '-50%'
                                                                            }}>
                                                                                <Row className="mt-5">
                                                                                    <Col lg="8">
                                                                                        <h3 className="mt-2">
                                                                                            Quantity stake
                                                                                            <span
                                                                                                className="font-weight-light">: {quantityStake}</span>
                                                                                        </h3>
                                                                                    </Col>
                                                                                    <Col lg="4">
                                                                                        <Button
                                                                                            color="white"
                                                                                            onClick={toggle}
                                                                                            size="lgs"
                                                                                            type={'reset'}
                                                                                        >
                                                                                            Withdraw
                                                                                        </Button>
                                                                                    </Col>
                                                                                </Row>
                                                                                <Row className="mt-4">
                                                                                    <Col lg="8">
                                                                                        <h3 className="mt-2">
                                                                                            Reward stake:
                                                                                            <span
                                                                                                className="font-weight-light"> {rewardStake}</span>
                                                                                        </h3>
                                                                                    </Col>
                                                                                    <Col lg="4">
                                                                                        <Button
                                                                                            color="white"
                                                                                            onClick={async () => {
                                                                                                await withdrawRewardStake();
                                                                                            }}
                                                                                            size="lgs"
                                                                                            type={'reset'}
                                                                                        >
                                                                                            Withdraw
                                                                                        </Button>
                                                                                    </Col>
                                                                                </Row>
                                                                            </CardBody>
                                                                        </Card>
                                                                    </Col>
                                                                </Row>
                                                            </div>
                                                        </Form>
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                        </Row>
                                }


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
