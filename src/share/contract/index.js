import React from "react";
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    Row,
    Col,
} from "reactstrap";

const Contract = (props) => {


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
                                            /> : props.headerText === "FTX" ?
                                            <img
                                                className="navbar-brand-img"
                                                src={require("../../assets/img/icons/ftxf-dapps.png").default}
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
                                         props.headerText === "USDT" ? {backgroundColor: 'rgb(79, 161, 117)',borderTopRightRadius: '50%',borderTopLeftRadius: '50%', width: '100%', top: -20, left: '-50%'} :
                                         props.headerText === "Token Look" ? {backgroundColor: 'rgb(150, 150, 150)',borderTopRightRadius: '50%',borderTopLeftRadius: '50%', width: '100%', top: -20, left: '-50%'} :
                                         props.headerText === "FTX" || "FTX Eshare" ? {backgroundColor: 'rgb(255, 213, 0)',borderTopRightRadius: '50%',borderTopLeftRadius: '50%', width: '100%', top: -20, left: '-50%'} : null
                        }>
                            {
                                props.headerText !== "Token Look" ?
                                    <div>
                                        <div className="mt-5">
                                            <div className="col text-right">
                                                <h3 className="font-weight-light" style={{fontSize: 20, color:'white', fontWeight: "bold"}}>Amount:
                                                    <span> ~{props.accountBalance}</span>
                                                </h3>
                                            </div>
                                        </div>
                                        <div className="mt-2">
                                            <div className="col text-right">
                                                <h3 className="font-weight-light" style={{fontSize: 20, color:'white', fontWeight: "bold"}}>Chain Id:
                                                    <span> {props.accountChain}</span>
                                                </h3>
                                            </div>
                                        </div>
                                    </div> :
                                    <div>
                                        <Row className="mt-5">
                                            <Col lg="8">
                                                <h3 className="mt-2">
                                                    Quantity stake
                                                    <span
                                                        className="font-weight-light">: {0}</span>
                                                </h3>
                                            </Col>
                                            <Col lg="4">
                                                <Button
                                                    color="white"
                                                    onClick={() => {

                                                    }}
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
                                                        className="font-weight-light"> {0}</span>
                                                </h3>
                                            </Col>
                                            <Col lg="4">
                                                <Button
                                                    color="white"
                                                    onClick={async () => {

                                                    }}
                                                    size="lgs"
                                                    type={'reset'}
                                                >
                                                    Withdraw
                                                </Button>
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
