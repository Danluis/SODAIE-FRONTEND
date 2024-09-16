import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoNotifications } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { useAuth } from "../../context/AuthContext";
import { apiGetCredential, apiGetUser } from "../../api/auth";
import BottomNav from "./BottomNav"; // Importar el BottomNav

export default function HeaderLogged() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [role, setRole] = useState(null);
  const [userImageUrl, setUserImageUrl] = useState(null);
  const [userName, setUserName] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchActive, setSearchActive] = useState(false); // Estado para controlar si el buscador está activo
  const menuRef = useRef(null);

  // Parse user data from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const { credentials_id } = user || {};

  useEffect(() => {
    if (credentials_id) {
      // Obtener el rol del usuario a partir de su credentials_id
      apiGetCredential(credentials_id)
        .then((response) => {
          if (response.data && response.data.roles) {
            setRole(response.data.roles);
          } else {
            console.error("Role not found in the API response");
          }
        })
        .catch((error) => {
          console.error("Error al obtener el rol del usuario:", error);
        })
        .finally(() => {
          setLoading(false);
        });

      // Obtener la imagen y nombre del usuario desde la API
      apiGetUser(credentials_id)
        .then((response) => {
          const userData = response.data;
          setUserImageUrl(userData.userImageUrl);
          setUserName(userData.name);
        })
        .catch((error) => {
          console.error("Error al obtener los datos del usuario:", error);
        });
    } else {
      console.error("No credentials_id available");
      setLoading(false);
    }
  }, [credentials_id]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleNavigate = () => {
    if (role) {
      if (role === "composer") {
        navigate(`/ComposerPerfil/${credentials_id}`);
      } else if (role === "user" || role === "admin") {
        navigate(`/UserPerfil/${credentials_id}`);
      } else {
        console.error("Rol no reconocido");
      }
    } else {
      console.error("No role available");
    }
  };

  const handleEditProfile = () => {
    navigate(`/EditPerfil/${credentials_id}`);
  };

  return (
    <>
      <header className="fixed top-0 z-10 max-w-full-xl flex flex-wrap w-full border-b-2 border-b-white border-opacity-5">
        <div className="w-full bg-blackMain max-w-full-xl flex flex-wrap items-center justify-between mx-auto px-8 p-2">
          <Link
            to={"/"}
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="pl-12 self-center flex text-2xl sm:mb-0 mb-4 mt-1 font-semibold whitespace-nowrap dark:text-white">
              REPERDOM
            </span>
          </Link>

          {/* Buscador para versión de escritorio */}
          <div className="items-center sm:flex hidden">
            <input
              type="text"
              className="rounded-l-3xl py-2 px-6 w-[40vw] sm:block hidden bg-blackMain border-solid border-2 border-slate-800 text-white outline-none bg-opacity-40 backdrop-filter backdrop-blur-lg"
              placeholder="Buscar"
            />
            <div className="flex rounded-r-3xl py-3 px-6 sm:bg-slate-800 bg-blackMain cursor-pointer bg-opacity-40 backdrop-filter backdrop-blur-lg">
              <CiSearch className="text-white text-xl sm:w-5 sm:h-5 w-6 h-6" />
            </div>
          </div>

          {/* Buscador para versión móvil */}
          <div className="flex items-center sm:hidden">
            <div
              className={`flex items-center py-2 px-2 bg-blackMain text-white bg-opacity-40 backdrop-filter backdrop-blur-lg transition-all duration-300 ${
                searchActive ? "w-full" : "w-[40px] rounded-full"
              }`}
            >
              <CiSearch
                className="text-white text-xl w-6 h-6 cursor-pointer"
                onClick={() => setSearchActive(!searchActive)}
              />
              {searchActive && (
                <input
                  type="text"
                  className="w-full bg-transparent outline-none text-white px-4 ml-2"
                  placeholder="Buscar..."
                />
              )}
            </div>
          </div>

          {/* Iconos de notificaciones y menú del usuario */}
          <div className="sm:flex hidden items-center gap-4 relative">
            <IoNotifications className="w-7 h-7 text-white" />
            <div className="relative" ref={menuRef}>
              <button
                className="flex items-center justify-center w-10 h-10 text-center bg-semiBlack rounded-full cursor-pointer"
                onClick={toggleMenu}
              >
                {userImageUrl ? (
                  <img
                    className="w-full h-full rounded-full object-cover"
                    src={userImageUrl}
                    alt="User profile"
                  />
                ) : (
                  <span className="text-white">
                    {userName ? userName.charAt(0) : "U"}
                  </span>
                )}
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-md shadow-lg z-20">
                  <div
                    onClick={handleNavigate}
                    className="w-full block px-4 py-2 text-white text-left hover:bg-gray-900"
                  >
                    Perfil
                  </div>
                  <div
                    onClick={handleEditProfile}
                    className="w-full block px-4 py-2 text-white text-left hover:bg-gray-900"
                  >
                    Editar Perfil
                  </div>
                  <button
                    onClick={logout}
                    className="w-full block px-4 py-2 text-white text-left hover:bg-gray-900"
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Menú de navegación inferior */}
      <BottomNav />
    </>
  );
}
