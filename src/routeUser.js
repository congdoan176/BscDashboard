import Index from "./views/Index.js";
import Profile from "./views/examples/Profile.js";
import BuyToken from "./views/examples/BuyToken.js";
import Stake from "./views/examples/Stake";
import Icons from "./views/examples/Icons";
var routesUser = [
    {
        path: "/dashboard",
        name: "Dashboard",
        icon: "../../assets/img/icons/img/menu/Asset 2.png",
        component: Index,
        layout: "/user",
    },
    {
        path: "/user_profile",
        name: "My Profile",
        icon: "ni ni-single-02 text-blue",
        component: Profile,
        layout: "/user",
    },
    {
        path: "/Public_Sale",
        name: "Public Sale",
        icon: "../../assets/img/icons/img/menu/Asset 4.png",
        component: BuyToken,
        layout: "/user",
    },
    {
        path: "/stake",
        name: "Stake",
        icon: "fas fa-piggy-bank text-blue",
        component: Stake,
        layout: "/user",
    },
    {
        path: "/Docs",
        name: "Docs",
        icon: "../../assets/img/icons/img/menu/Asset 4.png",
        component: Icons,
        layout: "/user",
    },
];
export default routesUser;
