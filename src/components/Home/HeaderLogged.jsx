import { useState } from 'react';
import { Link } from "react-router-dom";
import { IoNotifications } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { useAuth } from '../../context/AuthContext';
export default function HeaderLogged() {
  const {logout} = useAuth()
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="fixed top-0 z-10 max-w-full-xl flex flex-wrap w-full border-b-2 border-b-white border-opacity-5">
      <div className="w-full bg-blackMain max-w-full-xl flex flex-wrap items-center justify-between mx-auto px-8 p-2">
        <Link to={'/'} className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">REPERDOM</span>
        </Link>

        <div className="flex items-center">
          <input type="text" className="rounded-l-3xl py-2 px-6 w-[500px] bg-blackMain border-solid border-2 border-slate-800 text-white outline-none" placeholder="Buscar" />
          <div className="rounded-r-3xl py-3 px-6 bg-slate-800 cursor-pointer">
            <CiSearch className="text-white text-xl w-5 h-5" />
          </div>
        </div>

        <div className="flex items-center gap-4 relative">
          <IoNotifications className="w-7 h-7 text-white" />
          <div className="relative">
            <button 
              className="flex items-center justify-center w-10 h-10 p-4 text-center bg-semiBlack rounded-full cursor-pointer"
              onClick={toggleMenu}
            >
              <span className="text-white">D</span>
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-md shadow-lg z-20">
              <Link to="/Perfil" className="w-full block px-4 py-2 text-white text-left hover:bg-gray-900">
                Perfil
              </Link>
              <button onClick={logout} className="w-full block px-4 py-2 text-white text-left hover:bg-gray-900">
                Cerrar sesión
              </button>
            </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
