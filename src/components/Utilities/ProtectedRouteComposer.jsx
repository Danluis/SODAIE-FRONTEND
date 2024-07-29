import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRouteComposer = ()=> {
    let userInfoString = localStorage.getItem("user");
    let userInfo = JSON.parse(userInfoString);
    if(userInfo.roles !== 'composer'){
        return <Navigate to={'/'}/>
    }
    return <Outlet/>
}