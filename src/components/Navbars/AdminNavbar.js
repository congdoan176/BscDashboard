import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Form,
    FormGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    InputGroup,
    Navbar,
    Nav,
    Container,
    Media, Button,
} from "reactstrap";
import Web3 from 'web3'
import Login from "../../share/login/index"

const AdminNavbar = (props) => {

    async function connectToMetaMask() {
        if (window.ethereum) {
            const web3 = new Web3(window.ethereum);
            try {
                window.ethereum.enable().then(async function () {
                    const web3 = new Web3(Web3.givenProvider || 'http://localhost:3000')
                    const accounts = await web3.eth.getAccounts()
                    await Login.login(accounts[0])
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
            <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
                <Container fluid>
                    <Link
                        className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
                        to="/"
                    >
                        {props.brandText}
                    </Link>
                    <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
                        <FormGroup className="mb-0">
                            <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="fas fa-search"/>
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input placeholder="Search" type="text"/>
                            </InputGroup>
                        </FormGroup>
                    </Form>
                    <Nav className="align-items-center d-none d-md-flex" navbar>
                        <UncontrolledDropdown nav>
                            <DropdownToggle className="pr-0" nav>
                                <Button
                                    color="white"
                                    onClick={async () => {
                                        await connectToMetaMask()
                                    }}
                                    size="lg"
                                >
                                    Connect to Metamask
                                </Button>
                            </DropdownToggle>
                        </UncontrolledDropdown>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
};

export default AdminNavbar;
