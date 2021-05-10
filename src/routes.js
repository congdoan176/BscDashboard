import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import BuyToken from "views/examples/BuyToken.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Stake",
    icon: "ni ni-planet text-blue",
    component: Icons,
    layout: "/admin",
  },
  {
    path: "/maps",
    name: "Buy Token",
    icon: "ni ni-pin-3 text-orange",
    component: BuyToken,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Share",
    icon: "ni ni-bullet-list-67 text-red",
    component: Tables,
    layout: "/admin",
  },
    // {
    //   path: "/auth",
    //   name: "Login",
    //   icon: "ni ni-key-25 text-info",
    //   component: Login,
    //   layout: "/auth",
    // },
    // {
    //   path: "/register",
    //   name: "Register",
    //   icon: "ni ni-circle-08 text-pink",
    //   component: Register,
    //   layout: "/auth",
    // },
];
export default routes;
