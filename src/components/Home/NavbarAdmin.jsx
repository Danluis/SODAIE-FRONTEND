import { useState, useEffect } from "react";
import { LuMenu } from "react-icons/lu";
import { IoHome } from "react-icons/io5";
import { MdOutlineExplore } from "react-icons/md";
import { MdLibraryMusic } from "react-icons/md";
import { IoClose } from "react-icons/io5"; // Importar el ícono de cerrar
import { FaUserShield } from "react-icons/fa"; // Icono para Admin
import { Link } from "react-router-dom";

export default function NavbarAdmin() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Obtener el rol del usuario desde el almacenamiento local o desde algún contexto
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserRole(user.roles); // Suponiendo que 'roles' contiene el rol del usuario
    }
  }, []);

  return (
    <div className="relative">
      {/* Botón del menú */}
      <div className="fixed top-0 left-3 mt-3 ml-4 z-50">
        <div
          className="flex items-center justify-center hover:bg-slate-600 p-2 rounded-full cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <LuMenu className="text-white w-6 h-6" />
        </div>
      </div>

      {/* Menú desplegable */}
      <div
        className={`fixed top-0 left-0 h-full flex flex-col items-center pt-[9vh] w-[6rem] bg-blackMain border-r-2 border-opacity-5 z-50 transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Botón de cierre */}
        <div
          className="flex items-center justify-center hover:bg-slate-600 p-2 rounded-full cursor-pointer mt-4"
          onClick={() => setMenuOpen(false)}
        >
          <IoClose className="text-white w-6 h-6" />
        </div>

        <div className="flex flex-col gap-4 mt-4">
          {userRole === "admin" ? (
            <Link
              to={"/AdminPage"}
              className="hover:bg-slate-600 flex flex-col items-center p-2 rounded-lg cursor-pointer"
            >
              <IoHome className="text-white w-6 h-6" />
              <span className="text-white">Inicio</span>
            </Link>
          ) : (
            <Link
              to={"/"}
              className="hover:bg-slate-600 flex flex-col items-center p-2 rounded-lg cursor-pointer"
            >
              <IoHome className="text-white w-6 h-6" />
              <span className="text-white">Inicio</span>
            </Link>
          )}
          <Link
            to={"/search"}
            className="hover:bg-slate-600 flex flex-col items-center p-2 rounded-lg cursor-pointer"
          >
            <MdOutlineExplore className=" text-white w-6 h-6" />
            <span className=" text-white">Explorar</span>
          </Link>
          <Link
            to={"/Library"}
            className="hover:bg-slate-600 flex flex-col items-center p-2 rounded-lg cursor-pointer"
          >
            <MdLibraryMusic className=" text-white w-6 h-6" />
            <span className=" text-white">Biblioteca</span>
          </Link>
          <Link
            to={"/AdminStadisticPage"}
            className="hover:bg-slate-600 flex flex-col items-center p-2 rounded-lg cursor-pointer"
          >
            <FaUserShield className=" text-white w-6 h-6" />
            <span className=" text-white">Admin</span>
          </Link>
        </div>
      </div>

      {/* Fondo oscuro para desenfoque */}
      {menuOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </div>
  );
}
