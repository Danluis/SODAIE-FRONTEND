import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";
import Header from "../../components/Home/Header";
import Footer from "../../components/Footer";
import Navbar from "../../components/Home/Navbar";
import { apiGetUser } from "../../api/auth";

const socialIcons = {
  Twitter: FaTwitter,
  Facebook: FaFacebook,
  Instagram: FaInstagram,
  Youtube: FaYoutube,
  TikTok: FaTiktok,
};

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

  // Renderizar múltiples redes sociales si existen
  const SocialNetworkIcons = () => {
    if (!user.social_network_selected || !user.social_network_link) {
      return null;
    }

    return (
      <div className="text-white mt-2 flex space-x-4">
        {user.social_network_selected.map((network, index) => {
          const SocialIcon = socialIcons[network];
          const link = user.social_network_link[index];

          return (
            SocialIcon && (
              <a
                key={index}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white p-2 rounded-full bg-blackLogo hover:bg-slate-700 flex items-center justify-center"
                style={{ width: "50px", height: "50px" }} // Tamaño del contenedor
              >
                <SocialIcon className="w-6 h-6" /> {/* Tamaño del ícono */}
              </a>
            )
          );
        })}
      </div>
    );
  };

  return (
    <div className="w-full h-full max-w-full-xl mt-2 bg-blackMain">
      <Header />

      <div className="flex">
        <Navbar />

        <div className="flex-1 p-8">
          {/* Banner Section */}
          <div className="w-full h-64 bg-gray-900 flex items-center justify-center mb-8">
            {user.bannerImage ? (
              <img
                src={user.bannerImage}
                alt="Banner"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-white">No banner image available</div>
            )}
          </div>

          <div className="bg-gray-700 p-6 rounded mt-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="bg-gray-500 rounded-full h-24 w-24 mr-4">
                  {user.userImageUrl ? (
                    <img
                      src={user.userImageUrl}
                      alt="Profile"
                      className="h-full w-full object-cover rounded-full"
                    />
                  ) : (
                    <div className="text-white">No profile image available</div>
                  )}
                </div>
                <sapn className="text-2xl font-bold text-white mr-4">
                  {user.nickname}
                </sapn>
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

            <div>
              <span className="text-2xl font-bold mb-4 text-white">
                Contacto y Redes Sociales:
              </span>
              <div className="text-2xl font-bold mb-4 text-white mt-6">
                Teléfono: {user.phone}
              </div>
              <SocialNetworkIcons /> {/* Aquí se renderizan los íconos */}
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
}