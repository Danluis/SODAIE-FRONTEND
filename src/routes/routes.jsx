import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/Auth/LoginPage";
import HomePage from "../pages/Home/HomePage";
import SearchPage from "../pages/Home/SearchPage";
import RegisterPage from "../pages/Auth/RegisterPage";
const RoutesApp = () => {
  return (
    <Routes>
        <Route element={<LoginPage/>}></Route>
        <Route index path="/" element={<HomePage/>} />
        <Route path="/search" element={<SearchPage/>} />
        <Route path="/register" element={<RegisterPage /> }/>
        <Route path="/login" element={<LoginPage /> }/>

    </Routes>
  );
};

export default RoutesApp;
