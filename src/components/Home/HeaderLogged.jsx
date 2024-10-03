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
  const [notificationsOpen, setNotificationsOpen] = useState(false); // Estado para controlar el menú de notificaciones
  const [notifications, setNotifications] = useState([]); // Estado para las notificaciones
  const [role, setRole] = useState(null);
  const [userImageUrl, setUserImageUrl] = useState(null);
  const [userName, setUserName] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchActive, setSearchActive] = useState(false); // Estado para controlar si el buscador está activo
  const menuRef = useRef(null);
  const notificationsRef = useRef(null); // Referencia para las notificaciones

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

      // Obtener notificaciones (simuladas o desde una API)
      setNotifications([
        { id: 1, message: "Tienes una nueva canción en tu lista." },
        { id: 2, message: "Un nuevo usuario te ha seguido." },
        { id: 3, message: "Tu perfil ha sido actualizado." },
      ]);
    } else {
      console.error("No credentials_id available");
      setLoading(false);
    }
  }, [credentials_id]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target)
      ) {
        setNotificationsOpen(false);
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
    if (role) {
      if (role === "composer") {
        navigate(`/EditPerfil/${credentials_id}`);
      } else if (role === "user") {
        navigate(`/EditPerfilUser/${credentials_id}`); // Cambiado para redirigir correctamente
      } else {
        console.error("Rol no reconocido");
      }
    } else {
      console.error("No role available");
    }
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
            {/* Ícono de notificaciones */}
            <div className="relative" ref={notificationsRef}>
              <IoNotifications
                className="w-7 h-7 text-white cursor-pointer"
                onClick={toggleNotifications}
              />
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-slate-800 rounded-md shadow-lg z-20">
                  <div className="px-4 py-2 text-white text-left font-semibold">
                    Notificaciones
                  </div>
                  {notifications.length > 0 ? (
                    <ul className="max-h-60 overflow-y-auto">
                      {notifications.map((notification) => (
                        <li
                          key={notification.id}
                          className="px-4 py-2 text-white hover:bg-gray-900"
                        >
                          {notification.message}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="px-4 py-2 text-white">
                      No hay notificaciones
                    </div>
                  )}
                </div>
              )}
            </div>

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
                  <button
                    onClick={handleNavigate}
                    className="w-full block px-4 py-2 text-white text-left hover:bg-gray-900"
                  >
                    Perfil
                  </button>
                  <button
                    onClick={handleEditProfile}
                    className="w-full block px-4 py-2 text-white text-left hover:bg-gray-900"
                  >
                    Editar Perfil
                  </button>
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

      {/* Barra de navegación inferior para móvil */}
      <BottomNav />
    </>
  );
}
