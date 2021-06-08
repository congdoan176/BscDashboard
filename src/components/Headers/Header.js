import React, {useState, useEffect} from "react";
import {Container, Modal, ModalBody, ModalHeader} from "reactstrap";
import DataContext from "../../context/index";
import { Col, Row } from "reactstrap";
import Address from "../../json/addressContract/address.json"

const Header = () => {
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(false);

    // function setCookie(cname,cvalue,exdays) {
    //     var d = new Date();
    //     d.setTime(d.getTime() + (exdays*24*60*60*1000));
    //     var expires = "expires=" + d.toGMTString();
    //     document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    // }
    //
    // function getCookie(cname) {
    //     var name = cname + "=";
    //     var decodedCookie = decodeURIComponent(document.cookie);
    //     var ca = decodedCookie.split(';');
    //     for(var i = 0; i < ca.length; i++) {
    //         var c = ca[i];
    //         while (c.charAt(0) == ' ') {
    //             c = c.substring(1);
    //         }
    //         if (c.indexOf(name) == 0) {
    //             return c.substring(name.length, c.length);
    //         }
    //     }
    //     return "";
    // }
    //
    // function checkCookie(){
    //     var cookieTime = getCookie("timeStamp");
    //     let thisTime = new Date().getTime();
    //     if (cookieTime !== ""){
    //         if (thisTime - cookieTime > 10800000){
    //             setModal(true);
    //         }
    //     }else {
    //         setModal(true)
    //         let time = new Date().getTime();
    //         setCookie("timeStamp",time, 30);
    //     }
    //
    // }

    useEffect(async () => {
        // checkCookie();
    })

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
                        <Modal isOpen={modal} toggle={toggle} size={'xl'}>
                            <ModalHeader toggle={toggle}></ModalHeader>
                            <ModalBody>
                                <img src="https://storage.googleapis.com/ftxtoken.appspot.com/photo_2021-06-01_19-34-15.jpg" alt="" width={'100%'} height={'100%'}/>
                            </ModalBody>
                        </Modal>
                    </div>
                )}
            </DataContext.Consumer>
        </>
    );
};

export default Header;
