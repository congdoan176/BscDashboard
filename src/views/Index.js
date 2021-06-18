import React, {useState, useEffect, useContext} from "react";
import {
    Container,
    Row,
    Col,
    Card, CardBody, ModalHeader, ModalBody, FormGroup, Input, ModalFooter, Button, Modal
} from "reactstrap";
import Contract from "../share/contract/contract";
import Header from "../components/Headers/Header.js";
import DataContext from "../context";
import Address from "../json/addressContract/address.json";
import Round from "../share/roud/roud";

const Index = (props) => {

    const [amountBNB, setAmountBNB] = useState(0);
    const [changePercent, setChangePercent] = useState("");
    const [changePercentStatus, setChangePercentStatus] = useState("");
    const [currentRound, setCurrentRound] = useState(0);
    const [amountFTXF, setAmountFTXF] = useState(0);

    const [modal, setModal] = useState(true);

    const toggle = () => setModal(false);

    async function getAmountBNB(){
        let data = await Round.getAmountBNB()
        let dataJson = JSON.parse(data);
        setAmountBNB(dataJson.lastPrice);
        if (dataJson.priceChangePercent.indexOf('-') === -1){
            setChangePercent("+" + dataJson.priceChangePercent)
            setChangePercentStatus("+")
        }else {
            setChangePercent(dataJson.priceChangePercent)
            setChangePercentStatus("-")
        }
    }

    async function getCurrentRow(){
        let arrayAmountFTXF = [0.6, 0.7, 0.75, 0.85 , 0.9, 0.95]
        let data = JSON.parse(await Round.getRound())
        await setCurrentRound(data.currentRound);
        await setAmountFTXF(arrayAmountFTXF[data.currentRound - 1])
    }

    useEffect(async () => {
        await getAmountBNB();
        await getCurrentRow();
    },[])


    return (
        <>
            <Header/>
            <DataContext.Consumer>
                {data => (
                    <div>
                        <Container className="mt-lg--5 mt--6"  fluid>
                            <Card className="shadow">
                                <CardBody className="pt-0 text-center">
                                    {
                                        data.balanceFTXFS > 0 ?
                                            <Row className="mt-lg-5 mt-3">
                                                <Col lg="11" xs="12">
                                                    <Contract {...props} headerText={"E-shares"} amount={1}
                                                              accountBalance={data.balanceFTXFS}/>
                                                </Col>
                                            </Row> : ""
                                    }
                                    <Row className="mt-lg-5 mt-3">
                                        <Col lg="11" xs="12">
                                            <Contract {...props} headerText={"FTXF"} amount={amountFTXF}
                                                      accountBalance={data.balanceFTXF} changePercent={"1"}/>
                                        </Col>
                                    </Row>
                                    <Row className="mt-lg-5 mt-3">
                                        <Col lg="11" xs="12">
                                            <Contract {...props} headerText={"USDT"} amount={1}
                                                      accountBalance={data.balanceUSDT} changePercent={"-0.02"} changePercentStatus={"-"}/>
                                        </Col>
                                    </Row>
                                    <Row className="mt-lg-5 mt-3">
                                        <Col lg="11" xs="12">
                                            <Contract {...props} headerText={"BNB"} amount={amountBNB}
                                                      accountBalance={data.balanceBNB} changePercent={changePercent} changePercentStatus={changePercentStatus}/>
                                        </Col>
                                    </Row>
                                    {
                                        data.lookedFullAmount > 0 ?
                                            <Row className="mt-lg-5 mt-3">
                                                <Col lg="11" xs="12">
                                                    <Contract {...props} headerText={"FTXF Lock"}
                                                              amount={amountFTXF}
                                                              totalAmountLooked={data.lookedFullAmount} amountUnlook={data.amountUnLook}/>
                                                </Col>
                                            </Row>  : ""
                                    }
                                </CardBody>
                            </Card>
                        </Container>
                        {/*{(data.balanceFTXFS > 0) ?*/}
                        {/*    */}
                        {/*    :*/}
                        {/*    <Container className="mt-lg--5 mt--6" fluid>*/}
                        {/*        <Card className="card-profile shadow">*/}
                        {/*            <CardBody className="pt-0 text-center">*/}
                        {/*                <Row className="mt-lg-5 mt-3">*/}
                        {/*                    <Col lg="11" xs="12">*/}
                        {/*                        <Contract {...props} headerText={"BNB"} amount={amountBNB}*/}
                        {/*                                  accountBalance={data.balanceBNB} changePercent={changePercent} changePercentStatus={changePercentStatus}/>*/}
                        {/*                    </Col>*/}
                        {/*                </Row>*/}
                        {/*                <Row className="mt-lg-5 mt-3">*/}
                        {/*                    <Col lg="11" xs="12">*/}
                        {/*                        <Contract {...props} headerText={"FTXF"}*/}
                        {/*                                  amount={amountFTXF} accountBalance={data.balanceFTXF} changePercent={"1"}/>*/}
                        {/*                    </Col>*/}
                        {/*                </Row>*/}
                        {/*                <Row className="mt-lg-5 mt-3">*/}
                        {/*                    <Col lg="11" xs="12">*/}
                        {/*                        <Contract {...props} headerText={"USDT"} amount={1}*/}
                        {/*                                  accountBalance={data.balanceUSDT} changePercent={"0.02"} changePercentStatus={"-"}/>*/}
                        {/*                    </Col>*/}
                        {/*                </Row>*/}
                        {/*            </CardBody>*/}
                        {/*        </Card>*/}
                        {/*    </Container>*/}
                        {/*}*/}
                    </div>
                )}
            </DataContext.Consumer>
        </>
    );
}
export default Index
