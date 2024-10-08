import Header from "../../components/Home/Header";
import SongCardListSearch from "../../components/Home/SongCardListSearch";
import Footer from "../../components/Footer";
import Navbar from "../../components/Home/Navbar";
import ArtistListSearch from "../Artist/ArtistListSearch";
import { useParams } from "react-router-dom";

export default function SearchView() {
  const { searchQuery } = useParams(); // Obtener el parámetro de búsqueda
  const decodedQuery = searchQuery.replace(/\+/g, ' '); // Reemplazar '+' por ' '

  return (
    <div className="min-h-screen w-full bg-blackMain flex flex-col">
      {/* Header */}
      <Header />

      {/* Contenedor principal que se extiende para ocupar toda la pantalla */}
      <div className="flex flex-1 flex-col lg:flex-row w-full h-full">
        {/* Navbar - Se ajusta al alto y se mantiene fijo en pantallas grandes */}
        <Navbar aria-label="Navegación principal del sitio" className="lg:w-1/4 h-full" />

        {/* Contenido principal */}
        <main className="flex-1 w-full h-full">
          <div className="bg-blackMain p-4 sm:p-8 w-full h-full text-white">
            <h1 className="mt-24 text-3xl font-semibold text-center">Resultados de Búsqueda para: {decodedQuery}</h1>
            {/* Artist List */}
            <section aria-label="Lista de compositores" className="mt-10">
              <ArtistListSearch title="Compositores" search={decodedQuery} />
            </section>

            {/* SongCardLists */}
            <section aria-label="Canciones escuchadas recientemente">
              <SongCardListSearch title="Canciones" search={decodedQuery}/>
            </section>

            <section aria-label="Canciones subidas recientemente">
              <SongCardListSearch title="Playlist" search={decodedQuery} />
            </section>

            {/* Footer */}
            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
}
