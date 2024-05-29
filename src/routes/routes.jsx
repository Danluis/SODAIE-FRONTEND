import { Route, Routes } from "react-router-dom";
import HomePageV1 from '../pages/Home/HomePageV1'
import ExplorePageV1 from '../pages/Home/ExplorePageV1'
import LoginPageV1 from "../pages/Auth/LoginPageV1";
import RegisterPageV1 from "../pages/Auth/RegisterPageV1";
import ChooseRegister from "../pages/Auth/ChooseRegister";
import FormGeneralInfo from "../pages/Form/FormGeneralInfo";
import FormPersonalInfo from "../pages/Form/FormPersonalInfo";
import FormFirstSong from "../pages/Form/FormFirstSong";
const RoutesApp = () => {
  return (
    <Routes>
        <Route index path="/" element={<HomePageV1/>} />
        <Route path="/search" element={<ExplorePageV1/>} />
        <Route path="/LoginPageV1" element={<LoginPageV1 /> }/>
        <Route path="/RegisterPageV1" element={<RegisterPageV1 /> }/>
        <Route path="/ChooseRegister" element={<ChooseRegister /> }/>
        <Route path="/FormGeneralInfo" element={<FormGeneralInfo /> }/>
        <Route path="/FormPersonalInfo" element={<FormPersonalInfo /> }/>
        <Route path="/FormFirstSong" element={<FormFirstSong /> }/>

    </Routes>
  );
};

export default RoutesApp;
