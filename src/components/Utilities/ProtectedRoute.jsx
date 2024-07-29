import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ()=> {
    let userInfoString = localStorage.getItem("user");
    let userInfo = JSON.parse(userInfoString);
    if(!userInfo){
        return <Navigate to={'/RegisterPageV1'}/>
    }
    return <Outlet/>
}