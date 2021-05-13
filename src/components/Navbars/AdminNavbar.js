import React, {ChildContextProvider} from "react";
import {Link} from "react-router-dom";
import {
    UncontrolledDropdown,
    DropdownToggle,
    Navbar,
    Nav,
    Container, Button,Form,
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
                    data.UpdateInfoUser(dataJson.linkRef, dataJson.statusVerify, dataJson.email)
                    // await Login.addAccount(accounts[0], addressSponsor);
                    // await data.updateData();
                });
            } catch (e) {

            }
        }
        else if (window.web3) {
            const web3 = new Web3(window.web3.currentProvider);
        }
        else {
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
                                {props.brandText}
                            </Link>
                            <div style={{border: 1, borderRadius: 30, backgroundColor: 'white'}}>
                                <div className="pl-5 pr-5 pt-2">
                                    <h4 style={{fontWeight: "bold"}}>Account address: <span>{data.accountAddress}</span></h4>
                                </div>
                            </div>
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
