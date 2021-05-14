import React, {useState, useEffect} from "react";
import {
    Container,
    Row,
    Col,
    Card
} from "reactstrap";
import Contract from "../share/contract";
import Header from "../components/Headers/Header.js";
import DataContext from "../context";
import fdJson from "../json/founder/contract.json";
import Web3 from "web3";
import Address from "../json/addressContract/address.json";


const Index = (props) => {

    const [lookedFullAmount, setLookedFullAmount] = useState(0);
    const [amountLooked, setAmountLooked] = useState(0);
    const [amountUnLook, setAmountUnLook] = useState(0);

    async function getAmountLookedFullAmount(){
        const web3 = new Web3(Web3.givenProvider);
        const account = await web3.eth.getAccounts();
        if (account.length > 0){
            const data = new web3.eth.Contract(fdJson, Address.FounderAddress);
            data.methods.getLockedFullAmount(account[0]).call(function (err, res){
                if (err){
                    console.log("get full amount looked fail", err);
                    return;
                }
                setLookedFullAmount(res);
            })
        }
    }

    async function getAmountUnLockAmount() {
        const web3 = new Web3(Web3.givenProvider);
        const account = await web3.eth.getAccounts();
        if (account.length > 0){
            const data = new web3.eth.Contract(fdJson, Address.FounderAddress);
            data.methods.getLockedAmount(account[0]).call(function (err, res){
                if (err){
                    console.log("get full amount looked fail", err);
                    return;
                }
                setAmountUnLook(res);
            })
        }
    }

    useEffect(async () => {
        await getAmountLookedFullAmount()
        await getAmountUnLockAmount()
        setAmountLooked(lookedFullAmount - amountUnLook);

    })


    return (
        <>
            <Header/>
            <DataContext.Consumer>
                {data => (
                    <Container className="mt--7" fluid>
                        <Row>
                            <Col className="mb-5 mb-xl-0" xl="6">
                                <Contract {...props} headerText={"FTX Eshare"}
                                          accountChain={data.accountChain} accountBalance={data.balanceFTXFS}/>
                            </Col>
                            <Col xl="6">
                                <Contract {...props} headerText={"FTX"}
                                          accountChain={data.accountChain} accountBalance={data.balanceFTXF}/>
                            </Col>
                        </Row>
                        <Row className={"mt-5"}>
                            <Col className="mb-5 mb-xl-0" xl="6">
                                <Contract {...props} headerText={"BNB"}
                                          accountChain={data.accountChain} accountBalance={data.balanceBNB}/>
                            </Col>
                            <Col xl="6">
                                <Contract {...props} headerText={"USDT"}
                                          accountChain={data.accountChain} accountBalance={data.balanceUSDT}/>
                            </Col>
                        </Row>
                        <Row className={"mt-5"}>
                            <Col className="mb-5 mb-xl-0" xl="6">
                                <Contract {...props} headerText={"Token Lock"}
                                          accountChain={data.accountChain} totalAmountLooked={lookedFullAmount} amountLooked={amountLooked} amountUnlook={amountUnLook}/>
                            </Col>
                            <Col xl="6">

                            </Col>
                        </Row>
                    </Container>
                )}
            </DataContext.Consumer>
        </>
    );
};

export default Index;
