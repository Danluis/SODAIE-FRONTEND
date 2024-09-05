import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../../components/Home/Header";
import Footer from "../../components/Footer";
import Navbar from "../../components/Home/Navbar";
import FollowButton from "../../components/Utilities/FollowButton";
import SongCardList from "../../components/Home/SongCardListV1"; // Importar el componente SongCardList
import { apiGetUser } from "../../api/auth";

export default function ComposerPerfil() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await apiGetUser(userId);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) {
    return <div className="text-white">Cargando...</div>;
  }

  if (!user) {
    return <div className="text-white">Usuario no encontrado</div>;
  }

  return (
    <div className="w-full h-full max-w-full-xl mt-2 bg-blackMain">
      <Header />

      <div className="flex">
        <Navbar />

        <div className="flex-1 p-8">
          {/* Banner Section */}
          <div className="w-full h-64 bg-gray-900 flex items-center justify-center mb-8">
            <span className="text-white text-2xl">Banner Placeholder</span>
          </div>

          <div className="bg-gray-700 p-6 rounded mt-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="bg-gray-500 rounded-full h-12 w-12 mr-4"></div>
                <span className="text-xl font-bold text-white mr-4">
                  {user.nickname}
                </span>
                <FollowButton />
              </div>
            </div>

            <div className="border-b border-gray-500 my-4"></div>

            <div className="mb-4">
              <span>Géneros que toca:</span>
              <span> etiquetas irían aquí</span>
            </div>

            <div className="border-b border-gray-500 my-4"></div>

            <div className="mb-4">
              <textarea
                className="w-1/2 h-32 bg-gray-600 text-white p-2 rounded mt-2"
                placeholder="Escriba su biografía aquí..."
              ></textarea>
            </div>

            <div className="border-b border-gray-500 my-4"></div>

            {/* Composiciones */}
            <div className="mb-4">
              <span className="text-xl text-white">Composiciones:</span>
              <SongCardList title="Composiciones" userId={user.id} />{" "}
              {/* Filtrar las canciones por userId */}
            </div>

            <div className="border-b border-gray-500 my-4"></div>

            <div>
              <span>
                ¿Estadísticas? (interrogación significa que no sé si lo ponemos
                o no)
              </span>
            </div>

            <div className="border-b border-gray-500 my-4"></div>

            <div className="mb-4">
              <span>Redes Sociales:</span>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
}
