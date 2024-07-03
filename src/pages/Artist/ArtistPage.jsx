import React, { useState } from 'react';
import Header from "../../components/Home/Header";
import Footer from "../../components/Footer";
import Navbar from "../../components/Home/Navbar";
import ArtistList from "../../components/Home/ArtistList";

export default function ArtistPage() {
  const [visibleArtists, setVisibleArtists] = useState(3); // Inicialmente muestra 3 listas de artistas

  const showMoreArtists = () => {
    setVisibleArtists(prev => prev + 3); // Muestra 3 listas más al hacer clic
  };

  return (
    <div className="w-full h-full max-w-full-xl mt-2 bg-blackMain">
      <Header />
      <div className="flex flex-col-2">
        <Navbar />
        <div className="w-full h-full">
          <div className='bg-blackMain mr-2 p-8 w-full h-full text-white mt-10'>
            {visibleArtists >= 1 && <ArtistList title={'Artistas Populares'} />}
            {visibleArtists >= 2 && <ArtistList title={'Artistas Nuevos'} />}
            {visibleArtists >= 3 && <ArtistList title={'Tus Artistas Favoritos'} />}
            {visibleArtists >= 4 && <ArtistList title={'Artistas Emergentes'} />}
            {visibleArtists >= 5 && <ArtistList title={'Artistas Recomendados'} />}
            {/* Agrega más listas de artistas según sea necesario */}
            <button 
              className="mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700"
              onClick={showMoreArtists}
            >
              Mostrar más
            </button>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
