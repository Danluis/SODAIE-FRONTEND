import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoNotifications } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { useAuth } from "../../context/AuthContext";
import {
  apiGetCredential,
  apiGetUser,
  apiGetSongs,
  apiGetComposers,
} from "../../api/auth";
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
  const [searchQuery, setSearchQuery] = useState(""); // Estado para el texto de búsqueda
  const [searchResults, setSearchResults] = useState([]); // Estado para los resultados de búsqueda
  const menuRef = useRef(null);
  const searchRef = useRef(null); // Nueva referencia para el buscador
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
      // Verifica si el clic fue fuera del menú y el buscador
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
        setSearchActive(false); // Cierra el buscador si se hace clic fuera
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
      if (role === "composer" || role === "admin") {
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
    console.log("Editar Perfil");

    if (role) {
      if (role === "composer" || role === "admin") {
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

  // Función para manejar la búsqueda
  const handleSearch = async (query, noSearch = false) => {
    try {
      const songsResponse = await apiGetSongs();
      const composersResponse = await apiGetComposers();

      // Filtrar canciones y compositores según el texto ingresado
      const filteredSongs = songsResponse.data.filter((song) =>
        song.title.toLowerCase().includes(query.toLowerCase())
      );

      const filteredComposers = composersResponse.data.filter((composer) => {
        const fullName = `${composer.name}`.toLowerCase();
        const nickname = composer.nickname
          ? composer.nickname.toLowerCase()
          : "";

        // Comprobar si el query coincide con el nombre completo o el nickname
        return (
          fullName.includes(query.toLowerCase()) ||
          nickname.includes(query.toLowerCase())
        );
      });

      // Combinar resultados en un solo array
      setSearchResults([...filteredSongs, ...filteredComposers]);

      if (noSearch === true) {
        return;
      }

      // Navegar a la vista de búsqueda si hay query
      if (query) {
        const searchResult = query.replace(/ /g, "+");
        navigate(`/SearchView/${searchResult}`);

        // Limpiar los resultados de búsqueda y el query después de navegar
        setSearchQuery(""); // Limpiar el input de búsqueda
        setSearchResults([]); // Limpiar los resultados de búsqueda
      }
    } catch (error) {
      console.error("Error al realizar la búsqueda:", error);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      handleSearch(searchQuery, true);
    } else {
      setSearchResults([]);
      console.log(searchResults);
    }
  }, [searchQuery]);

  const handleResultClick = (result) => {
    console.log("Result clicked:", result); // Añadir este log
    const searchResult = result.title
      ? result.title.replace(/ /g, "+")
      : `${result.name}`.replace(/ /g, "+");

    // Limpiar el input de búsqueda
    setSearchQuery(""); // Limpiar el input

    // Navegar a la vista de búsqueda
    navigate(`/SearchView/${searchResult}`);
  };

  // Nueva función que maneja la búsqueda tanto con "Enter" como con clic en el ícono
  const triggerSearch = () => {
    if (searchQuery.trim()) {
      handleSearch(searchQuery);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      triggerSearch();
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
          <div className="items-center sm:flex relative">
            <input
              type="text"
              className="rounded-l-3xl py-2 px-6 w-[40vw] sm:block hidden bg-blackMain border-solid border-2 border-slate-800 text-white outline-none bg-opacity-40 backdrop-filter backdrop-blur-lg"
              placeholder="Buscar"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              ref={searchRef} // Agrega la referencia al input de búsqueda
            />
            <div
              className="flex rounded-r-3xl py-3 px-6 sm:bg-slate-800 bg-blackMain cursor-pointer bg-opacity-40 backdrop-filter backdrop-blur-lg"
              onClick={triggerSearch} // Añade este onClick
            >
              <CiSearch className="text-white text-xl sm:w-5 sm:h-5 w-6 h-6 sm:block hidden" />
            </div>

            {/* Resultados de búsqueda */}
            {searchResults.length > 0 && (
              <div className="absolute sm:top-12 sm:w-[40vw] w-[60vw] bg-slate-800 rounded-lg shadow-lg z-20 top-20 sm:right-16 right-14">
                {searchResults.map((result, index) => (
                  <div
                    key={index}
                    className="p-2 hover:bg-slate-700 cursor-pointer"
                    onClick={() => handleResultClick(result)} // Asegúrate de que el clic esté aquí
                  >
                    {result.title ? (
                      <p className="text-white">{result.title}</p>
                    ) : (
                      <p className="text-white">
                        {`${result.name}`}
                        {result.nickname && (
                          <span className="text-gray-400">{` (${result.nickname})`}</span>
                        )}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Buscador para versión móvil */}
          <div className="flex items-center sm:hidden relative">
            <div
              className={`flex items-center py-2 px-2 bg-blackMain text-white bg-opacity-40 backdrop-filter backdrop-blur-lg transition-all duration-300 ${
                searchActive ? "w-full" : "w-[40px] rounded-full"
              }`}
            >
              <CiSearch
                className="text-white text-xl w-6 h-6 cursor-pointer"
                onClick={() => {
                  setSearchActive(!searchActive);
                  console.log("searchActive toggled:", !searchActive); // Verifica el nuevo estado
                }}
              />

              {searchActive && (
                <input
                  type="text"
                  className="w-full bg-transparent outline-none text-white px-4 ml-2"
                  placeholder="Buscar..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  ref={searchRef} // Agrega la referencia al input de búsqueda
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
            <button
  className="rounded-full cursor-pointer flex items-center justify-center bg-gray-300"
  onClick={toggleMenu}
  ref={menuRef}
  style={{ width: '48px', height: '48px' }} // Mantén el tamaño del botón consistente
>
  {userImageUrl ? (
    <img
      src={userImageUrl}
      className="w-12 h-12 rounded-full object-cover object-center"
      alt="User Avatar"
    />
  ) : (
    <div className="w-12 h-12 rounded-full bg-gray-400 text-white flex items-center justify-center">
      U
    </div>
  )}
</button>


            {menuOpen && (
              <div
                className="absolute top-12 right-0 bg-slate-800 rounded-lg shadow-lg z-20"
                onClick={(e) => e.stopPropagation()} // Detiene la propagación del clic dentro del menú
              >
                <ul
                  className="py-2 w-[10rem] text-sm text-gray-200"
                  ref={menuRef}
                >
                  <li
                    className="px-4 py-2 hover:bg-slate-700 cursor-pointer"
                    onClick={() => {
                      handleNavigate();
                      setMenuOpen(false); // Cierra el menú después de la acción
                    }}
                  >
                    Mi Perfil
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-slate-700 cursor-pointer"
                    onClick={() => {
                      handleEditProfile();
                      setMenuOpen(false); // Cierra el menú después de la acción
                    }}
                  >
                    Editar Perfil
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-slate-700 cursor-pointer"
                    onClick={() => {
                      logout();
                      setMenuOpen(false); // Cierra el menú después de la acción
                    }}
                  >
                    Cerrar Sesión
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        {/* Barra de navegación inferior para móviles */}
        <BottomNav />
      </header>
    </>
  );
}
