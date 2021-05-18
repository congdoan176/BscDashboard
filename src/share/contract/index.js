import React from "react";
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

    async function withdrawBlockUnLook(){
        const web3 = new Web3(Web3.givenProvider);
        const account = await web3.eth.getAccounts();
        if (account.length > 0){
            const data = new web3.eth.Contract(fdJson, Address.FounderAddress);
            try {
                data.methods.releaseAllMyToken().send({
                    from: account[0]
                })
            }catch (e) {
                console.log("call function releaseAllMyToken fail", e)
            }
        }
    }

    return (
        <>
            <Row>
                <Col lg="12">
                    <Card className="shadow">
                        <CardHeader style={{borderBottom: "none"}}>
                            <Row className="align-items-center">
                                <div className="col text-left">
                                    {
                                        props.headerText === "BNB" ?
                                            <img
                                                className="navbar-brand-img"
                                                src={require("../../assets/img/icons/Binance-Coin-BNB-icon.png").default}
                                                style={{width: 70, height: 70}}
                                            /> : props.headerText === "USDT" ?
                                            <img
                                                className="navbar-brand-img"
                                                src={require("../../assets/img/icons/Tether-USDT-icon.png").default}
                                                style={{width: 70, height: 70}}
                                            /> : props.headerText === "FTXF" ?
                                            <img
                                                className="navbar-brand-img"
                                                src={require("../../assets/img/icons/coinF.png").default}
                                                style={{width: 70, height: 70}}
                                            /> :
                                            <img
                                                className="navbar-brand-img"
                                                src={require("../../assets/img/icons/ftxf-dapps.png").default}
                                                style={{width: 70, height: 70}}
                                            />
                                    }
                                </div>
                                <div className="col text-right pr-5">
                                    <h2 className="mb-0" style={{fontWeight: 'bold'}}>{props.headerText}</h2>
                                </div>
                            </Row>
                            {/*backgroundColor: 'rgb(251, 140, 0)',*/}
                        </CardHeader>
                        <CardBody style={props.headerText === "BNB" ? {backgroundColor: 'rgb(251, 140, 0)',borderTopRightRadius: '50%',borderTopLeftRadius: '50%', width: '100%', top: -20, left: '-50%'} :
                                         props.headerText === "USDT" ? {backgroundColor: 'rgb(79, 161, 117)',borderTopLeftRadius: '50%', borderTopRightRadius: '50%', width: '100%', top: -20, left: '-50%'} :
                                         props.headerText === "Token Lock" ? {background: 'linear-gradient( 315deg , #00d6ff 0%, #3ab5e3 100%)',borderTopRightRadius: '50%',borderTopLeftRadius: '50%', width: '100%', top: -20, left: '-50%'} :
                                         props.headerText === "FTX Eshare" ? {backgroundColor: 'rgb(0, 214, 255)',borderTopRightRadius: '50%',borderTopLeftRadius: '50%', width: '100%', top: -20, left: '-50%'} :
                                         props.headerText === "FTXF" ? {backgroundColor: 'rgb(58, 181, 227)',borderTopRightRadius: '50%',borderTopLeftRadius: '50%', width: '100%', top: -20, left: '-50%'} : null
                        }>
                            {
                                props.headerText !== "Token Lock" ?
                                    <div>
                                        <div className="mt-5">
                                            <div className="col text-right">
                                                <h3 className="font-weight-light" style={{fontSize: 20, color:'white', fontWeight: "bold"}}>Amount:
                                                    <span> ~{props.accountBalance}</span>
                                                </h3>
                                            </div>
                                        </div>
                                    </div> :
                                    <div>
                                        <Row className="mt-5">
                                            <Col lg="8">
                                                <h3 className="mt-2 font-weight-light" style={{color: 'white', fontSize:20}}>
                                                    Total amount locked
                                                    <span
                                                        className="">: {props.totalAmountLooked / 1000000000000000000}</span>
                                                </h3>
                                            </Col>
                                        </Row>
                                        <Row className="mt-2">
                                            <Col lg="8">
                                                <h3 className="mt-2 font-weight-light" style={{color: 'white', fontSize:20}}>
                                                    Amount unlock:
                                                    <span
                                                        className="font-weight-light"> {props.amountUnlook / 1000000000000000000}</span>
                                                </h3>
                                            </Col>
                                            <Col lg="4">
                                                {
                                                    props.amountUnlook > 0 ?
                                                        <Button
                                                            color="white"
                                                            onClick={async () => {
                                                                await withdrawBlockUnLook();
                                                            }}
                                                            size="lgs"
                                                            type={'reset'}
                                                        >
                                                            Withdraw
                                                        </Button> : null
                                                }
                                            </Col>
                                        </Row>
                                    </div>
                            }
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default Contract;
