import React from "react";
import {
    Row,
    Col,
} from "reactstrap";

const ProfileBlock = (props) => {
    return (
        <>
            <Row style={{
                height: "100%",
                borderRadius: 10,
                border: "2px solid #11cdef",
                marginTop: 10,
                width: '90%',
                marginLeft: "5%"
            }}>
                <Col lg="3" xs="2" style={{marginTop:25, paddingBottom: 10}}>
                    {
                        props.headerTextTop === "Direct sale" && props.headerTextBottom === "Total sale" ?
                        <img
                            className="navbar-brand-img"
                            src={require("../../assets/img/icons/img/logo/ds.png").default}
                            style={{width: 55, height: 55, }}
                        /> : props.headerTextTop === "Referral users" && props.headerTextBottom === "Total referral sale" ?
                        <img
                            className="navbar-brand-img"
                            src={require("../../assets/img/icons/img/logo/tru.png").default}
                            style={{width: 55, height: 55}}
                        /> : ""
                    }
                </Col>
                <Col lg="5" xs="6" className="text-left">
                    <h5  style={{paddingTop: 20, paddingLeft: "7%"}}>
                        {props.headerTextTop}
                    </h5>
                    <h5 style={{paddingTop: 20, paddingLeft: "7%"}}>
                        {props.headerTextBottom}
                    </h5>
                </Col>
                <Col lg="4" xs="4">
                    <h5 style={{paddingTop: 20}}>
                        {
                            props.headerTextTop === "Direct sale" && props.headerTextBottom === "Total sale" ? "~" : ""

                        }
                        {props.valueTop}
                    </h5>
                    <h5 style={{paddingTop: 20}}>
                        {
                            props.headerTextTop === "Direct sale" && props.headerTextBottom === "Total sale" ? "~" : ""

                        }
                        {props.valueBotoom}
                    </h5>
                </Col>
            </Row>
        </>
    );
};

export default ProfileBlock;
