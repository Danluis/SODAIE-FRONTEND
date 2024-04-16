import { Route, Routes } from "react-router-dom";
import Login from "../pages/Auth/Login";
import HomePage from "../pages/Home/HomePage";
const RoutesApp = () => {
  return (
    <Routes>
        <Route path="/" element={<Login /> }/>
        <Route index element={<Login/>}></Route>
        <Route path="/home" element={<HomePage/>} />
    </Routes>
  );
};

export default RoutesApp;
