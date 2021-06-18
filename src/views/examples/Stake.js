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
import SaveStake from '../../share/stake/stake';
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

    const [dateStake, setDateStake] = useState(70);

    const [backgroundPercent25, setBackgroundPercent25] = useState(true);
    const [backgroundPercent50, setBackgroundPercent50] = useState(true);
    const [backgroundPercent75, setBackgroundPercent75] = useState(true);
    const [backgroundPercent100, setBackgroundPercent100] = useState(true);
    const [backgroundTotalPercent, setBackgroundTotalPercent] = useState(true);

    const [historyStake, setHistoryStake] = useState([]);
    const [interestPercent, setInterestPercent] = useState("15%");


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
                setTotalAmountFTXF(Number(one.divide(two).toString()));
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
                let one = new bigdecimal.BigDecimal(res.amount);
                setQuantityStake(Number(one.divide(two).toString()))
            })
        }
    }

    async function getHistoryStake() {
        const web3 = new Web3(Web3.givenProvider);
        const account = await web3.eth.getAccounts();
        let history = await SaveStake.get(account[0]);
        let dataJson =  JSON.parse(history)
        setHistoryStake(dataJson);
    }

    useEffect(async () => {
        await getTotalAmountFTXF();
        await getTotalStakeReward();
        await geTotalQuantityStake();
        await getTotalAmountApprove();
        await getHistoryStake();
        if (!backFromApprove){
            if (quantityStake > 0) {
                setNextFromStake(true);
            }
            if (totalAmountApprove > 0){
                setNextFromStake(true);
            }
        }
    },[totalAmountFTXF])

    async function changeDateStake(e) {
        let value = e.target.value;
        setDateStake(value);
        console.log(typeof value)
        if (value === "70"){
            setInterestPercent("15%");
        }else if(value === "90"){
            setInterestPercent("20%");
        }else if(value === "120"){
            setInterestPercent("30%");
        }else if(value === "180"){
            setInterestPercent("40%");
        }else if(value === "360"){
            setInterestPercent("50%");
        }else if(value === "540"){
            setInterestPercent("65%");
        }else if(value === "720"){
            setInterestPercent("100%");
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
                let one = new bigdecimal.BigDecimal(res);
                setRewardStake(Number(one.divide(two).toString()));
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
                    setTotalAmountApprove(Number(one.divide(two).toString()));
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
                let string = totalAmountFTXF.toString().split('.')
                let lengthDecimal = 0, totalAmount= "";
                if (string.length === 1){
                    lengthDecimal = 0;
                    totalAmount = string[0] + "";
                }else {
                    lengthDecimal = string[1].length;
                    totalAmount = string[0] + string[1];
                }
                await data.methods.approve(Address.FounderAddress, BigNumber.from(10).pow(18 - lengthDecimal).mul(totalAmount).toString()).send({
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
        if (historyStake.length > 0){
            alert("You already staked, please try again later.");
            return;
        }
        if (amountStake > totalAmountFTXF) {
            alert("The amount of FTXF you stake exceeds the allowed quantity.");
            return;
        }
        try {
            const web3 = new Web3(Web3.givenProvider);
            const account = await web3.eth.getAccounts();
            const data = new web3.eth.Contract(fdJson, Address.FounderAddress);

            let string = amountStake.toString().split('.')
            let lengthDecimal = 0, totalAmount= "";
            if (string.length === 1){
                lengthDecimal = 0;
                totalAmount = string[0] + "";
            }else {
                lengthDecimal = string[1].length;
                totalAmount = string[0] + string[1];
            }
            data.methods.stake(BigNumber.from(10).pow(18 - lengthDecimal).mul(totalAmount).toString()).send({
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

    async function submitDateStake(){
        const web3 = new Web3(Web3.givenProvider);
        const account = await web3.eth.getAccounts();
        let res = JSON.parse(await SaveStake.save(account[0].toLowerCase(), amountStake, dateStake));
        if (res.msg === "create history stake success"){
            alert("Stake suceess");
        }
    }

    function changePercentStake(percent){
        if (percent === 25){
            if (!backgroundPercent100 || !backgroundPercent75 || !backgroundPercent50){
                document.getElementById("percent25").style.background = "linear-gradient(" + "87deg\n" + ", rgb(17, 205, 239) 0px, rgb(17, 113, 239) 100%)"
                document.getElementById("percent50").style.background = "none"
                document.getElementById("percent75").style.background = "none"
                document.getElementById("percent100").style.background = "none"
                setBackgroundPercent25(false)
                setBackgroundPercent50(true)
                setBackgroundPercent75(true)
                setBackgroundPercent100(true)
                setAmountStake(Number(totalAmountApprove) * 25 / 100);
            }else {
                if (backgroundPercent25){
                    document.getElementById("percent25").style.background = "linear-gradient(" + "87deg\n" + ", rgb(17, 205, 239) 0px, rgb(17, 113, 239) 100%)"
                    setBackgroundPercent25(false)
                    setAmountStake(Number(totalAmountApprove) * 25 / 100);
                }else {
                    document.getElementById("percent25").style.background = "none"
                    setBackgroundPercent25(true)
                }
            }
        }else if (percent ===  50){
            if (!backgroundPercent100 || !backgroundPercent75){
                document.getElementById("percent25").style.background = "linear-gradient(" + "87deg\n" + ", rgb(17, 205, 239) 0px, rgb(17, 113, 239) 100%)"
                document.getElementById("percent50").style.background = "linear-gradient(" + "87deg\n" + ", rgb(17, 205, 239) 0px, rgb(17, 113, 239) 100%)"
                document.getElementById("percent75").style.background = "none"
                document.getElementById("percent100").style.background = "none"
                setBackgroundPercent25(false)
                setBackgroundPercent50(false)
                setBackgroundPercent75(true)
                setBackgroundPercent100(true)
                setAmountStake(Number(totalAmountApprove) * 50 / 100);
            }else {
                if (backgroundPercent50){
                    document.getElementById("percent25").style.background = "linear-gradient(" + "87deg\n" + ", rgb(17, 205, 239) 0px, rgb(17, 113, 239) 100%)"
                    document.getElementById("percent50").style.background = "linear-gradient(" + "87deg\n" + ", rgb(17, 205, 239) 0px, rgb(17, 113, 239) 100%)"
                    setBackgroundPercent25(false);
                    setBackgroundPercent50(false);
                    setAmountStake(Number(totalAmountApprove) * 50 / 100);
                }else {
                    document.getElementById("percent25").style.background = "none"
                    document.getElementById("percent50").style.background = "none"
                    setBackgroundPercent25(true);
                    setBackgroundPercent50(true);
                }
            }
        }else if (percent ===  75){
            if (!backgroundPercent100){
                document.getElementById("percent25").style.background = "linear-gradient(" + "87deg\n" + ", rgb(17, 205, 239) 0px, rgb(17, 113, 239) 100%)"
                document.getElementById("percent50").style.background = "linear-gradient(" + "87deg\n" + ", rgb(17, 205, 239) 0px, rgb(17, 113, 239) 100%)"
                document.getElementById("percent75").style.background = "linear-gradient(" + "87deg\n" + ", rgb(17, 205, 239) 0px, rgb(17, 113, 239) 100%)"
                document.getElementById("percent100").style.background = "none"
                setBackgroundPercent25(false)
                setBackgroundPercent50(false)
                setBackgroundPercent75(false)
                setBackgroundPercent100(true)
                setAmountStake(Number(totalAmountApprove) * 75 / 100);
            }else {
                if (backgroundPercent75){
                    document.getElementById("percent25").style.background = "linear-gradient(" + "87deg\n" + ", rgb(17, 205, 239) 0px, rgb(17, 113, 239) 100%)"
                    document.getElementById("percent50").style.background = "linear-gradient(" + "87deg\n" + ", rgb(17, 205, 239) 0px, rgb(17, 113, 239) 100%)"
                    document.getElementById("percent75").style.background = "linear-gradient(" + "87deg\n" + ", rgb(17, 205, 239) 0px, rgb(17, 113, 239) 100%)"
                    setBackgroundPercent25(false)
                    setBackgroundPercent50(false)
                    setBackgroundPercent75(false)
                    setAmountStake(Number(totalAmountApprove) * 75 / 100);
                }else {
                    document.getElementById("percent25").style.background = "none"
                    document.getElementById("percent50").style.background = "none"
                    document.getElementById("percent75").style.background = "none"
                    setBackgroundPercent25(true)
                    setBackgroundPercent50(true)
                    setBackgroundPercent75(true)
                }
            }
        }else if (percent ===  100){
            if (!backgroundTotalPercent){
                document.getElementById("percent25").style.background = "none"
                document.getElementById("percent50").style.background = "none"
                document.getElementById("percent75").style.background = "none"
                document.getElementById("percent100").style.background = "none"
                setBackgroundTotalPercent(true);
            }else if (!backgroundPercent25 || !backgroundPercent50 || !backgroundPercent75){
                document.getElementById("percent25").style.background = "linear-gradient(" + "87deg\n" + ", rgb(17, 205, 239) 0px, rgb(17, 113, 239) 100%)"
                document.getElementById("percent50").style.background = "linear-gradient(" + "87deg\n" + ", rgb(17, 205, 239) 0px, rgb(17, 113, 239) 100%)"
                document.getElementById("percent75").style.background = "linear-gradient(" + "87deg\n" + ", rgb(17, 205, 239) 0px, rgb(17, 113, 239) 100%)"
                document.getElementById("percent100").style.background = "linear-gradient(" + "87deg\n" + ", rgb(17, 205, 239) 0px, rgb(17, 113, 239) 100%)"
                setBackgroundPercent25(false)
                setBackgroundPercent50(false)
                setBackgroundPercent75(false)
                setBackgroundPercent100(false)
                setBackgroundTotalPercent(false)
                setAmountStake(Number(totalAmountApprove) * 100 / 100);
            }else {
                if (backgroundPercent100){
                    document.getElementById("percent25").style.background = "linear-gradient(" + "87deg\n" + ", rgb(17, 205, 239) 0px, rgb(17, 113, 239) 100%)"
                    document.getElementById("percent50").style.background = "linear-gradient(" + "87deg\n" + ", rgb(17, 205, 239) 0px, rgb(17, 113, 239) 100%)"
                    document.getElementById("percent75").style.background = "linear-gradient(" + "87deg\n" + ", rgb(17, 205, 239) 0px, rgb(17, 113, 239) 100%)"
                    document.getElementById("percent100").style.background = "linear-gradient(" + "87deg\n" + ", rgb(17, 205, 239) 0px, rgb(17, 113, 239) 100%)"
                    setBackgroundPercent25(false)
                    setBackgroundPercent50(false)
                    setBackgroundPercent75(false)
                    setBackgroundPercent100(false)
                    setAmountStake(Number(totalAmountApprove) * 100 / 100);
                }else {
                    document.getElementById("percent25").style.background = "none"
                    document.getElementById("percent50").style.background = "none"
                    document.getElementById("percent75").style.background = "none"
                    document.getElementById("percent100").style.background = "none"
                    setBackgroundPercent25(true)
                    setBackgroundPercent50(true)
                    setBackgroundPercent75(true)
                    setBackgroundPercent100(true)
                }
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

            let string = quantityUnStake.toString().split('.')
            let lengthDecimal = 0, totalAmount= "";
            if (string.length === 1){
                lengthDecimal = 0;
                totalAmount = string[0] + "";
            }else {
                lengthDecimal = string[1].length;
                totalAmount = string[0] + string[1];
            }
            try {
                await data.methods.unstake(BigNumber.from(10).pow(18 - lengthDecimal).mul(totalAmount).toString()).send({
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
                                                                                                        value={totalAmountFTXF.toFixed(4)}
                                                                                                        disabled={true}
                                                                                                        style={{
                                                                                                            width: '100%',
                                                                                                            height: 58,
                                                                                                            borderTopRightRadius: 15,
                                                                                                            borderBottomRightRadius: 15,
                                                                                                            boxShadow: 'none',
                                                                                                            backgroundColor: "white"
                                                                                                        }}
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
                                                                                                            value={amountStake}
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
                                                                                        <div style={{width: '100%', marginTop: 15, justifyItems: 'center', alignContent: "center",marginLeft: 15,
                                                                                            marginRight: 15}}>
                                                                                            <Row>
                                                                                                <Col
                                                                                                    onClick={() => {
                                                                                                        changePercentStake(25)
                                                                                                    }}
                                                                                                     style={{width: '20%', height: 7, border: "1px solid #d4d4d4", marginLeft: 5, marginRight: 5, textAlign: 'center'}}
                                                                                                    id={"percent25"}
                                                                                                >
                                                                                                    <p style={{paddingTop: 5, fontSize: 12,fontWeight: 600}}>25%</p>
                                                                                                </Col>
                                                                                                <Col
                                                                                                    onClick={() => {
                                                                                                        changePercentStake(50)
                                                                                                    }}
                                                                                                    style={{width: '20%', height: 7, border: "1px solid #d4d4d4", marginLeft: 5, marginRight: 5, textAlign: 'center'}}
                                                                                                    id={"percent50"}
                                                                                                >
                                                                                                    <p style={{paddingTop: 5, fontSize: 12,fontWeight: 600}}>50%</p>
                                                                                                </Col>
                                                                                                <Col
                                                                                                    onClick={() => {
                                                                                                        changePercentStake(75)
                                                                                                    }}
                                                                                                    style={{width: '20%', height: 7, border: "1px solid #d4d4d4", marginLeft: 5, marginRight: 5, textAlign: 'center'}}
                                                                                                    id={"percent75"}
                                                                                                >
                                                                                                    <p style={{paddingTop: 5, fontSize: 12,fontWeight: 600}}>75%</p>
                                                                                                </Col>
                                                                                                <Col
                                                                                                    onClick={() => {
                                                                                                        changePercentStake(100)
                                                                                                    }}
                                                                                                    style={{width: '20%', height: 7, border: "1px solid #d4d4d4", marginLeft: 5, marginRight: 5, textAlign: 'center'}}
                                                                                                    id={"percent100"}
                                                                                                >
                                                                                                    <p style={{paddingTop: 5, fontSize: 12,fontWeight: 600}}>100%</p>
                                                                                                </Col>
                                                                                            </Row>
                                                                                        </div>
                                                                                        {/*<small  style={{color: "#1171ef"}}>Total FTXF assets: ~{totalAmountApprove.toFixed(4)}</small>*/}
                                                                                    </Row>
                                                                                    <label
                                                                                        className="form-control-label"
                                                                                        style={{fontSize: 20, color: "#1171ef", marginTop: 20}}
                                                                                    >
                                                                                        Date Stake
                                                                                    </label>
                                                                                    <Row>
                                                                                        <div style={{
                                                                                            border: '1px solid #e0e0e0',
                                                                                            height: 60,
                                                                                            width: '100%',
                                                                                            borderRadius: 15,
                                                                                            backgroundColor: 'white'
                                                                                        }}>
                                                                                            <FormGroup>
                                                                                                <Row style={{position: 'relative'}}>
                                                                                                    <Col style={{
                                                                                                        position: 'absolute',
                                                                                                    }}>
                                                                                                        <Input
                                                                                                            className="form-control-alternative"
                                                                                                            value={dateStake}
                                                                                                            type="select"
                                                                                                            style={{
                                                                                                                width: '100%',
                                                                                                                height: 58,
                                                                                                                boxShadow: 'none',
                                                                                                                borderRadius: 15
                                                                                                            }}
                                                                                                            onChange={(e) => changeDateStake(e)}
                                                                                                        >
                                                                                                            <option value={70}>
                                                                                                                70 days
                                                                                                            </option>
                                                                                                            <option value={90}>
                                                                                                                90 days
                                                                                                            </option>
                                                                                                            <option value={120}>
                                                                                                                120 days
                                                                                                            </option>
                                                                                                            <option value={180}>
                                                                                                                180 days
                                                                                                            </option>
                                                                                                            <option value={360}>
                                                                                                                360 days
                                                                                                            </option>
                                                                                                            <option value={540}>
                                                                                                                540 days
                                                                                                            </option>
                                                                                                            <option value={720}>
                                                                                                                720 days
                                                                                                            </option>
                                                                                                        </Input>
                                                                                                    </Col>
                                                                                                </Row>
                                                                                            </FormGroup>
                                                                                        </div>
                                                                                    </Row>
                                                                                    <Row className="mt-3" >
                                                                                        <Col lg="6" xs="6">
                                                                                            <p style={{fontSize: 13}}>Pestimated Annual Yield: {interestPercent}</p>
                                                                                        </Col>
                                                                                        <Col lg="6" xs="6" className="text-right">
                                                                                            <Button
                                                                                                onClick={async () => {
                                                                                                    // await submitAmountStack();
                                                                                                    await submitDateStake();
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
                                                                                                            className="font-weight-light">: {quantityStake.toFixed(4)}</span>
                                                                                                    </h3>
                                                                                                </Col>
                                                                                                <Col lg="4" xs="12" className="mt-2">
                                                                                                    {
                                                                                                        historyStake.length === 0 ?
                                                                                                        <Button
                                                                                                            color="white"
                                                                                                            onClick={toggle}
                                                                                                            type={'reset'}
                                                                                                            style={{width: "100%", color: "#11cdef", height: 40}}
                                                                                                        >
                                                                                                            Unstake
                                                                                                        </Button> : ""
                                                                                                    }
                                                                                                </Col>
                                                                                            </Row>
                                                                                            <Row className="mt-4">
                                                                                                <Col lg="8" xs="12" className="mt-2">
                                                                                                    <h3 className="m-0 p-2 mb-sm-2 " style={{color: '#11cdef', backgroundColor: 'white',borderRadius: 5}}>
                                                                                                        Reward stake:
                                                                                                        <span
                                                                                                            className="font-weight-light"> {rewardStake.toFixed(4)}</span>
                                                                                                    </h3>
                                                                                                </Col>
                                                                                                <Col lg="4" xs="12" className="mt-2">
                                                                                                    <Button
                                                                                                        color="white"
                                                                                                        onClick={async () => {
                                                                                                            // await withdrawRewardStake();
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
                                                // await withdrawStake();
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
