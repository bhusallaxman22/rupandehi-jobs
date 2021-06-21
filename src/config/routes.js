import Main from "../Components/Main"
import Login from "../Components/Login";
import SignUp from "../Components/SignUp";

const routes = [
    {
        path: '/login',
        component: Login
    },
    {
        path: '/signup',
        component: SignUp
    },
    {
        path: '/',
        component: Main
    },

]

export default routes