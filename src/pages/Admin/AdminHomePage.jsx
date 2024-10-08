import Header from "../../components/Home/Header";
import Slider from "../../components/Home/Slider";
import SongCardList from "../../components/Home/SongCardListV1";
import Footer from "../../components/Footer";
import NavbarAdmin from "../../components/Home/NavbarAdmin";
import ArtistList from "../../components/Home/ArtistList";
export default function AdminHomePageV1() {
  return (
    <div className=" w-full h-full max-w-full-xl mt-2 bg-blackMain">
      <Header />

      <div className="flex flex-col-2">
        <NavbarAdmin />

        <div className="w-full h-full">
          <div className="bg-blackMain mr-2 p-8 w-full h-full text-white">
            <Slider />
            <ArtistList title={"Compositores"} />
            <SongCardList title={"Escuchado recientemente"} />
            <SongCardList title={"Subidas recientemente"} />
            <SongCardList title={"Las mas votadas"} />
            <SongCardList title={"Musica de Temporada"} />
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
