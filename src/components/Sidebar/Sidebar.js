import React, {useState} from "react";
import {NavLink as NavLinkRRD, Link} from "react-router-dom";
import {PropTypes} from "prop-types";
import {
    Collapse,
    UncontrolledDropdown,
    DropdownToggle,
    NavbarBrand,
    Navbar,
    NavItem,
    NavLink,
    Nav,
    Container,
    Row,
    Col, Button, ModalHeader, ModalBody, Modal
} from "reactstrap";
import Web3 from "web3";
import DataContext from "../../context";
import Login from "../../share/auth/index";

const Sidebar = (props) => {
    const [collapseOpen, setCollapseOpen] = useState();
    const toggleCollapse = () => {
        setCollapseOpen((data) => !data);
    };
    const closeCollapse = () => {
        setCollapseOpen(false);
    };

    const [modal, setModal] = useState(false);
    const toggle2 = () => setModal(!modal);

    const createLinks = (routes) => {
        return routes.map((prop, key) => {
            return (
                <NavItem key={key}>
                    <NavLink
                        to={prop.layout + prop.path}
                        tag={NavLinkRRD}
                        onClick={closeCollapse}
                        activeClassName="active"
                    >
                        {
                            prop.name === "Dashboard" ?
                                <img
                                    className="navbar-brand-img"
                                    src={require("../../assets/img/icons/img/menu/new/5.png").default}
                                    style={{width: 25, height: 25}}
                                /> : prop.name === "Public Sale" ?
                                <img
                                    className="navbar-brand-img"
                                    src={require("../../assets/img/icons/img/menu/new/6.png").default}
                                    style={{width: 25, height: 25}}
                                /> : prop.name === "My Profile" ?
                                <img
                                    className="navbar-brand-img"
                                    src={require("../../assets/img/icons/img/menu/new/4.png").default}
                                    style={{width: 25, height: 25}}
                                /> : prop.name === "Stake" ?
                                <img
                                    className="navbar-brand-img"
                                    src={require("../../assets/img/icons/img/menu/new/3.png").default}
                                    style={{width: 25, height: 25}}
                                /> : prop.name === "Share token bonus" ?
                                <img
                                    className="navbar-brand-img"
                                    src={require("../../assets/img/icons/img/menu/Asset 6.png").default}
                                    style={{width: 25, height: 25}}
                                /> : ""
                        }
                        <h4 style={{paddingLeft: 20, paddingTop: 6}}>
                            {" " + prop.name}
                        </h4>
                    </NavLink>
                </NavItem>
            );
        });
    };

    const {routes, logo} = props;
    let navbarBrandProps;
    if (logo && logo.innerLink) {
        navbarBrandProps = {
            to: logo.innerLink,
            tag: Link,
        };
    } else if (logo && logo.outterLink) {
        navbarBrandProps = {
            href: logo.outterLink,
            target: "_blank",
        };
    }

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);

    async function connectToMetaMask(data, addressSponsor) {
        if (window.ethereum) {
            const web3 = new Web3(window.ethereum);
            try {
                window.ethereum.enable().then(async function () {
                    const web3 = new Web3(Web3.givenProvider);
                    const accounts = await web3.eth.getAccounts();
                    let dataJson = JSON.parse(await Login.addAccount(accounts[0].toLowerCase(), 1))
                    data.UpdateInfoUser(dataJson.user.linkRef, dataJson.user.statusVerify,
                        dataJson.user.email, dataJson.user.id, dataJson.user.totalSales, dataJson.listChild, dataJson.user.totalSalesBranch);
                    await data.updateData();
                });
            } catch (e) {

            }
        } else if (window.web3) {
            const web3 = new Web3(window.web3.currentProvider);
        } else {
            setModal(true)
        }
    }

    return (
        <DataContext.Consumer>
            {data => (
                <Navbar
                    className="navbar-vertical fixed-left navbar-light bg-white"
                    expand="md"
                    id="sidenav-main"
                >
                    <Container fluid>
                        <button
                            className="navbar-toggler mt-4"
                            type="button"
                            onClick={toggleCollapse}

                        >
                            <span className="navbar-toggler-icon"/>
                        </button>
                        {logo ? (
                            <NavbarBrand className="pt-0" {...navbarBrandProps}>
                                <img
                                    alt={logo.imgAlt}
                                    className="navbar-brand-img mt-4"
                                    src={logo.imgSrc}
                                />
                            </NavbarBrand>
                        ) : null}
                        <Nav className="align-items-center d-md-none mt-4 pr-3">
                            <UncontrolledDropdown nav>
                                <DropdownToggle className="pr-0" nav>
                                    <Button
                                        color="white"
                                        onClick={ async () => {
                                            await connectToMetaMask(data, data.addressSponsor)
                                        }}
                                        size="sm"
                                        style={{
                                            background: "linear-gradient(87deg, #11cdef 0, #1171ef 100%)",
                                            borderColor: "#11cdef", color: "white", borderRadius: 10
                                        }}
                                    >
                                        Connect
                                    </Button>
                                </DropdownToggle>
                            </UncontrolledDropdown>
                        </Nav>
                        <Collapse navbar isOpen={collapseOpen} style={{height: "100%"}}>
                            {/* Collapse header */}
                            <div className="navbar-collapse-header d-md-none">
                                <Row>
                                    <Col className="collapse-brand" xs="6">

                                    </Col>
                                    <Col className="collapse-close" xs="6">
                                        <button
                                            className="navbar-toggler"
                                            type="button"
                                            onClick={toggleCollapse}
                                        >
                                            <span/>
                                            <span/>
                                        </button>
                                    </Col>
                                </Row>
                            </div>
                            <Nav navbar style={{marginTop: -24}}>
                                {createLinks(routes)}
                                <NavLink href="https://docs.ftxfund.com/" style={{color: "#11cdef"}}>
                                    <img
                                        className="navbar-brand-img"
                                        src={require("../../assets/img/icons/img/menu/new/2.png").default}
                                        style={{width: 25, height: 25}}
                                    />
                                    <h4 style={{paddingLeft: 20, paddingTop: 6}}>
                                        Docs
                                    </h4>
                                </NavLink>
                            </Nav>

                            <Nav className="mb-md-3" navbar>
                                <NavItem className="active-pro active">
                                    <NavLink href="https://medium.com/FTXfund" style={{color: "#11cdef"}}>
                                        <i className="fab fa-medium"/>
                                        <h4>
                                            Medium
                                        </h4>
                                    </NavLink>
                                    <NavLink href="https://linkedin.com/company/ftx-fund/"
                                             style={{color: "#11cdef"}}>
                                        <i className="fab fa-linkedin-in"/>
                                        <h4 >
                                            Linkedin
                                        </h4>
                                    </NavLink>
                                    <NavLink href="https://t.me/FTXFundGlobal" style={{color: "#11cdef"}}>
                                        <i className="fab fa-telegram"/>
                                        <h4 >
                                            Telegram
                                        </h4>
                                    </NavLink>
                                    <NavLink href="https://www.facebook.com/FTXFund" style={{color: "#11cdef"}}>
                                        <i className="fab fa-facebook"/>
                                        <h4 >
                                            Facebook
                                        </h4>
                                    </NavLink>
                                    <NavLink href="https://twitter.com/FTXfundofficial"
                                             style={{color: "#11cdef"}}>
                                        <i className="fab fa-twitter-square"/>
                                        <h4 >
                                            Twitter
                                        </h4>
                                    </NavLink>
                                    <NavLink href="https://www.youtube.com/channel/UCfI7bFtIrFfE-NeS7y57OJw"
                                             style={{color: "#11cdef"}}>
                                        <i className="fab fa-youtube"/>

                                        <h4>
                                            Youtube
                                        </h4>
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Container>
                    <Modal isOpen={modal} toggle={toggle2}>
                        <ModalHeader toggle={toggle2} className="text-center">
                            Connect to wallet
                        </ModalHeader>
                        <ModalBody style={{backgroundColor:"whitesmoke"}}>
                            <Row>
                                <Col xs={1}/>
                                <Col xs={10}>
                                    <div style={{backgroundColor: "white", borderRadius: 50, height: 50}}  className="mt-3">
                                        <NavLink href="https://metamask.app.link/dapp/app.ftxfund.com">
                                            <Row className="text-center" style={{paddingTop: 7}}>
                                                <Col xs={4}>
                                                    <img src="https://registry.walletconnect.org/logo/lg/c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96.jpeg"
                                                         alt="" style={{width: 30, height: 30}}/>

                                                </Col>
                                                <Col  className="text-left" xs={6}>
                                                    <h4>Meta Mask</h4>
                                                </Col>
                                            </Row>
                                        </NavLink>
                                    </div>
                                    <div style={{backgroundColor: "white", borderRadius: 50, height: 50}} className="mt-3">
                                        <NavLink href="https://link.trustwallet.com/wc?uri=wc%3A1c18afff-be2b-45db-bf02-3964c7275501%401%3Fbridge%3Dhttps%253A%252F%252Fapp.ftxfund.com%26key%3De9da54acfb075706a8d4f614383cefc9cfba4ba7580132972894b3f678df8140">
                                            <Row className="text-center" style={{paddingTop: 7}}>
                                                <Col xs={4}>
                                                    <img src="https://registry.walletconnect.org/logo/lg/4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0.jpeg"
                                                         alt="" style={{width: 30, height: 30}}/>

                                                </Col>
                                                <Col  className="text-left" xs={6}>
                                                    <h4>Trust Wallet</h4>
                                                </Col>
                                            </Row>
                                        </NavLink>
                                    </div>
                                    <div style={{backgroundColor: "white", borderRadius: 50, height: 50}}  className="mt-3">
                                        <NavLink href="imtokenv2://navigate/DappView?url=https://app.ftxfund.com">
                                            <Row className="text-center" style={{paddingTop: 7}}>
                                                <Col xs={4}>
                                                    <img src="https://registry.walletconnect.org/logo/lg/9d373b43ad4d2cf190fb1a774ec964a1addf406d6fd24af94ab7596e58c291b2.jpeg"
                                                         alt="" style={{width: 30, height: 30}}/>
                                                </Col>
                                                <Col  className="text-left" xs={6}>
                                                    <h4>Im Token</h4>
                                                </Col>
                                            </Row>
                                        </NavLink>
                                    </div>
                                    <div style={{backgroundColor: "white", borderRadius: 50, height: 50}}  className="mt-3">
                                        <NavLink href="https://rnbwapp.com/wc?uri=wc%3Abc19fb70-66ee-4985-9a00-b73d030db3dd%401%3Fbridge%3Dhttps%253A%252F%252Fapp.ftxfund.com%26key%3D968c7cb90a6d9ff0444d01329fc5923b9616159c70fc0518508f08190a35b47a">
                                            <Row className="text-center" style={{paddingTop: 7}}>
                                                <Col xs={4}>
                                                    <img src="https://registry.walletconnect.org/logo/lg/1ae92b26df02f0abca6304df07debccd18262fdf5fe82daa81593582dac9a369.jpeg"
                                                         alt="" style={{width: 30, height: 30}}/>

                                                </Col>
                                                <Col  className="text-left" xs={6}>
                                                    <h4>Rainbown</h4>
                                                </Col>
                                            </Row>
                                        </NavLink>
                                    </div>
                                    <div style={{backgroundColor: "white", borderRadius: 50, height: 50}}  className="mt-3">
                                        <NavLink href="https://argent.link/app/wc?uri=wc%3Abc19fb70-66ee-4985-9a00-b73d030db3dd%401%3Fbridge%3Dhttps%253A%252F%252Fapp.ftxfund.com%26key%3D968c7cb90a6d9ff0444d01329fc5923b9616159c70fc0518508f08190a35b47a">
                                            <Row className="text-center" style={{paddingTop: 7}}>
                                                <Col xs={4}>
                                                    <img src="https://registry.walletconnect.org/logo/lg/cf21952a9bc8108bf13b12c92443751e2cc388d27008be4201b92bbc6d83dd46.jpeg"
                                                         alt="" style={{width: 30, height: 30}}/>

                                                </Col>
                                                <Col  className="text-left" xs={6}>
                                                    <h4>Agent</h4>
                                                </Col>
                                            </Row>
                                        </NavLink>
                                    </div>
                                    <div style={{backgroundColor: "white", borderRadius: 50, height: 50}}  className="mt-3">
                                        <NavLink href="https://www.mathwallet.org/wc?uri=wc%3Abc19fb70-66ee-4985-9a00-b73d030db3dd%401%3Fbridge%3Dhttps%253A%252F%252Fapp.ftxfund.com%26key%3D968c7cb90a6d9ff0444d01329fc5923b9616159c70fc0518508f08190a35b47a">
                                            <Row className="text-center" style={{paddingTop: 7}}>
                                                <Col xs={4}>
                                                    <img src="https://registry.walletconnect.org/logo/lg/7674bb4e353bf52886768a3ddc2a4562ce2f4191c80831291218ebd90f5f5e26.jpeg"
                                                         alt="" style={{width: 30, height: 30}}/>

                                                </Col>
                                                <Col  className="text-left" xs={6}>
                                                    <h4>Math Wallet</h4>
                                                </Col>
                                            </Row>
                                        </NavLink>
                                    </div>
                                </Col>
                                <Col xs={1}/>
                            </Row>
                        </ModalBody>
                    </Modal>
                </Navbar>
            )}
        </DataContext.Consumer>
    );
};

Sidebar.defaultProps = {
    routes: [{}],
};

Sidebar.propTypes = {
    // links that will be displayed inside the component
    routes: PropTypes.arrayOf(PropTypes.object),
    logo: PropTypes.shape({
        // innerLink is for links that will direct the user within the app
        // it will be rendered as <Link to="...">...</Link> tag
        innerLink: PropTypes.string,
        // outterLink is for links that will direct the user outside the app
        // it will be rendered as simple <a href="...">...</a> tag
        outterLink: PropTypes.string,
        // the image src of the logo
        imgSrc: PropTypes.string.isRequired,
        // the alt for the img
        imgAlt: PropTypes.string.isRequired,
    }),
};

export default Sidebar;
