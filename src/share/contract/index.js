import React, {useEffect} from "react";
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    Row,
    Col,
} from "reactstrap";
import Web3 from "web3";
import fdJson from "../../json/founder/contract.json";
import Address from "../../json/addressContract/address.json";

const Contract = (props) => {

    async function withdrawBlockUnLook() {
        const web3 = new Web3(Web3.givenProvider);
        const account = await web3.eth.getAccounts();
        if (account.length > 0) {
            const data = new web3.eth.Contract(fdJson, Address.FounderAddress);
            try {
                data.methods.releaseAllMyToken().send({
                    from: account[0]
                })
            } catch (e) {
                console.log("call function releaseAllMyToken fail", e)
            }
        }
    }

    return (
        <>
            <Row>
                <Col lg="12" xs="12"
                     className="ml-lg-5"
                     style={{
                         height: "100%",
                         borderRadius: 10,
                         border: "2px solid #11cdef",
                     }}
                >
                    {
                        props.headerText !== "FTXF Lock" ?
                        <Row style={{marginTop: 10}}>
                            <Col lg="2" xs="3" style={{paddingLeft: 20, paddingBottom: 10}}>
                                {
                                    props.headerText === "BNB" ?
                                        <img
                                            className="navbar-brand-img"
                                            src={require("../../assets/img/icons/img/logo/Asset 1.png").default}
                                            style={{width: 55, height: 55}}
                                        /> : props.headerText === "USDT" ?
                                        <img
                                            className="navbar-brand-img"
                                            src={require("../../assets/img/icons/img/logo/Asset 3.png").default}
                                            style={{width: 55, height: 55}}
                                        /> : props.headerText === "FTXF" ?
                                        <img
                                            className="navbar-brand-img"
                                            src={require("../../assets/img/icons/img/logo/Asset 4.png").default}
                                            style={{width: 55, height: 55}}
                                        /> :
                                        <img
                                            className="navbar-brand-img"
                                            src={require("../../assets/img/icons/img/logo/es.png").default}
                                            style={{width: 55, height: 55}}
                                        />
                                }
                            </Col>
                            <Col lg="3" xs="5" className="text-lg-left pl-3 text-center">

                                {
                                    props.headerText === "BNB" || props.headerText === "FTXF" ?
                                        <div>
                                            <h4 style={{paddingTop: 3}}>
                                                {props.headerText}
                                            </h4>
                                            <p style={{fontSize: 12}}>Current price : {props.amount}</p>
                                        </div> :
                                        <h4 style={{paddingTop: 20}}>
                                            {props.headerText}
                                        </h4>
                                }
                            </Col>
                            <Col lg="2" xs="4">
                                <h4 style={{paddingTop: 20}}>
                                    {"~" + props.accountBalance}
                                </h4>
                            </Col>
                            <Col lg="5" xs="12">
                                <Row>
                                    <Col lg="12" xs="8">
                                        <h4>
                                            Total Assets ( USDT ):
                                        </h4>
                                    </Col>
                                    <Col lg="12" xs="4">
                                        <h4 className="pl-lg-0 pl-2">
                                            {props.amount * props.accountBalance}
                                        </h4>
                                    </Col>
                                </Row>
                            </Col>
                        </Row> :
                        <Row style={{marginTop: 10}}>
                            <Col lg="2" xs="4" style={{paddingLeft: 10}}>
                                <img
                                    className="navbar-brand-img"
                                    src={require("../../assets/img/icons/img/logo/lock.png").default}
                                    style={{width: 55, height: 55}}
                                />
                            </Col>
                            <Col lg="2" xs="4" className="d-none d-xl-block d-lg-block d-md-block">
                                <h4 style={{paddingTop: 18}}>
                                    {props.headerText}
                                </h4>
                            </Col>
                            <Col lg="3" xs="8" className="text-left">
                                <h5 style={{paddingTop: 20}}>
                                    Total FTXF locked:
                                    <span>
                                             {" ~" + props.totalAmountLooked}
                                        </span>
                                </h5>
                            </Col>
                            <Col lg="2" xs="4" className="d-none-block d-xl-none d-lg-none d-md-none">
                                <h4 style={{paddingTop: 18}}>
                                    {props.headerText}
                                </h4>
                            </Col>
                            <Col lg="3" xs="8" className="text-left">
                                <h5 style={{paddingTop: 20}}>
                                    Total FTXF unlock:
                                    <span>
                                            {" ~" + props.amountUnlook}
                                    </span>
                                </h5>
                            </Col>
                            <Col lg="2" xs="12" className="mt-2 mb-3">
                                {
                                    props.amountUnlook > 0 ?
                                        <Button
                                            color="white"
                                            onClick={async () => {
                                                await withdrawBlockUnLook();
                                            }}
                                            size="lgs"
                                            type={'reset'}
                                            style={{width: "100%", background: "linear-gradient(87deg, #11cdef 0, #1171ef 100%)", color: "white"}}
                                        >
                                            Withdraw
                                        </Button> : ""
                                }
                            </Col>
                        </Row>
                    }
                </Col>
            </Row>
        </>
    );
};
export default Contract;
