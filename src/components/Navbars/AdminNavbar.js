import React, {ChildContextProvider} from "react";
import {Link} from "react-router-dom";
import {
    UncontrolledDropdown,
    DropdownToggle,
    Navbar,
    Nav,
    Container, Button, Form, Col, Row
} from "reactstrap";
import Web3 from 'web3'
import DataContext from "../../context";
import Login from "../../share/auth/index";

const AdminNavbar = (props) => {

    async function connectToMetaMask(data, addressSponsor) {
        if (window.ethereum) {
            const web3 = new Web3(window.ethereum);
            try {
                window.ethereum.enable().then(async function () {
                    const web3 = new Web3(Web3.givenProvider);
                    const accounts = await web3.eth.getAccounts();
                    let dataJson = JSON.parse(await Login.addAccount(accounts[0], addressSponsor))
                    data.UpdateInfoUser(dataJson.user.linkRef, dataJson.user.statusVerify,
                        dataJson.user.email, dataJson.user.id, dataJson.user.totalSales, dataJson.listChild, dataJson.user.totalSalesBranch);
                    await data.updateData();
                });
            } catch (e) {

            }
        } else if (window.web3) {
            const web3 = new Web3(window.web3.currentProvider);
        } else {
            alert('You have to install MetaMask !');
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
                    </Navbar>
                )}
            </DataContext.Consumer>
        </>
    );
};

export default AdminNavbar;
