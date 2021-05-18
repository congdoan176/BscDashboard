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
                        dataJson.user.email, dataJson.user.id, dataJson.user.totalSales, dataJson.listChild);
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
                                FTXF Dapp
                            </Link>
                            {
                                data.accountAddress === "" ?
                                    <Col lg={6} sm={6}>
                                        <div style={{border: 1, borderRadius: 30, backgroundColor: 'white'}}>
                                            <div className="pt-2 text-center" style={{paddingBottom: 2}}>
                                                <h4 style={{fontWeight: "bold"}}>Account address</h4>
                                            </div>
                                        </div>
                                    </Col> :  data.accountAddress !== "" ?
                                    <Col lg={5} sm={12}>
                                        <div style={{border: 1, borderRadius: 30, backgroundColor: 'white'}}>
                                            <div className="pt-2 text-center" style={{paddingBottom: 2}}>
                                                <h4 style={{fontWeight: "bold"}}>Account address</h4>
                                                <p style={{fontSize: 12, fontWeight: "bold"}}>{data.accountAddress}</p>
                                            </div>
                                        </div>
                                    </Col> : ""
                            }
                            <Nav className="align-items-center d-none d-md-flex" navbar>
                                <UncontrolledDropdown nav>
                                    <DropdownToggle className="pr-0" nav>
                                        <Button
                                            color="white"
                                            onClick={async () => {
                                                await connectToMetaMask(data, data.addressSponsor);
                                            }}
                                            size="lg"
                                        >
                                            Connect
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
