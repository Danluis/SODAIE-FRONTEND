import { Route, Routes } from "react-router-dom";
import HomePageV1 from '../pages/Home/HomePageV1'
import ExplorePageV1 from '../pages/Home/ExplorePageV1'
import LoginPageV1 from "../pages/Auth/LoginPageV1";
import RegisterPageV1 from "../pages/Auth/RegisterPageV1";
const RoutesApp = () => {
  return (
    <Routes>
        <Route index path="/" element={<HomePageV1/>} />
        <Route path="/search" element={<ExplorePageV1/>} />
        <Route path="/LoginPageV1" element={<LoginPageV1 /> }/>
        <Route path="/RegisterPageV1" element={<RegisterPageV1 /> }/>

    </Routes>
  );
};

export default RoutesApp;
