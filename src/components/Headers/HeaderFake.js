import React from "react";
import {Container} from "reactstrap";
import DataContext from "../../context/index";
import { Col, Row } from "reactstrap";

const HeaderFake = () => {
    return (
        <>
            <DataContext.Consumer>
                {data => (
                    <div className="header pb-7" style={{paddingTop: 115}}>
                        <Container fluid>
                            <Row>
                                <Col lg="12" xs="12" className="header-body bg-gradient-info text-center mt-3 d-none d-xl-block d-lg-block d-md-block"
                                     style={{
                                         borderRadius: 10,
                                         height: 2
                                     }}
                                >
                                </Col>
                            </Row>
                        </Container>
                    </div>
                )}
            </DataContext.Consumer>
        </>
    );
};

export default HeaderFake;
