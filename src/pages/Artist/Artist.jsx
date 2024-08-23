import Header from "../../components/Home/Header";
import Footer from "../../components/Footer";
import Navbar from "../../components/Home/Navbar";
import CardPlayButton from "../../components/MediaPlayer/CardPlayButton";
import { apiGetSong } from "../../api/auth";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Artist() {
  const { songId } = useParams();
  const [songData, setSongData] = useState(null);

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

  return (
    <div className="w-full h-full max-w-full-xl mt-2 bg-blackMain">
      <Header />

      <div className="flex flex-col-2">
        <Navbar />

        <div className="w-full h-full">
          <div className="bg-blackMain mr-2 p-8 w-full h-full text-white mt-10">
            <div className="w-full h-full max-w-full-xl mt-2 bg-blackMainmax-w-sm bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <h1 className="text-2xl font-bold text-white mb-2">
                  {songData.title}
                </h1>
                <p className="text-sm text-gray-400 mb-12">
                  <Link
                    to={`/ComposerPerfil/${songData.user_id}`}
                    className="hover:text-white"
                  >
                    {songData.interpreters}
                  </Link>{" "}
                  • {songData.createdAt}
                </p>
                <div className="flex justify-between items-center mb-4">
                  <div className="relative z-20 left-14 -mt-20 ">
                    <CardPlayButton id={songId} />
                  </div>
                </div>
                <div className="border-t border-gray-700 pt-2 mb-4">
                  <div className="flex justify-between text-gray-400">
                    <span>{songData.title}</span>
                    <span>{songData.duration}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mb-2">
                  {songData.releaseDate}
                </p>
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
