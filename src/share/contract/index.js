import React from "react";
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Container,
    Row,
    Col, CardTitle,
} from "reactstrap";
import UserHeader from "components/Headers/UserHeader.js";

const Contract = (props) => {

    function numberFormat(number) {
        if (number === "" || number === undefined){
            return 0;
        }
        return String(number).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }


    return (
        <>
            <Row>
                <Card className="shadow">
                    <CardHeader className="bg-transparent">
                        <Row className="align-items-center">
                            <div className="col">
                                <h2 className="mb-0">{props.headerText}</h2>
                            </div>
                        </Row>
                    </CardHeader>
                    <CardBody>
                        <div className="">
                            <h3>
                                Account address
                                <span className="font-weight-light">: {props.accountAddress}</span>
                            </h3>
                            <div className="h5 mt-4">
                                <h3>
                                    Total Balance
                                    <span className="font-weight-light">: {props.accountBalance}</span>
                                </h3>
                            </div>
                            <div>
                                <h3>
                                    Your chain
                                    <span className="font-weight-light">: {props.accountChain}</span>
                                </h3>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Row>
        </>
    );
};

export default Contract;
