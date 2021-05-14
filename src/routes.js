import Index from "./views/Index.js";
import Profile from "./views/examples/Profile.js";
import BuyToken from "./views/examples/BuyToken.js";
import ShareToken from "./views/examples/ShareToken.js";
import Icons from "./views/examples/Icons.js";
import Stake from "./views/examples/Stake";
import DataContext from "./context";
var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "fas fa-home text-blue",
    component: Index,
    layout: "/admin",
  },
  {
    path: "/maps",
    name: "Buy Token",
    icon: "fas fa-cart-arrow-down text-blue",
    component: BuyToken,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "Profile",
    icon: "ni ni-single-02 text-blue",
    component: Profile,
    layout: "/admin",
  },
  {
    path: "/stake",
    name: "Stake",
    icon: "fas fa-piggy-bank text-blue",
    component: Stake,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Share",
    icon: "fas fa-share-square text-blue",
    component: ShareToken,
    layout: "/admin",
  },
];
export default routes;
