import React, {useState, useEffect, useContext} from "react";
import {
    Container,
    Row,
    Col,
    Card, CardBody
} from "reactstrap";
import Contract from "../share/contract";
import Header from "../components/Headers/Header.js";
import DataContext from "../context";
import Address from "../json/addressContract/address.json";
import Round from "../share/roud";

const Index = (props) => {

    const [amountBNB, setAmountBNB] = useState(0);
    const [changePercent, setChangePercent] = useState(0);
    const [currentRound, setCurrentRound] = useState(0);
    const [amountFTXF, setAmountFTXF] = useState(0);

    async function getAmountBNB(){
        let data = await Round.getAmountBNB()
        let dataJson = JSON.parse(data);
        setAmountBNB(dataJson.lastPrice);
        setChangePercent(dataJson.priceChangePercent)
    }

    async function getCurrentRow(){
        let arrayAmountFTXF = [0.6, 0.7, 0.75, 0.85 , 0.9, 0.95]
        let data = await Round.getRound()
        let dataJson = JSON.parse(data);
        setCurrentRound(dataJson.currentRound);
        setAmountFTXF(arrayAmountFTXF[currentRound-1])

    }

    useEffect(async () => {
        // await getAmountBNB();
        await getCurrentRow();
    })


    return (
        <>
            <Header/>
            <DataContext.Consumer>
                {data => (
                    <div>
                        {(data.balanceFTXFS > 0) ?
                            <Container className="mt-lg--5 mt--6"  fluid>
                                <Card className="card-profile shadow">
                                    <CardBody className="pt-0 text-center">
                                        <Row className="mt-lg-5 mt-3">
                                            <Col lg="11" xs="12">
                                                <Contract {...props} headerText={"E-shares"} amount={0.1}
                                                           accountBalance={data.balanceFTXFS}/>
                                            </Col>
                                        </Row>
                                        <Row className="mt-lg-5 mt-3">
                                            <Col lg="11" xs="12">
                                                <Contract {...props} headerText={"FTXF"} amount={amountFTXF}
                                                           accountBalance={data.balanceFTXF}/>
                                            </Col>
                                        </Row>
                                        <Row className="mt-lg-5 mt-3">
                                            <Col lg="11" xs="12">
                                                <Contract {...props} headerText={"USDT"} amount={1}
                                                           accountBalance={data.balanceUSDT}/>
                                            </Col>
                                        </Row>
                                        <Row className="mt-lg-5 mt-3">
                                            <Col lg="11" xs="12">
                                                <Contract {...props} headerText={"BNB"} amount={amountBNB}
                                                          accountBalance={data.balanceBNB}/>
                                            </Col>
                                        </Row>
                                        <Row className="mt-lg-5 mt-3">
                                            <Col lg="11" xs="12">
                                                <Contract {...props} headerText={"FTXF Lock"}
                                                          amount={amountFTXF}
                                                          totalAmountLooked={data.lookedFullAmount} amountUnlook={data.amountUnLook}/>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Container> :
                            <Container className="mt-lg--5 mt--6" fluid>
                                <Card className="card-profile shadow">
                                    <CardBody className="pt-0 text-center">
                                        <Row className="mt-lg-5 mt-3">
                                            <Col lg="11" xs="12">
                                                <Contract {...props} headerText={"BNB"}
                                                          amount={amountBNB} accountBalance={data.balanceBNB}/>
                                            </Col>
                                        </Row>
                                        <Row className="mt-lg-5 mt-3">
                                            <Col lg="11" xs="12">
                                                <Contract {...props} headerText={"FTXF"}
                                                          amount={amountFTXF} accountBalance={data.balanceFTXF}/>
                                            </Col>
                                        </Row>
                                        <Row className="mt-lg-5 mt-3">
                                            <Col lg="11" xs="12">
                                                <Contract {...props} headerText={"USDT"}
                                                          amount={1}
                                                         accountBalance={data.balanceUSDT}/>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Container>
                        }

                    </div>
                )}
            </DataContext.Consumer>
        </>
    );
};

export default Index;
