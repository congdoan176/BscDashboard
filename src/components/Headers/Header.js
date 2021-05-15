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
                    <div className="header bg-gradient-info pb-7 pt-md-8 " style={{paddingTop: 110}}>
                        {
                            data.accountAddress !== "" && data.userVerifyStatus === "" ?
                                <Container fluid>
                                    <Row>
                                        <Col lg="3" xs="2"/>
                                        <Col lg="5" xs="6" className="header-body text-center" style={{marginLeft:40}}>
                                            {
                                                data.accountAddress === Address.AdminAddress ?
                                                <a href="/admin/user_profile" style={{color: '#eeff05', fontWeight: "bold", fontSize: 19}}>Please Verify email</a> :
                                                <a href="/user/user_profile" style={{color: '#eeff05', fontWeight: "bold", fontSize: 19}}>Please verify email</a>
                                            }
                                        </Col>
                                        <Col lg="4" xs="4"/>
                                    </Row>
                                </Container> : null
                        }
                    </div>
                )}
            </DataContext.Consumer>
        </>
    );
};

export default Header;
