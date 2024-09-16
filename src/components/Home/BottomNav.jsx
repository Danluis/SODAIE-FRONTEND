import { Link, useLocation } from "react-router-dom";
import { AiOutlineHome, AiOutlineCompass, AiOutlineBell, AiOutlineUser } from "react-icons/ai";

export default function BottomNav() {
  const location = useLocation(); // Para verificar en qué ruta estamos

  return (
    <nav className="sm:hidden fixed bottom-0 w-full bg-blackMain border-t-2 border-opacity-5 border-slate-800 flex justify-around items-center py-2 px-4 z-50">
      {/* Tab Inicio */}
      <Link to="/" className="flex flex-col items-center">
        <AiOutlineHome
          className={`text-2xl ${
            location.pathname === "/" ? "text-white" : "text-gray-400"
          }`}
        />
        <span
          className={`text-xs ${
            location.pathname === "/" ? "text-white" : "text-gray-400"
          }`}
        >
          Inicio
        </span>
      </Link>

      {/* Tab Explorar */}
      <Link to="/search" className="flex flex-col items-center">
        <AiOutlineCompass
          className={`text-2xl ${
            location.pathname === "/explorar" ? "text-white" : "text-gray-400"
          }`}
        />
        <span
          className={`text-xs ${
            location.pathname === "/explorar" ? "text-white" : "text-gray-400"
          }`}
        >
          Explorar
        </span>
      </Link>

      {/* Tab Notificaciones */}
      <Link to="/" className="flex flex-col items-center">
        <AiOutlineBell
          className={`text-2xl ${
            location.pathname === "/notificaciones"
              ? "text-white"
              : "text-gray-400"
          }`}
        />
        <span
          className={`text-xs ${
            location.pathname === "/notificaciones"
              ? "text-white"
              : "text-gray-400"
          }`}
        >
          Notificaciones
        </span>
      </Link>

      {/* Tab Perfil */}
      <Link to="/perfil" className="flex flex-col items-center">
        <AiOutlineUser
          className={`text-2xl ${
            location.pathname === "/perfil" ? "text-white" : "text-gray-400"
          }`}
        />
        <span
          className={`text-xs ${
            location.pathname === "/perfil" ? "text-white" : "text-gray-400"
          }`}
        >
          Perfil
        </span>
      </Link>
    </nav>
  );
}
