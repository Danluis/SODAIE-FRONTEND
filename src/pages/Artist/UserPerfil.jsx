import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../../components/Home/Header";
import Footer from "../../components/Footer";
import Navbar from "../../components/Home/Navbar";
import FollowButton from "../../components/Utilities/FollowButton";
import { apiGetUser } from "../../api/auth";

export default function UserPerfil() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Define la función para obtener los datos del usuario
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
                <sapn className="text-2xl font-bold text-white mr-4">
                  {user.nickname}
                </sapn>
                <FollowButton />
              </div>
            </div>

            <div className="border-b border-gray-500 my-4"></div>

            <div className="mb-4">
              <textarea
                readOnly
                className="w-1/2 h-32 bg-gray-600 text-white p-2 rounded mt-2"
              >
                {user.biografia}
              </textarea>
            </div>

            <div className="border-b border-gray-500 my-4"></div>

            <div className="mb-4">
              <span className="text-2xl font-bold mb-4 text-white">
                Artistas que sigo:
              </span>
              <div className="flex space-x-2">
                <div className="bg-gray-500 h-12 w-12"></div>
                <div className="bg-gray-500 h-12 w-12"></div>
                <div className="bg-gray-500 h-12 w-12"></div>
                <div className="bg-gray-500 h-12 w-12"></div>
              </div>
            </div>

            <div className="border-b border-gray-500 my-4"></div>

            <div>
              <span className="text-2xl font-bold mb-4 text-white">
                Contacto y Redes Sociales:
              </span>
              <div className="text-2xl font-bold mb-4 text-white mt-6">
                Telefono: {user.phone}
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
}
