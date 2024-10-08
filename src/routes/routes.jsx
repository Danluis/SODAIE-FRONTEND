import { Route, Routes } from "react-router-dom";
import HomePageV1 from "../pages/Home/HomePageV1";
import ExplorePageV1 from "../pages/Home/ExplorePageV1";
import LoginPageV1 from "../pages/Auth/LoginPageV1";
import RegisterPageV1 from "../pages/Auth/RegisterPageV1";
import ChooseRegister from "../pages/Auth/ChooseRegister";
import FormGeneralInfo from "../pages/Form/FormGeneralInfo";
import FormPersonalInfo from "../pages/Form/FormPersonalInfo";
import FormFirstSong from "../pages/Form/FormFirstSong";
import Library from "../pages/Home/Library";
import Artist from "../pages/Artist/Artist";
import AdminHomePageV1 from "../pages/Admin/AdminHomePage";
import AdminStadisticPage from "../pages/Admin/AdminStadistcPage";
import ScrollToTop from "../components/Utilities/ScrollToTop";
import ArtistPage from "../pages/Artist/ArtistPage";
import ComposerPerfil from "../pages/Artist/ComposerPerfil";
import EditPerfil from "../pages/Artist/EditPerfil";
import EditPerfilUser from "../pages/Artist/EditPerfilUser";
import UserPerfil from "../pages/Artist/UserPerfil";
import FormTermsCon from "../pages/Form/FormTermsCon";
import FormPasswordForgotten from "../pages/Form/FormPasswordForgotten";
import FormRestorePassword from "../pages/Form/FormRestorePassword";
import FormOTPInput from "../pages/Form/FormOTPInput";
import FormRepertoire from "../pages/Form/FormRepertoire";
import FormGeneralInfoUser from "../pages/Form/FormGeneralInfoUser";
import FormPersonalInfoUser from "../pages/Form/FormPersonalInfoUser";
import SearchView from "../pages/Home/SearchView";
import PlaylistSongsCard from "../components/Home/PlaylistSongsCard";
import { ProtectedRoute } from "../components/Utilities/ProtectedRoute";
import { ProtectedRouteUser } from "../components/Utilities/ProtectedRouteUser";
import { ProtectedRouteAdmin } from "../components/Utilities/ProtectedRouteAdmin";
import { ProtectedRouteComposer } from "../components/Utilities/ProtectedRouteComposer";
const RoutesApp = () => {
  return (
    <Routes>
      <Route element={<ScrollToTop />}>
        <Route element={<ProtectedRoute />}>
          <Route path="/ChooseRegister" element={<ChooseRegister />} />
          <Route path="/Library" element={<Library />} />

          <Route element={<ProtectedRouteAdmin />}>
            <Route path="/AdminPage" element={<AdminHomePageV1 />} />
            <Route
              path="/AdminStadisticPage"
              element={<AdminStadisticPage />}
            />
          </Route>

          <Route element={<ProtectedRouteComposer />}>
            <Route path="/FormGeneralInfo" element={<FormGeneralInfo />} />
            <Route path="/FormPersonalInfo" element={<FormPersonalInfo />} />
            <Route path="/FormFirstSong" element={<FormFirstSong />} />
            <Route path="/FormTermsCon" element={<FormTermsCon />} />
          </Route>

          <Route element={<ProtectedRouteUser />}>
            <Route
              path="/FormGeneralInfoUser"
              element={<FormGeneralInfoUser />}
            />
            <Route
              path="/FormPersonalInfoUser"
              element={<FormPersonalInfoUser />}
            />
            <Route path="/FormTermsCon" element={<FormTermsCon />} />
            <Route
              path="/EditPerfilUser/:userId"
              element={<EditPerfilUser />}
            />
          </Route>
        </Route>

        <Route index path="/" element={<HomePageV1 />} />
        <Route path="/search" element={<ExplorePageV1 />} />
        <Route path="/LoginPageV1" element={<LoginPageV1 />} />
        <Route
          path="/FormPasswordForgotten"
          element={<FormPasswordForgotten />}
        />

        <Route path="/EditPerfil/:userId" element={<EditPerfil />} />

        <Route path="/FormRestorePassword" element={<FormRestorePassword />} />
        <Route path="/RegisterPageV1" element={<RegisterPageV1 />} />
        <Route path="/FormOTPInput" element={<FormOTPInput />} />
        <Route path="/repertoire" element={<FormRepertoire />} />
        <Route path="/Artist/:songId" element={<Artist />} />
        <Route path="/artists" element={<ArtistPage />} />
        <Route path="/ComposerPerfil/:userId" element={<ComposerPerfil />} />
        <Route path="/UserPerfil/:userId" element={<UserPerfil />} />
        <Route
          path="/PlaylistSongsCard/:playlistId"
          element={<PlaylistSongsCard />}
        />
        <Route path="/SearchView/:searchQuery" element={<SearchView />} />
      </Route>
    </Routes>
  );
};

export default RoutesApp;
