import React, {useState, useEffect} from "react";
import {useLocation, Route, Switch, Redirect} from "react-router-dom";
import {Container} from "reactstrap";
import AdminNavbar from "./../components/Navbars/AdminNavbar.js";
import AdminFooter from "./../components/Footers/AdminFooter.js";
import Sidebar from "./../components/Sidebar/Sidebar.js";
import routes from "./../routes.js";
import routesUser from "../routeUser";
import DataContext from "../context";
import Web3 from "web3";
import jsonFtx from "../json/contract/readContract.json";
import Address from "../json/addressContract/address.json"
import Login from "../share/auth/index";

const Admin = (props) => {
    const mainContent = React.useRef(null);
    const location = useLocation();
    const [account, setAccount] = useState("")
    const [chainId, setChain] = useState("")

    const [balanceBNB, setBalanceBNB] = useState(0)
    const [balanceFTXF, setBalanceFTXF] = useState(0)
    const [balanceUSDT, setBalanceUSDT] = useState(0)
    const [balanceFTXFS, setBalanceFTXFS] = useState(0)
    const [addressSponsor, setAddressSponsor] = useState("")

    const [userVerifyStatus, setUserVerifyStatus] = useState("")
    const [userLinkRef, setUserLinkRef] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [userId, setUserId] = useState(0)
    const [totalSales, setTotalSales] = useState(0)
    const [referral, setReferral] = useState([])

    useEffect( () => {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        mainContent.current.scrollTop = 0;
    }, [location]);

    const getRoutes = (routes) => {
        if (account === Address.AdminAddress){
            return routes.map((prop, key) => {
                if (prop.layout === "/admin") {
                    return (
                        <Route
                            path={prop.layout + prop.path}
                            component={prop.component}
                            key={key}
                        />
                    );
                } else {
                    return null;
                }
            });
        }else {
            return routes.map((prop, key) => {
                if (prop.layout === "/user") {
                    return (
                        <Route
                            path={prop.layout + prop.path}
                            component={prop.component}
                            key={key}
                        />
                    );
                } else {
                    return null;
                }
            });
        }
    };

    function UpdateInfoUser(linkRef, verifyStatus, UserEmail, userId, totalSale, listReferral){
        if (linkRef === "" || linkRef === undefined){
            setUserLinkRef(setLinkRefUser())
        }else {
            setUserLinkRef(linkRef);
        }
        setUserVerifyStatus(verifyStatus);
        setUserEmail(UserEmail);
        setUserId(userId);
        setTotalSales(totalSale);
        setReferral(listReferral);
    }

    const getBrandText = (path) => {
        for (let i = 0; i < routes.length; i++) {
            if (
                props.location.pathname.indexOf(routes[i].path) !==
                -1
            ) {
                return routes[i].name;
            }
        }
        return "Brand";
    };

    async function getInfoAccount() {
        const web3 = new Web3(Web3.givenProvider)
        const accounts = await web3.eth.getAccounts()
        if (accounts.length > 0){
            setAccount(accounts[0])
            const chain = await web3.eth.getChainId()
            setChain(chain.toString())
            const balance = (await web3.eth.getBalance(accounts[0]))
            let numberBalance = balance / 1000000000000000000;
            setBalanceBNB(numberBalance.toFixed(4));
        }
    }

    async function getInfoContract(addressContract, addressWallet, jsonApi, contract) {
        const web3 = new Web3(Web3.givenProvider);
        const daiToken = new web3.eth.Contract(jsonApi, addressContract);
        daiToken.methods.balanceOf(addressWallet).call(function (err, res) {
            if (err) {
                console.log("An error occured", err)
                return
            }
            let numberBalance = res / 1000000000000000000
            if (contract === "FTXF"){
                setBalanceFTXF(numberBalance.toFixed(4));
            }else if (contract === "USDT"){
                setBalanceUSDT(numberBalance.toFixed(4));
            }else if (contract === "FTXShare"){
                setBalanceFTXFS(numberBalance.toFixed(4));
            }
        })
    }

    async function updateData(){
        const web3 = new Web3(Web3.givenProvider)
        const accounts = await web3.eth.getAccounts()
        if (accounts.length > 0){
            setAccount(accounts[0])
            const chain = await web3.eth.getChainId()
            setChain(chain.toString())
            const balance = (await web3.eth.getBalance(accounts[0]))
            setBalanceBNB((balance/1000000000000000000).toFixed(4));
            await getInfoContract(Address.FTXFTokenAddress, accounts[0], jsonFtx, "FTXF");
            await getInfoContract(Address.FTXFEshareAddress, accounts[0], jsonFtx, "FTXShare");
            await getInfoContract(Address.USDTAddess, accounts[0], jsonFtx, "USDT");
        }
    }

    function getAddressSponsor(){
        let sponsorHref = window.location.href;
        let addressSponsor = "";
        let n = sponsorHref.search("ref");
        if (n !== -1){
            addressSponsor = sponsorHref.slice(n, sponsorHref.length);
            addressSponsor = addressSponsor.slice(4, addressSponsor.length);
        }
        setAddressSponsor(addressSponsor);
    }

    function setLinkRefUser(){
        let sponsorHref = window.location.href + "?ref=" + account;
        return sponsorHref;
    }

    useEffect(async () => {
        getAddressSponsor();
        await getInfoAccount();
        if (account !== ""){
            await getInfoContract(Address.FTXFTokenAddress, account, jsonFtx, "FTXF");
            await getInfoContract(Address.FTXFEshareAddress, account, jsonFtx, "FTXShare");
            await getInfoContract(Address.USDTAddess, account, jsonFtx, "USDT");
            let dataJson = JSON.parse(await Login.addAccount(account, addressSponsor))
            UpdateInfoUser(dataJson.user.linkRef, dataJson.user.statusVerify,
                dataJson.user.email, dataJson.user.id, dataJson.user.totalSales, dataJson.listChild);
        }
    },[account])


    return (
        <>
            <DataContext.Provider value={{
                accountAddress: account,
                accountChain: chainId,
                balanceUSDT: balanceUSDT,
                balanceBNB: balanceBNB,
                balanceFTXF: balanceFTXF,
                balanceFTXFS: balanceFTXFS,
                addressSponsor: addressSponsor,
                userVerifyStatus: userVerifyStatus,
                userEmail: userEmail,
                userLinkRef: userLinkRef,
                userId: userId,
                totalSales: totalSales,
                referral: referral,
                updateData: updateData,
                UpdateInfoUser: UpdateInfoUser,

            }}>
                {
                    account === Address.AdminAddress ?
                        <Sidebar
                            {...props}
                            routes={routes}
                            logo={{
                                innerLink: "/admin/index",
                                imgSrc: require("../assets/img/icons/ftxf-dapps.png").default,
                                imgAlt: "...",
                            }}
                        /> :
                        <Sidebar
                            {...props}
                            routes={routesUser}
                            logo={{
                                innerLink: "/user/index",
                                imgSrc: require("../assets/img/icons/ftxf-dapps.png").default,
                                imgAlt: "...",
                            }}
                        />
                }
                <div className="main-content" ref={mainContent}>
                    <AdminNavbar
                        {...props}
                        brandText={getBrandText(props.location.pathname)}
                    />
                    <Switch>
                        {
                            account === Address.AdminAddress ? getRoutes(routes) : getRoutes(routesUser)
                        }
                        {
                            account === Address.AdminAddress ?
                            <Redirect from="*" to="/admin/dashboard"/>:
                            <Redirect from="*" to="/user/dashboard"/>
                        }
                    </Switch>

                    <Container fluid>
                        <AdminFooter/>
                    </Container>
                </div>
            </DataContext.Provider>
        </>
    );
}
export default Admin;
