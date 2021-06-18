import React, {useState, useEffect} from "react";
import {useLocation, Route, Switch, Redirect} from "react-router-dom";
import {
    Container,
} from "reactstrap";
import AdminNavbar from "./../components/Navbars/AdminNavbar.js";
import AdminFooter from "./../components/Footers/AdminFooter.js";
import Sidebar from "./../components/Sidebar/Sidebar.js";
import routes from "./../routes.js";
import routesUser from "../routeUser";
import DataContext from "../context";
import Web3 from "web3";
import jsonFtx from "../json/contract/readContract.json";
import Address from "../json/addressContract/address.json"
import Login from "../share/auth/auth";
import fdJson from "../json/founder/contract.json";
import { BigNumber } from "@ethersproject/bignumber";
var bigdecimal = require("bigdecimal");



const Admin = (props) => {
    const two = new bigdecimal.BigDecimal('1000000000000000000');

    const divBigNumberBNB = BigNumber.from(10).pow(18)
    const mainContent = React.useRef(null);
    const location = useLocation();
    const [account, setAccount] = useState("")
    const [chainId, setChain] = useState("")


    const [balanceBNB, setBalanceBNB] = useState(0)
    const [balanceFTXF, setBalanceFTXF] = useState(0)
    const [balanceUSDT, setBalanceUSDT] = useState(0)
    const [balanceFTXFS, setBalanceFTXFS] = useState(0)
    const [lookedFullAmount, setLookedFullAmount] = useState(0);
    const [amountUnLook, setAmountUnLook] = useState(0);

    const [addressSponsor, setAddressSponsor] = useState(1)

    const [userVerifyStatus, setUserVerifyStatus] = useState("")
    const [userLinkRef, setUserLinkRef] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [userId, setUserId] = useState(0)
    const [totalSales, setTotalSales] = useState(0)
    const [totalSalesBranch, setTotalSalesBranch] = useState(0)
    const [referral, setReferral] = useState([])
    const [directSale, setDirectSale] = useState(0)
    const [totalReferral, setTotalReferral] = useState(0)


    const [reload, setReload] = useState(false)

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

    async function UpdateInfoUser(linkRef, verifyStatus, UserEmail, userId, totalSale, listReferral, totalSalesBranch){
        setUserVerifyStatus(verifyStatus);
        setUserEmail(UserEmail);
        setReferral(listReferral);
        if (totalSale === "" || totalSale === undefined){
            setTotalSales(0);
        }else {
            setTotalSales(totalSale);
        }
        if (linkRef === "" || linkRef === undefined){
            setUserLinkRef(setLinkRefUser(userId))
        }else {
            setUserLinkRef(linkRef);
        }
        if (totalSalesBranch === "" || totalSalesBranch === undefined){
            setTotalSalesBranch(0)
        }else {
            setTotalSalesBranch(totalSalesBranch)
        }
        if (listReferral.length > 0){
            let directSale = 0
            for (let i = 0; i < listReferral.length; i++) {
                directSale += Number(listReferral[i].totalInvest);
            }
            setDirectSale(directSale)
        }
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
            setReload(false)
            setAccount(accounts[0])
            const chain = await web3.eth.getChainId()
            setChain(chain.toString())
            const balance = (await web3.eth.getBalance(accounts[0]))
            let one = new bigdecimal.BigDecimal(balance);
            let numberFix = Number(one.divide(two).toString()).toFixed(4);
            setBalanceBNB(numberFix);
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
            let one = new bigdecimal.BigDecimal(res);
            if (contract === "FTXF"){
                setBalanceFTXF(Number(one.divide(two).toString()).toFixed(4));
            }else if (contract === "USDT"){
                setBalanceUSDT(Number(one.divide(two).toString()).toFixed(4));
            }else if (contract === "FTXShare"){
                setBalanceFTXFS(Number(one.divide(two).toString()).toFixed(4));
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
            setBalanceBNB(BigNumber.from(balance).div(divBigNumberBNB).toString());
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

    function setLinkRefUser(userId){
        let sh = window.location.href;
        let n = sh.indexOf("?");
        let sponsorHref = ""
        if (n !== -1){
            let idSponsor =  sh.slice(n,  sh.length);
            let baseurl =  sh.replace(idSponsor, "");
            sponsorHref = baseurl + "?ref=" + userId;
        }else {
            sponsorHref = window.location.href + "?ref=" + userId;
        }
        return sponsorHref;
    }

    async function getAmountLookedFullAmount(){
        const web3 = new Web3(Web3.givenProvider);
        const account = await web3.eth.getAccounts();
        if (account.length > 0){
            const data = new web3.eth.Contract(fdJson, Address.FounderAddress);
            data.methods.getLockedFullAmount(account[0]).call(function (err, res){
                if (err){
                    console.log("get full amount looked fail", err);
                    return;
                }
                let one = new bigdecimal.BigDecimal(res);
                setLookedFullAmount(Number(one.divide(two).toString()).toFixed(4));
            })
        }
    }

    async function getAmountUnLockAmount() {
        const web3 = new Web3(Web3.givenProvider);
        const account = await web3.eth.getAccounts();
        if (account.length > 0){
            const data = new web3.eth.Contract(fdJson, Address.FounderAddress);
            data.methods.getAvailableAmount(account[0]).call(function (err, res){
                if (err){
                    console.log("get full amount looked fail", err);
                    return;
                }
                let one = new bigdecimal.BigDecimal(res);
                setAmountUnLook(Number(one.divide(two).toString()).toFixed(4));
            })
        }
    }

    async function getAllChildren(id){
        let dataJson = JSON.parse(await Login.getTotalCase(id))
        setTotalReferral(dataJson.countChildren)
    }

    useEffect(async () => {
        setLinkRefUser();
        getAddressSponsor();
        await getInfoAccount();
        await getAmountLookedFullAmount()
        await getAmountUnLockAmount()
        if (account !== ""){
            await getInfoContract(Address.FTXFTokenAddress, account, jsonFtx, "FTXF");
            await getInfoContract(Address.FTXFEshareAddress, account, jsonFtx, "FTXShare");
            await getInfoContract(Address.USDTAddess, account, jsonFtx, "USDT");
            let dataJson = JSON.parse(await Login.addAccount(account.toLowerCase(), addressSponsor.toLowerCase()))
            await UpdateInfoUser(dataJson.user.linkRef, dataJson.user.statusVerify,
                dataJson.user.email, dataJson.user.id, dataJson.user.totalSales, dataJson.listChild, dataJson.user.totalSalesBranch);
            await getAllChildren(dataJson.user.id);
        }
    }, [account, userVerifyStatus])


    return (
        <>
            {
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
                        lookedFullAmount: lookedFullAmount,
                        amountUnLook: amountUnLook,
                        totalSalesBranch: totalSalesBranch,
                        directSale: directSale,
                        totalReferral: totalReferral

                    }}>
                        {
                            account === Address.AdminAddress ?
                                <Sidebar
                                    {...props}
                                    routes={routes}
                                    logo={{
                                        innerLink: "/admin/index",
                                        imgSrc: require("../assets/img/icons/img/Asset 1.png").default,
                                        imgAlt: "...",
                                    }}
                                /> :
                                <Sidebar
                                    {...props}
                                    routes={routesUser}
                                    logo={{
                                        innerLink: "/user/index",
                                        imgSrc: require("../assets/img/icons/img/Asset 1.png").default,
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
            }
        </>
    );
}
export default Admin;
