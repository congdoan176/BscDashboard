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
    Col,
} from "reactstrap";
import UserHeader from "components/Headers/UserHeader.js";

const Contract = (props) => {
    return (
        <>
            <Row>
                <Card className="shadow">
                    <CardBody>
                        <div className="text-center">
                            <h3>
                                Jessica Jones
                                <span className="font-weight-light">, 27</span>
                            </h3>
                            <div className="h5 font-weight-300">
                                <i className="ni location_pin mr-2" />
                                Bucharest, Romania
                            </div>
                            <div className="h5 mt-4">
                                <i className="ni business_briefcase-24 mr-2" />
                                Solution Manager - Creative Tim Officer
                            </div>
                            <div>
                                <i className="ni education_hat mr-2" />
                                University of Computer Science
                            </div>
                            <hr className="my-4" />
                            <p>
                                Ryan — the name taken by Melbourne-raised, Brooklyn-based
                                Nick Murphy — writes, performs and records all of his own
                                music.
                            </p>
                            <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                Show more
                            </a>
                        </div>
                    </CardBody>
                </Card>
            </Row>
        </>
    );
};

export default Contract;
