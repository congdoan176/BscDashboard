import React, {useState} from "react";
import {Link} from "react-router-dom";
import {
    UncontrolledDropdown,
    DropdownToggle,
    Navbar,
    Nav,
    Container, Button, Col, Row, ModalHeader, ModalBody, NavLink, Modal,
} from "reactstrap";
import Web3 from 'web3'
import DataContext from "../../context";
import Login from "../../share/auth/auth";

const AdminNavbar = (props) => {

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    async function connectToMetaMask(data, addressSponsor) {
        if (window.ethereum) {
            // const web3 = new Web3(window.ethereum);
            try {
                window.ethereum.enable().then(async function () {
                    const web3 = new Web3(Web3.givenProvider);
                    const accounts = await web3.eth.getAccounts();
                    let dataJson = JSON.parse(await Login.addAccount(accounts[0].toLowerCase(), addressSponsor.toLowerCase()))
                    data.UpdateInfoUser(dataJson.user.linkRef, dataJson.user.statusVerify,
                        dataJson.user.email, dataJson.user.id, dataJson.user.totalSales,
                        dataJson.listChild, dataJson.user.totalSalesBranch, dataJson.sponsor.address);
                    await data.updateData();
                });
            } catch (e) {

            }
        } else if (window.web3) {
            // const web3 = new Web3(window.web3.currentProvider);
        } else {
            setModal(true)
        }
    }

    return (
        <>
            <DataContext.Consumer>
                {data => (
                    <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
                        <Container fluid>
                            <Link
                                className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
                                to="/"
                            >
                                {/*FTXF Dapp*/}
                            </Link>
                            <Col lg={6} className="text-center d-none d-xl-block d-lg-block d-md-block">
                                <img className="navbar-brand-img"
                                     src={require("../../assets/img/icons/img/Asset 1.png").default}
                                     style={{width: 250, height: 75, marginLeft: 140}}
                                />
                            </Col>
                            <Nav className="align-items-center d-none d-md-flex" style={{marginRight: -30}} navbar>
                                <UncontrolledDropdown nav>
                                    <DropdownToggle nav>
                                        <Button
                                            onClick={async () => {
                                                await connectToMetaMask(data, data.addressSponsor);
                                            }}
                                            style={{background: "linear-gradient(87deg, #11cdef 0, #1171ef 100%)",
                                                borderColor: "#11cdef", color: "white", borderRadius: 10,}}
                                            size="lg"
                                        >
                                            Connect Wallet
                                        </Button>
                                    </DropdownToggle>
                                </UncontrolledDropdown>
                            </Nav>
                        </Container>
                        <Modal isOpen={modal} toggle={toggle}>
                            <ModalHeader toggle={toggle} className="text-center">
                                Connect to wallet
                            </ModalHeader>
                            <ModalBody style={{backgroundColor:"whitesmoke"}}>
                                <Row>
                                    <Col lg={1}/>
                                    <Col lg={10}>
                                        <div style={{backgroundColor: "white", borderRadius: 50, height: 50}}  className="mt-3">
                                            <NavLink href="https://metamask.app.link/dapp/app.ftxfund.com">
                                                <Row className="text-center" style={{paddingTop: 7}}>
                                                    <Col lg={4}>
                                                        <img src="https://registry.walletconnect.org/logo/lg/c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96.jpeg"
                                                             alt="" style={{width: 30, height: 30}}/>

                                                    </Col>
                                                    <Col  className="text-left" lg={6}>
                                                        <h4>Meta Mask</h4>
                                                    </Col>
                                                </Row>
                                            </NavLink>
                                        </div>
                                        <div style={{backgroundColor: "white", borderRadius: 50, height: 50}} className="mt-3">
                                            <NavLink href="https://link.trustwallet.com/wc?uri=wc%3A1c18afff-be2b-45db-bf02-3964c7275501%401%3Fbridge%3Dhttps%253A%252F%252Fapp.ftxfund.com%26key%3De9da54acfb075706a8d4f614383cefc9cfba4ba7580132972894b3f678df8140">
                                                <Row className="text-center" style={{paddingTop: 7}}>
                                                    <Col lg={4}>
                                                        <img src="https://registry.walletconnect.org/logo/lg/4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0.jpeg"
                                                             alt="" style={{width: 30, height: 30}}/>

                                                    </Col>
                                                    <Col  className="text-left" lg={6}>
                                                        <h4>Trust Wallet</h4>
                                                    </Col>
                                                </Row>
                                            </NavLink>
                                        </div>
                                        <div style={{backgroundColor: "white", borderRadius: 50, height: 50}}  className="mt-3">
                                            <NavLink href="imtokenv2://navigate/DappView?url=https://app.ftxfund.com">
                                                <Row className="text-center" style={{paddingTop: 7}}>
                                                    <Col lg={4}>
                                                        <img src="https://registry.walletconnect.org/logo/lg/9d373b43ad4d2cf190fb1a774ec964a1addf406d6fd24af94ab7596e58c291b2.jpeg"
                                                             alt="" style={{width: 30, height: 30}}/>

                                                    </Col>
                                                    <Col  className="text-left" lg={6}>
                                                        <h4>Im Token</h4>
                                                    </Col>
                                                </Row>
                                            </NavLink>
                                        </div>
                                        <div style={{backgroundColor: "white", borderRadius: 50, height: 50}}  className="mt-3">
                                            <NavLink href="https://rnbwapp.com/wc?uri=wc%3Abc19fb70-66ee-4985-9a00-b73d030db3dd%401%3Fbridge%3Dhttps%253A%252F%252Fapp.ftxfund.com%26key%3D968c7cb90a6d9ff0444d01329fc5923b9616159c70fc0518508f08190a35b47a">
                                                <Row className="text-center" style={{paddingTop: 7}}>
                                                    <Col lg={4}>
                                                        <img src="https://registry.walletconnect.org/logo/lg/1ae92b26df02f0abca6304df07debccd18262fdf5fe82daa81593582dac9a369.jpeg"
                                                             alt="" style={{width: 30, height: 30}}/>

                                                    </Col>
                                                    <Col  className="text-left" lg={6}>
                                                        <h4>Rainbown</h4>
                                                    </Col>
                                                </Row>
                                            </NavLink>
                                        </div>
                                        <div style={{backgroundColor: "white", borderRadius: 50, height: 50}}  className="mt-3">
                                            <NavLink href="https://argent.link/app/wc?uri=wc%3Abc19fb70-66ee-4985-9a00-b73d030db3dd%401%3Fbridge%3Dhttps%253A%252F%252Fapp.ftxfund.com%26key%3D968c7cb90a6d9ff0444d01329fc5923b9616159c70fc0518508f08190a35b47a">
                                                <Row className="text-center" style={{paddingTop: 7}}>
                                                    <Col lg={4}>
                                                        <img src="https://registry.walletconnect.org/logo/lg/cf21952a9bc8108bf13b12c92443751e2cc388d27008be4201b92bbc6d83dd46.jpeg"
                                                             alt="" style={{width: 30, height: 30}}/>

                                                    </Col>
                                                    <Col  className="text-left" lg={6}>
                                                        <h4>Agent</h4>
                                                    </Col>
                                                </Row>
                                            </NavLink>
                                        </div>
                                        <div style={{backgroundColor: "white", borderRadius: 50, height: 50}}  className="mt-3">
                                            <NavLink href="https://www.mathwallet.org/wc?uri=wc%3Abc19fb70-66ee-4985-9a00-b73d030db3dd%401%3Fbridge%3Dhttps%253A%252F%252Fapp.ftxfund.com%26key%3D968c7cb90a6d9ff0444d01329fc5923b9616159c70fc0518508f08190a35b47a">
                                                <Row className="text-center" style={{paddingTop: 7}}>
                                                    <Col lg={4}>
                                                        <img src="https://registry.walletconnect.org/logo/lg/7674bb4e353bf52886768a3ddc2a4562ce2f4191c80831291218ebd90f5f5e26.jpeg"
                                                             alt="" style={{width: 30, height: 30}}/>

                                                    </Col>
                                                    <Col  className="text-left" lg={6}>
                                                        <h4>Math Wallet</h4>
                                                    </Col>
                                                </Row>
                                            </NavLink>
                                        </div>
                                    </Col>
                                    <Col lg={1}/>
                                </Row>
                            </ModalBody>
                        </Modal>
                    </Navbar>
                )}
            </DataContext.Consumer>
        </>
    );
};

export default AdminNavbar;
