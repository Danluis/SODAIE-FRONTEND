import { useState } from "react";
import Header from "../../components/Home/Header";
import LibrarySongCardList from "../../components/Home/LibrarySongCardList";
import LibraryPlaylistCardList from "../../components/Home/LibraryPlaylistCardList";
import Footer from "../../components/Footer";
import Navbar from "../../components/Home/Navbar";

// Componente de barra de búsqueda
function SongSearchBar({ onSearch }) {
    return (
        <div className="w-full p-4">
            <input
                type="text"
                placeholder="Buscar canciones..."
                onChange={(e) => onSearch(e.target.value)}
                className="w-full p-2 rounded-lg bg-semiBlack text-semiWhite placeholder-semiWhite focus:outline-none"
            />
        </div>
    );
}

export default function Library() {
    const [searchTerm, setSearchTerm] = useState("");
    const [librarySearchTerm] = useState("")
    // Función para manejar la búsqueda
    const handleSearch = (term) => {
        setSearchTerm(term.toLowerCase());
        console.log("searchTerm actualizado:", term.toLowerCase());
    };

    return (
        <div className="w-full h-full max-w-full-xl mt-2 bg-blackMain">
            <Header />

            <div className="flex flex-col-2">
                <Navbar />

                <div className="w-full h-full">
                    <div className="bg-blackMain mr-2 p-8 w-full h-full text-semiWhite mt-10">
                        {/* Componente de búsqueda */}
                        <SongSearchBar onSearch={handleSearch} />

                        {/* Filtrar y mostrar listas de canciones */}
                        <LibrarySongCardList title={"Escuchado recientemente"} searchTerm={searchTerm} />
                        <LibraryPlaylistCardList title={"Tus listas de reproducción"} searchTerm={searchTerm} />
                        <LibrarySongCardList title={"Canciones que te han gustado"} searchTerm={searchTerm} />
                        
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    );
}