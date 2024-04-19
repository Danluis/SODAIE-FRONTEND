import { Route, Routes } from "react-router-dom";
import Login from "../pages/Auth/Login";
import HomePage from "../pages/Home/HomePage";
import SearchPage from "../pages/Home/SearchPage";
const RoutesApp = () => {
  return (
    <Routes>
        <Route element={<Login/>}></Route>
        <Route index path="/" element={<HomePage/>} />
        <Route path="/search" element={<SearchPage/>} />
        <Route path="/login" element={<Login /> }/>

    </Routes>
  );
};

export default RoutesApp;
