import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRouteUser = ()=> {
    let userInfoString = localStorage.getItem("user");
    let userInfo = JSON.parse(userInfoString);
    if(userInfo.roles !== 'user'){
        return <Navigate to={'/'}/>
    }
    return <Outlet/>
}