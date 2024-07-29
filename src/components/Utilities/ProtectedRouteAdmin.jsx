import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRouteAdmin = ()=> {
    let userInfoString = localStorage.getItem("user");
    let userInfo = JSON.parse(userInfoString);
    if(userInfo.roles !== 'admin'){
        return <Navigate to={'/'}/>
    }
    return <Outlet/>
}