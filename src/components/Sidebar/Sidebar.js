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
    Col, Button,
} from "reactstrap";
import Web3 from "web3";
import DataContext from "../../context";
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
                        <i className={prop.icon}/>
                        {prop.name}
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

    async function connectToMetaMask(data) {
        if (window.ethereum) {
            const web3 = new Web3(window.ethereum);
            try {
                window.ethereum.enable().then(async function () {
                    // const web3 = new Web3(Web3.givenProvider);
                    // const accounts = await web3.eth.getAccounts();
                    // await Login.addAccount(accounts[0], getAddressSponsor());
                    await data.updateData();
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
        <DataContext.Consumer>
            {data => (
                <Navbar
                    className="navbar-vertical fixed-left navbar-light bg-white"
                    expand="md"
                    id="sidenav-main"
                >
                    <Container fluid>
                        <button
                            className="navbar-toggler"
                            type="button"
                            onClick={toggleCollapse}
                        >
                            <span className="navbar-toggler-icon"/>
                        </button>
                        {logo ? (
                            <NavbarBrand className="pt-0" {...navbarBrandProps}>
                                <img
                                    alt={logo.imgAlt}
                                    className="navbar-brand-img"
                                    src={logo.imgSrc}
                                />
                            </NavbarBrand>
                        ) : null}
                        <Nav className="align-items-center d-md-none">
                            <UncontrolledDropdown nav>
                                <DropdownToggle className="pr-0" nav>
                                    <Button
                                        color="white"
                                        onClick={async () => {
                                            await connectToMetaMask(data);
                                        }}
                                        size="sm"
                                    >
                                        Connect
                                    </Button>
                                </DropdownToggle>
                            </UncontrolledDropdown>
                        </Nav>
                        {/* Collapse */}
                        <Collapse navbar isOpen={collapseOpen}>
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
                            <Nav navbar>{createLinks(routes)}</Nav>
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
