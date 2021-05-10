import React, {useState, useEffect} from "react";
import {useLocation, Route, Switch, Redirect} from "react-router-dom";
import {Container} from "reactstrap";
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import routes from "routes.js";
import DataContext from "../context";
import Web3 from "web3";
import jsonFtx from "../json/ftx/contract.json";

const Admin = (props) => {
    const mainContent = React.useRef(null);
    const location = useLocation();
    const [account, setAccount] = useState("")
    const [chainId, setChain] = useState("")

    const [balanceBNB, setBalanceBNB] = useState("")
    const [balanceFTXF, setBalanceFTXF] = useState("")
    const [balanceUSDT, setBalanceUSDT] = useState("")
    const [balanceFTXFS, setBalanceFTXFS] = useState("")

    useEffect(() => {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        mainContent.current.scrollTop = 0;
    }, [location]);

    const getRoutes = (routes) => {
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
    };

    const getBrandText = (path) => {
        for (let i = 0; i < routes.length; i++) {
            if (
                props.location.pathname.indexOf(routes[i].layout + routes[i].path) !==
                -1
            ) {
                return routes[i].name;
            }
        }
        return "Brand";
    };


    async function getInfoAccount() {
        const web3 = new Web3(Web3.givenProvider || 'http://localhost:3000')
        const accounts = await web3.eth.getAccounts()
        if (accounts.length > 0){
            setAccount(accounts[0])
            const chain = await web3.eth.getChainId()
            setChain(chain.toString())
            const balance = (await web3.eth.getBalance(accounts[0]))
            setBalanceBNB(sliceBalance(balance));
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
            let numberBalance = sliceBalance(res)
            if (contract === "FTXF"){
                setBalanceFTXF(numberBalance);
            }else if (contract === "USDT"){
                setBalanceUSDT(numberBalance);
            }else if (contract === "FTXShare"){
                setBalanceFTXFS(numberBalance);
            }
        })

    }
    function sliceBalance(balance){
        let numberBalance = "";
        if (balance === "0"){
            numberBalance = balance;
        }else {
            numberBalance = balance.slice(0, balance.length - 18).concat('.').concat(balance.slice(balance.length - 18, balance.length))
            while (numberBalance.endsWith('0')) {
                numberBalance = numberBalance.slice(0, numberBalance.length - 1)
            }
            numberBalance = numberBalance.replace(".","");
        }
        return numberBalance;
    }

    useEffect(async () => {
        await getInfoAccount();
        if (account !== ""){
            await getInfoContract("0x0957C89Bfa6A9F6737dACFB27389A1cCC22514e9", account, jsonFtx, "FTXF");
            await getInfoContract("0xf11FFA5612cd127b362902e3443b974fc13EF1F9", account, jsonFtx, "FTXShare");
            await getInfoContract("0x337610d27c682e347c9cd60bd4b3b107c9d34ddd", account, jsonFtx, "USDT");
        }
    })


    return (
        <>
            <DataContext.Provider value={{
                accountAddress: account,
                accountChain: chainId,
                balanceUSDT: balanceUSDT,
                balanceBNB: balanceBNB,
                balanceFTXF: balanceFTXF,
                balanceFTXFS: balanceFTXFS
            }}>
                <Sidebar
                    {...props}
                    routes={routes}
                    logo={{
                        innerLink: "/admin/index",
                        imgSrc: require("../assets/img/brand/argon-react.png").default,
                        imgAlt: "...",
                    }}
                />
                <div className="main-content" ref={mainContent}>
                    <AdminNavbar
                        {...props}
                        brandText={getBrandText(props.location.pathname)}
                    />
                    <Switch>
                        {getRoutes(routes)}
                        <Redirect from="*" to="/admin/index"/>
                    </Switch>

                    <Container fluid>
                        <AdminFooter/>
                    </Container>
                </div>
            </DataContext.Provider>
        </>
    );
};

export default Admin;
