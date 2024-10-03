import Header from "../../components/Home/Header";
import Slider from "../../components/Home/Slider";
import SongCardList from "../../components/Home/SongCardListV1";
import Footer from "../../components/Footer";
import Navbar from "../../components/Home/Navbar";
import ArtistList from "../../components/Home/ArtistList";

export default function HomePageV1() {
  return (
    <div className="min-h-screen w-full bg-blackMain flex flex-col">
      {/* Header */}
      <Header />

      {/* Contenedor principal que se extiende para ocupar toda la pantalla */}
      <div className="flex flex-1 flex-col lg:flex-row w-full h-full">
        {/* Navbar - Se ajusta al alto y se mantiene fijo en pantallas grandes */}
        <Navbar
          aria-label="Navegación principal del sitio"
          className="lg:w-1/4 h-full"
        />

        {/* Contenido principal */}
        <main className="flex-1 w-full h-full">
          <div className="bg-blackMain p-4 sm:p-8 w-full h-full text-white">
            {/* Slider */}
            <section aria-label="Destacados recientes">
              <h1 className="sr-only">Destacados recientes</h1>
              <Slider />
            </section>

            {/* Artist List */}
            <section aria-label="Lista de compositores">
              <ArtistList title="Compositores" />
            </section>

            {/* SongCardLists */}
            <section aria-label="Canciones escuchadas recientemente">
              <SongCardList title="Escuchado recientemente" />
            </section>

            <section aria-label="Canciones subidas recientemente">
              <SongCardList title="Subidas recientemente" />
            </section>

            <section aria-label="Música de temporada">
              <SongCardList title="Música de Temporada" />
            </section>

            {/* Footer */}
            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
}
