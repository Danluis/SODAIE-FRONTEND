import { useState } from "react";
import { Link } from "react-router-dom";
import ButtonRegister from "./ButtonRegister";
import LoginButtonHeader from "./LoginButtonHeader";
import { CiSearch } from "react-icons/ci";
import BottomNav from "./BottomNav"; // Importar BottomNav

export default function HeaderUnlogged() {
  const [searchActive, setSearchActive] = useState(false); // Controla si el buscador está activo

  return (
    <>
      <header className="fixed top-0 z-10 w-full border-b-2 border-white border-opacity-5">
        <div className="w-full bg-blackMain flex items-center justify-between mx-auto px-4 sm:px-8 py-2">
          
          {/* Logo */}
          <Link
            to={"/"}
            aria-label="Página principal"
            className="flex items-center"
          >
            <span className="pl-12 text-2xl sm:text-2xl font-semibold text-white whitespace-nowrap dark:text-white">
              REPERDOM
            </span>
          </Link>

          {/* Buscador para versión de escritorio */}
          <div className="items-center sm:flex hidden">
            <input
              type="text"
              aria-label="Buscar contenido"
              className="rounded-l-3xl py-2 px-4 sm:px-6 w-full sm:w-[300px] md:w-[400px] lg:w-[500px] bg-blackMain border-2 border-slate-800 text-white outline-none"
              placeholder="Buscar"
            />
            <div className="rounded-r-3xl py-2 px-4 sm:py-3 sm:px-6 bg-slate-800 cursor-pointer">
              <CiSearch className="text-white text-lg sm:text-xl" />
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
                className="text-white text-lg sm:text-xl cursor-pointer"
                onClick={() => setSearchActive(!searchActive)} // Activa o desactiva el buscador
              />
              {searchActive && (
                <input
                  type="text"
                  className="w-full bg-transparent outline-none text-white px-4 ml-2"
                  placeholder="Buscar..."
                  aria-label="Buscar contenido"
                />
              )}
            </div>
          </div>

          {/* Botones de Registro e Iniciar Sesión para versión de escritorio */}
          <div className="hidden sm:flex space-x-3 items-center">
            <ButtonRegister text={"Registrarse"} />
            <LoginButtonHeader text={"Iniciar Sesión"} />
          </div>
        </div>
      </header>

      {/* Menú de navegación inferior */}
      <BottomNav />
    </>
  );
}
