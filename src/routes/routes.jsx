import { Route, Routes } from "react-router-dom";
import Login from "../pages/Auth/Login";
import HomePage from "../pages/Home/HomePage";
import SearchPage from "../pages/Home/SearchPage";
const RoutesApp = () => {
  return (
    <Routes>
        <Route path="/" element={<Login /> }/>
        <Route element={<Login/>}></Route>
        <Route index path="/home" element={<HomePage/>} />
        <Route path="/search" element={<SearchPage/>} />
    </Routes>
  );
};

export default RoutesApp;
