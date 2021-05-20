import React, {useState, useEffect} from "react";
import {
    Card,
    CardHeader,
    Container,
    Row,
    CardBody, Form, Col, FormGroup, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter
} from "reactstrap";
import Web3 from "web3";
import jsonFtx from "../../json/contract/readContract.json";
import fdJson from "../../json/founder/contract.json";
import DataContext from "../../context";
import Address from "../../json/addressContract/address.json"
import {BigNumber} from "@ethersproject/bignumber"
import HeaderFake from "../../components/Headers/HeaderFake";
import ReactLoading from "react-loading";
var bigdecimal = require("bigdecimal");
const Stake = () => {
    const two = new bigdecimal.BigDecimal('1000000000000000000');
    const [totalAmountFTXF, setTotalAmountFTXF] = useState(0);
    const [totalAmountApprove, setTotalAmountApprove] = useState(0);


    const [amountStake, setAmountStake] = useState(0);
    const [quantityStake, setQuantityStake] = useState(0);
    const [rewardStake, setRewardStake] = useState(0);
    const [quantityUnStake, setQuantityUnStake] = useState(0);

    const [backFromApprove, setBackFromApprove] = useState(false);
    const [nextFromStake, setNextFromStake] = useState(false);
    const [modal, setModal] = useState(false);

    const [isLoaded, setIsLoaded] = useState(false);
    const handleIsLoadedToggle = () => {
        setIsLoaded(currentIsLoaded => !currentIsLoaded)
    };



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
                let one = new bigdecimal.BigDecimal(res);
                setTotalAmountFTXF(Number(one.divide(two).toString()).toFixed(4));
            })
        }
    }

    async function geTotalQuantityStake() {
        const web3 = new Web3(Web3.givenProvider);
        const account = await web3.eth.getAccounts();
        if (account.length > 0) {
            const data = new web3.eth.Contract(fdJson, Address.FounderAddress);
            data.methods._stakers(account[0]).call(function (err, res){
                if(err){
                    console.log("get quantity stake fail", err);
                    return;
                }
                let one = new bigdecimal.BigDecimal(res);
                setQuantityStake(Number(one.divide(two).toString()).toFixed(4))
            })
        }
    }

    useEffect(async () => {
        await getTotalAmountFTXF();
        await getTotalStakeReward();
        await geTotalQuantityStake();
        await getTotalAmountApprove()
        if (!backFromApprove){
            if (quantityStake > 0) {
                setNextFromStake(true);
            }
        }
    })


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
                let one = new bigdecimal.BigDecimal(res);
                setRewardStake(Number(one.divide(two).toString()).toFixed(4));
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
                    let one = new bigdecimal.BigDecimal(res);
                    setTotalAmountApprove(Number(one.divide(two).toString()).toFixed(4));
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
                handleIsLoadedToggle()
                await data.methods.approve(Address.FounderAddress, totalAmountFTXF).send({
                    from: account[0]
                })
                await setNextFromStake(true);
                await setIsLoaded(false);
            } catch (err) {
                await setIsLoaded(false);
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

            data.methods.stake(BigNumber.from(10).pow(18).mul(amountStake).toString()).send({
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

                await data.methods.unstake(BigNumber.from(10).pow(18).mul(quantityUnStake).toString()).send({
                    from: account[0],
                })
            } catch (err) {
                console.log("withdraw reward stake error", err)
            }
        }

    }

    return (
        <>
            <HeaderFake/>
            <DataContext.Consumer>
                {data => (
                    <Container className="mt-lg--5 mt--9" fluid>
                        {
                            !isLoaded ?
                                <div>
                                    <Row>
                                        <div className="col">
                                            {
                                                !nextFromStake ?
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
                                                                         }}>
                                                                        <h2 className="pt-2" style={{color: "white"}}>Stake</h2>
                                                                    </div>
                                                                    <Form>
                                                                        <div className="mt-5">
                                                                            <Row>
                                                                                <Col lg="9">
                                                                                    <label
                                                                                        className="form-control-label"
                                                                                        style={{fontSize: 20, color: "#1171ef"}}
                                                                                    >
                                                                                        FTXF amount
                                                                                    </label>
                                                                                    <div style={{
                                                                                        border: '1px solid #11cdef',
                                                                                        height: 60,
                                                                                        width: '100%',
                                                                                        borderRadius: 15,
                                                                                        backgroundColor: 'white'
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
                                                                                                        style={{
                                                                                                            width: 40,
                                                                                                            height: 40
                                                                                                        }}
                                                                                                    />
                                                                                                </Col>
                                                                                                <Col lg="10" xs="7" style={{
                                                                                                    position: 'absolute',
                                                                                                    left: 87
                                                                                                }}>
                                                                                                    <Input
                                                                                                        className="form-control-alternative"
                                                                                                        id="input-username"
                                                                                                        placeholder="Stake amount"
                                                                                                        value={totalAmountFTXF}
                                                                                                        disabled={true}
                                                                                                        style={{
                                                                                                            width: '100%',
                                                                                                            height: 58,
                                                                                                            borderTopRightRadius: 15,
                                                                                                            borderBottomRightRadius: 15,
                                                                                                            boxShadow: 'none',
                                                                                                            backgroundColor: "white"
                                                                                                        }}
                                                                                                        onChange={(e) => changeAmountStake(e)}
                                                                                                    />
                                                                                                </Col>
                                                                                            </Row>
                                                                                        </FormGroup>
                                                                                    </div>
                                                                                </Col>
                                                                                <Col lg="3" style={{
                                                                                    marginTop: 36,
                                                                                }}>
                                                                                    <Button
                                                                                        onClick={async () => {
                                                                                            // await submitAmountApprove();
                                                                                        }}
                                                                                        size="lg"
                                                                                        type={'reset'}
                                                                                        style={{background: "linear-gradient(87deg, #11cdef 0, #1171ef 100%)",
                                                                                            borderColor: "#11cdef", color: "white", borderRadius: 10, width: "100%", height: 60}}
                                                                                    >
                                                                                        APPROVE NOW
                                                                                    </Button>
                                                                                </Col>
                                                                            </Row>
                                                                        </div>
                                                                    </Form>
                                                                </CardBody>
                                                            </Card>
                                                        </Col>
                                                        <Col lg="2"/>
                                                    </Row> :
                                                    <Row>
                                                        <Col lg="12">
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
                                                                            Stake
                                                                        </h2>
                                                                    </div>
                                                                    <Form>
                                                                        <div className="pl-lg-4 mt-4">
                                                                            <Row>
                                                                                <Col lg="6" xs="12" className="mb-6">
                                                                                    <label
                                                                                        className="form-control-label"
                                                                                        style={{fontSize: 20, color: "#1171ef"}}
                                                                                    >
                                                                                        Stake amount
                                                                                    </label>
                                                                                    <Row >
                                                                                        <div style={{
                                                                                            border: '1px solid #e0e0e0',
                                                                                            height: 60,
                                                                                            width: '100%',
                                                                                            borderRadius: 15,
                                                                                            backgroundColor: 'white'
                                                                                        }}>
                                                                                            <FormGroup>
                                                                                                <Row style={{position: 'relative'}}>
                                                                                                    <Col lg="2" xs="2" style={{
                                                                                                        position: 'absolute',
                                                                                                        top: 10,
                                                                                                        left: 25,
                                                                                                        overflow: 'hidden'
                                                                                                    }}>
                                                                                                        <img
                                                                                                            className="navbar-brand-img"
                                                                                                            src={require("../../assets/img/icons/img/logo/Asset 4.png").default}
                                                                                                            style={{
                                                                                                                width: 40,
                                                                                                                height: 40
                                                                                                            }}
                                                                                                        />
                                                                                                    </Col>
                                                                                                    <Col lg="10" xs="7" style={{
                                                                                                        position: 'absolute',
                                                                                                        left: 90
                                                                                                    }}>
                                                                                                        <Input
                                                                                                            className="form-control-alternative"
                                                                                                            id="input-username"
                                                                                                            placeholder="0"
                                                                                                            type="number"
                                                                                                            min={0}
                                                                                                            style={{
                                                                                                                width: '100%',
                                                                                                                height: 58,
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
                                                                                        <small  style={{color: "#1171ef"}}>Total FTXF assets: ~{totalAmountApprove}</small>
                                                                                    </Row>
                                                                                    <Row className="mt-3" >
                                                                                        <Col lg="12" xs="12" className="text-right">
                                                                                            <Button
                                                                                                onClick={async () => {
                                                                                                    // await submitAmountStack();
                                                                                                }}
                                                                                                size="lgs"
                                                                                                type={'reset'}
                                                                                                style={{background: "linear-gradient(87deg, #11cdef 0, #1171ef 100%)",
                                                                                                    borderColor: "#11cdef", color: "white", borderRadius: 10}}
                                                                                            >
                                                                                                STAKE NOW
                                                                                            </Button>
                                                                                        </Col>
                                                                                    </Row>
                                                                                </Col>
                                                                                <Col lg="6" xs="12" >
                                                                                    <Card className="shadow">
                                                                                        <CardHeader className="bg-transparent"  style={{borderBottom: "none"}}>
                                                                                            <Row className="align-items-center">
                                                                                                <Col lg="9" xs="6" className="text-center">
                                                                                                    <div className="col text-center">
                                                                                                        <h3 className="mb-0" style={{color: '#11cdef'}}>Staking</h3>
                                                                                                    </div>
                                                                                                </Col>
                                                                                                <Col lg="1" xs="3" className="text-center">
                                                                                                    <Button
                                                                                                        onClick={async () => {
                                                                                                            await setBackFromApprove(true)
                                                                                                            await setNextFromStake(false)
                                                                                                        }}
                                                                                                        size="lgs"
                                                                                                        type={'reset'}
                                                                                                        style={{background: "linear-gradient(87deg, #11cdef 0, #1171ef 100%)",
                                                                                                            borderColor: "#11cdef", color: "white", borderRadius: 10}}
                                                                                                    >

                                                                                                        Reapprove
                                                                                                    </Button>
                                                                                                </Col>
                                                                                            </Row>
                                                                                        </CardHeader>
                                                                                        <CardBody style={{
                                                                                            background: 'linear-gradient(87deg, #11cdef 0, #1171ef 100%)',
                                                                                            width: '100%',
                                                                                            top: -20,
                                                                                            left: '-50%'
                                                                                        }}>
                                                                                            <Row className="mt-4">
                                                                                                <Col lg="8" xs="12" className="mt-2">
                                                                                                    <h3 className="m-0 p-2 mb-sm-2" style={{color: '#11cdef',backgroundColor: 'white',borderRadius: 5}}>
                                                                                                        Quantity stake
                                                                                                        <span
                                                                                                            className="font-weight-light">: {quantityStake}</span>
                                                                                                    </h3>
                                                                                                </Col>
                                                                                                <Col lg="4" xs="12" className="mt-2">
                                                                                                    <Button
                                                                                                        color="white"
                                                                                                        onClick={toggle}
                                                                                                        type={'reset'}
                                                                                                        style={{width: "100%", color: "#11cdef", height: 40}}
                                                                                                    >
                                                                                                        Unstake
                                                                                                    </Button>
                                                                                                </Col>
                                                                                            </Row>
                                                                                            <Row className="mt-4">
                                                                                                <Col lg="8" xs="12" className="mt-2">
                                                                                                    <h3 className="m-0 p-2 mb-sm-2 " style={{color: '#11cdef', backgroundColor: 'white',borderRadius: 5}}>
                                                                                                        Reward stake:
                                                                                                        <span
                                                                                                            className="font-weight-light"> {rewardStake}</span>
                                                                                                    </h3>
                                                                                                </Col>
                                                                                                <Col lg="4" xs="12" className="mt-2">
                                                                                                    <Button
                                                                                                        color="white"
                                                                                                        onClick={async () => {
                                                                                                            await withdrawRewardStake();
                                                                                                        }}
                                                                                                        type={'reset'}
                                                                                                        style={{width: "100%", color: "#11cdef",height: 40}}
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
                                        <ModalHeader toggle={toggle}>Unstake</ModalHeader>
                                        <ModalBody>
                                            <FormGroup>
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="input-username"
                                                >
                                                    Quantity unstake
                                                </label>
                                                <Input
                                                    className="form-control-alternative"
                                                    id="input-username"
                                                    placeholder="Quantity unstake"
                                                    type="number"
                                                    onChange={(e) => changeQuantityUnStake(e)}
                                                />
                                            </FormGroup>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button style={{color: "white",background: 'linear-gradient(87deg, #11cdef 0, #1171ef 100%)'}} onClick={async () => {
                                                await withdrawStake();
                                            }}>Unstake</Button>
                                        </ModalFooter>
                                    </Modal>
                                </div> :
                                <Row className="mt-lg-9 mb-lg-9 mb-9 mt-9">
                                    <Col lg="5" xs="4"/>
                                    <Col lg="2" xs="3" className="align-items-center mb-lg-5 ml-3 ml-lg-0">
                                        <ReactLoading type={"spin"} color="#11cdef" />
                                    </Col>
                                    <Col lg="5" xs="4"/>
                                </Row>
                        }
                    </Container>
                )}
            </DataContext.Consumer>
        </>
    );
}
export default Stake;
