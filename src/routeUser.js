import Index from "./views/Index.js";
import Profile from "./views/examples/Profile.js";
import BuyToken from "./views/examples/BuyToken.js";
import Stake from "./views/examples/Stake";
var routesUser = [
    {
        path: "/dashboard",
        name: "Dashboard",
        icon: "fas fa-home text-blue",
        component: Index,
        layout: "/user",
    },
    {
        path: "/buy_public_sale",
        name: "Buy public sale",
        icon: "fas fa-cart-arrow-down text-blue",
        component: BuyToken,
        layout: "/user",
    },
    {
        path: "/user_profile",
        name: "Profile",
        icon: "ni ni-single-02 text-blue",
        component: Profile,
        layout: "/user",
    },
    {
        path: "/stake",
        name: "Stake",
        icon: "fas fa-piggy-bank text-blue",
        component: Stake,
        layout: "/user",
    },
];
export default routesUser;
