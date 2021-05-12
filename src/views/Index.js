import React from "react";
import {
    Container,
    Row,
    Col,
} from "reactstrap";
import Contract from "../share/contract";
import Header from "components/Headers/Header.js";
import DataContext from "../context";

const Index = (props) => {
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
                    </Container>
                )}
            </DataContext.Consumer>
        </>
    );
};

export default Index;
