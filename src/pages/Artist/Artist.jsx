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

    if (!songData) {
        return <div>Loading...</div>;
    }

    // Extraer el año de createdAt y releaseDate
    const createdAtYear = new Date(songData.createdAt).getFullYear();

    return (
        <div className="w-full h-full max-w-full-xl mt-2 bg-blackMain">
            <Header />

            <div className="flex flex-col-2">
                <Navbar />

                <div className="w-full h-full">
                    <div className="bg-blackMain mr-2 p-8 w-full h-full text-white mt-10">
                        <div className="w-full h-full max-w-full-xl mt-2 bg-blackMainmax-w-sm rounded-lg shadow-lg overflow-hidden">
                            <div className="p-6 h-[30rem]">
                                <div className="flex">
                                    <div className="">
                                        <img src={songData.cover} alt={songData.title} className="rounded-lg mr-4 w-[10rem] h-[11rem] inline-block object-cover" />
                                    </div>
                                    <div className="flex flex-col gap-6 item-end">
                                        <p>Canción</p>
                                        <h1 className="text-5xl font-bold text-white mb-2 inline-block">{songData.title}</h1>
                                        <p className="text-sm text-gray-400 mb-12">
                                            <Link to="/Perfil" className="hover:text-white">
                                                {songData.composers.join(', ')}
                                            </Link> • {createdAtYear}
                                        </p>
                                    </div>
                                </div>

                                <div className="z-10 border-t border-gray-700 pt-2 mb-4">


                                    <LibrarySongCardList title='' searchTerm={searchTerm} id={songId} />
                                </div>
                                <p className="text-xs text-gray-400 mb-2">{songData.releaseDateYear}</p>
                                <p className="text-xs text-gray-400">{songData.copyright}</p>
                            </div>
                        </div>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    );
}
