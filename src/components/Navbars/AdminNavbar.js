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
import jsonFtx from "../../json/ftx/contract.json"
const AdminNavbar = (props) => {
    const [account, setAccount] = useState("")
    const [chainId, setChain] = useState("")
    const [balanceNumber, setBalanceNumber] = useState("")

    async function connectToMetaMask() {
        if (window.ethereum) {
            const web3 = new Web3(window.ethereum);
            try {
                window.ethereum.enable().then(async function () {
                    await getInfoAccount()
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

    async function getInfoAccount() {
        const web3 = new Web3(Web3.givenProvider || 'http://localhost:3000')
        const accounts = await web3.eth.getAccounts()
        if (accounts.length > 0){
            setAccount(accounts[0])
            const chain = await web3.eth.getChainId()
            setChain(chain.toString())
            const balance = (await web3.eth.getBalance(accounts[0]))
            setBalanceNumber(balance)
        }
    }

    async function getInfoContract(addressContract, addressWallet, jsonApi) {
        const web3 = new Web3(Web3.givenProvider)
        const daiToken = new web3.eth.Contract(jsonApi, addressContract);
        daiToken.methods.balanceOf(addressWallet).call(function (err, res) {
            if (err) {
                console.log("An error occured", err)
                return
            }
            console.log("The balance is: ", res)
        })

    }


    useEffect(async () => {
        await getInfoAccount();
        if (account !== ""){
            await getInfoContract("0x0957C89Bfa6A9F6737dACFB27389A1cCC22514e9", account, jsonFtx);
            await getInfoContract("0x337610d27c682e347c9cd60bd4b3b107c9d34ddd", account, jsonFtx)
        }
    })

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
