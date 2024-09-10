import Header from "../../components/Home/Header";
import Footer from "../../components/Footer";
import Navbar from "../../components/Home/Navbar";
import LibrarySongCardList from "../../components/Home/LibrarySongCardList";
import { apiGetSong } from "../../api/auth";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Artist() {
    const { songId } = useParams();
    const [songData, setSongData] = useState(null);
    const [searchTerm] = useState("");

    useEffect(() => {
        const fetchSongData = async () => {
            try {
                const response = await apiGetSong(songId);
                setSongData(response.data);   
            } catch (error) {
                console.error("Error fetching song data:", error);
            }
        };

        if (songId) {
            fetchSongData();
        }
    }, [songId]);

    return (
        <div className="min-h-screen flex flex-col bg-blackMain">
            <Header />
            <div className="flex-grow">
              <Navbar/>
                <div className="p-8 text-white mt-10">
                    <div className="w-full max-w-full-xl bg-blackMain rounded-lg shadow-lg overflow-hidden mx-auto">
                        <div className="p-6">
                            {songData ? (
                                <>
                                    <div className="flex flex-col md:flex-row gap-6">
                                        <img 
                                            src={songData.cover} 
                                            alt={songData.title} 
                                            className="rounded-lg w-full md:w-[10rem] h-auto object-cover" 
                                        />
                                        <div className="flex flex-col justify-between">
                                            <div>
                                                <p className="text-sm text-gray-400">Canción</p>
                                                <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{songData.title}</h1>
                                                <p className="text-sm text-gray-400 mb-4 md:mb-12">
                                                    <Link to="/Perfil" className="hover:text-white">
                                                        {songData.composers.join(', ')}
                                                    </Link> 
                                                    • {new Date(songData.createdAt).getFullYear()}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-400 mb-2">{new Date(songData.releaseDate).getFullYear()}</p>
                                                <p className="text-xs text-gray-400">{songData.copyright}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 z-10 border-t border-gray-700 pt-2">
                                        <LibrarySongCardList title='' searchTerm={searchTerm} id={songId} />
                                    </div>
                                </>
                            ) : (
                                <p className="text-white">Loading...</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
