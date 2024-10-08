import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineHome, AiOutlineCompass, AiOutlineBell, AiOutlineUser } from "react-icons/ai";

export default function BottomNav() {
  const location = useLocation(); // Para verificar en qué ruta estamos
  const navigate = useNavigate(); // Para redirigir al usuario

  // Obtener el objeto 'user' del localStorage y extraer 'credentials_id'
  const user = JSON.parse(localStorage.getItem("user"));
  const credentials_id = user?.credentials_id; // Verifica si existe el objeto y luego extrae credentials_id

  // Redirigir si credentials_id está vacío o no existe
  const handleProfileClick = () => {
    if (!credentials_id) {
      navigate("/LoginPageV1"); // Redirigir si no hay credentials_id
    } else {
      // Verificar el rol del usuario y redirigir a la ruta correspondiente
      if (user.roles === 'composer') {
        navigate(`/ComposerPerfil/${credentials_id}`); // Redirigir al perfil del compositor
      } else if (user.roles === 'user' || user.roles === 'admin') {
        navigate(`/UserPerfil/${credentials_id}`); // Redirigir al perfil de usuario o admin
      }
    }
  };

  return (
    <nav className="sm:hidden fixed bottom-0 w-full bg-blackMain border-t-2 border-opacity-5 border-slate-800 flex justify-around items-center py-2 px-4 z-50">
      {/* Tab Inicio */}
      <Link to="/" className="flex flex-col items-center">
        <AiOutlineHome
          className={`text-2xl ${
            location.pathname === "/" || location.pathname === "/AdminPage" ? "text-white" : "text-gray-400"
          }`}
        />
        <span
          className={`text-xs ${
            location.pathname === "/" || location.pathname === "/AdminPage" ? "text-white" : "text-gray-400"
          }`}
        >
          Inicio
        </span>
      </Link>

      {/* Tab Explorar */}
      <Link to="/search" className="flex flex-col items-center">
        <AiOutlineCompass
          className={`text-2xl ${
            location.pathname === "/search" ? "text-white" : "text-gray-400"
          }`}
        />
        <span
          className={`text-xs ${
            location.pathname === "/search" ? "text-white" : "text-gray-400"
          }`}
        >
          Explorar
        </span>
      </Link>

      {/* Tab Notificaciones */}
      <Link to="/" className="flex flex-col items-center">
        <AiOutlineBell
          className={`text-2xl ${
            location.pathname === "/notificaciones" ? "text-white" : "text-gray-400"
          }`}
        />
        <span
          className={`text-xs ${
            location.pathname === "/notificaciones" ? "text-white" : "text-gray-400"
          }`}
        >
          Notificaciones
        </span>
      </Link>

      {/* Tab Perfil */}
      <button onClick={handleProfileClick} className="flex flex-col items-center">
        <AiOutlineUser
          className={`text-2xl ${
            location.pathname === `/ComposerPerfil/${credentials_id}` || location.pathname === `/UserPerfil/${credentials_id}`
              ? "text-white" : "text-gray-400"
          }`}
        />
        <span
          className={`text-xs ${
            location.pathname === `/ComposerPerfil/${credentials_id}` || location.pathname === `/UserPerfil/${credentials_id}`
              ? "text-white" : "text-gray-400"
          }`}
        >
          Perfil
        </span>
      </button>
    </nav>
  );
}
