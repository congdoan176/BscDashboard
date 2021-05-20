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
    Col, Button, Dropdown, DropdownItem, DropdownMenu
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
                                    src={require("../../assets/img/icons/img/menu/Asset 2.png").default}
                                    style={{width: 23, height: 23}}
                                /> : prop.name === "Public Sale" ?
                                <img
                                    className="navbar-brand-img"
                                    src={require("../../assets/img/icons/img/menu/Asset 4.png").default}
                                    style={{width: 23, height: 23}}
                                /> : prop.name === "My Profile" ?
                                    <img
                                        className="navbar-brand-img"
                                        src={require("../../assets/img/icons/img/menu/Asset 5.png").default}
                                        style={{width: 23, height: 23}}
                                    /> : prop.name === "Stake" ?
                                        <img
                                            className="navbar-brand-img"
                                            src={require("../../assets/img/icons/img/menu/Asset 7.png").default}
                                            style={{width: 23, height: 23}}
                                        /> : prop.name === "Share token bonus" ?
                                            <img
                                                className="navbar-brand-img"
                                                src={require("../../assets/img/icons/img/menu/Asset 6.png").default}
                                                style={{width: 23, height: 23}}
                                            /> : prop.name === "Docs" ?
                                                <img
                                                    className="navbar-brand-img"
                                                    src={require("../../assets/img/icons/img/menu/Asset 8.png").default}
                                                    style={{width: 23, height: 23}}
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

    async function connectToMetaMask(data) {
        if (window.ethereum) {
            const web3 = new Web3(window.ethereum);
            try {
                window.ethereum.enable().then(async function () {
                    const web3 = new Web3(Web3.givenProvider);
                    const accounts = await web3.eth.getAccounts();
                    let dataJson = JSON.parse(await Login.addAccount(accounts[0], data.addressSponsor))
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
                        <Nav className="align-items-center d-md-none mt-4 pr-4">
                            <UncontrolledDropdown nav>
                                <DropdownToggle className="pr-0" nav>
                                    <Button
                                        color="white"
                                        onClick={async () => {
                                            await connectToMetaMask(data);
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
