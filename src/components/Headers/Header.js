import React from "react";
import {Container} from "reactstrap";
import DataContext from "../../context/index";
import { Col, Row } from "reactstrap";
import Address from "../../json/addressContract/address.json"

const Header = () => {
    return (
        <>
            <DataContext.Consumer>
                {data => (
                    <div>
                        <div className="header pb-7 pt-md-8" style={{paddingTop: 50}}>
                            <Container fluid>
                                <Row>
                                    <Col xs="1"/>
                                    <Col lg="12" xs="10" className="header-body bg-gradient-info text-center"
                                         style={{borderRadius: 10, marginTop: -15}}
                                    >
                                        <h4 style={{color: 'white', fontWeight: "bold", paddingTop: 5}}>
                                            WELCOME TO FTXF DAPP PLATFORM
                                        </h4>
                                        {data.userVerifyStatus !== "complete" && data.accountAddress !== "" ?
                                            <div className="mb-1">
                                                {
                                                    data.accountAddress === Address.AdminAddress ?
                                                        <a href="/admin/user_profile" style={{color: 'rgb(238, 255, 5)', fontWeight: "bold", fontSize: 19,}}>Please Verify email</a> :
                                                        <a href="/user/user_profile" style={{color: 'rgb(238, 255, 5)', fontWeight: "bold", fontSize: 19}}>Please verify email</a>
                                                }
                                            </div> : ""
                                        }
                                    </Col>
                                    <Col xs="10"/>
                                </Row>
                            </Container>
                        </div>
                    </div>
                )}
            </DataContext.Consumer>
        </>
    );
};

export default Header;
