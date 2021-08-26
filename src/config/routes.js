import Main from "../Components/Main"
import Login from "../Components/Login";
import JobDescription from "../Components/JobDescription";
import SignUp from "../Components/SignUp";
import a404 from "../Components/a404";
import Jobs from "../Components/Jobs";
import GetInfo from "../Components/GetInfo"
import EditInfo from "../Components/EditInfo"
import Profile from "../Components/Profile";
import JobList from "../Components/JobList";
import AddJob from "../Components/AddJob";
import ApplicantList from "../Components/ApplicantList";
import MyApplications from "../Components/MyApplications";
// import ApplicantProfile from "../Components/ApplicantProfile"


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
        path: '/jobs/:id',
        component: JobDescription
    },
    {
        path:"/jobs/",
        component: Jobs
    },
    {
        path: '/get-info',
        component: GetInfo
    },
    {
        path: '/edit-info',
        component: EditInfo
    },
    {
        path: '/profile',
        component: Profile
    },
       {
        path: '/job-list',
        component: JobList
    },
    {
        path: '/appls/:id',
        component: ApplicantList
    },
    {
        path: '/add-job',
        component: AddJob
    },
    {
        path: '/my-apps',
        component: MyApplications
    },
    {
        path: '/',
        component: Main
    },

    {
        path: '/**',
        component: a404
    },



]

export default routes