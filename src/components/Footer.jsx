import { FaInstagram } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";


export default function Footer() {
    return(
    <footer className="mt-36 w-full">

      <div className="flex flex-col-5 justify-between px-4">
        
        <div className="flex flex-col items-left">
              <span className="text-white text-lg">Empresa</span>
              <span className="text-semiWhite hover:text-white cursor-pointer text-lg">Acerca de</span>
              <span className="text-semiWhite hover:text-white cursor-pointer text-lg">Nosotros</span>
          </div>

          <div className="flex flex-col items-left">
              <span className="text-white text-lg">Comunidades</span>
              <span className="text-semiWhite hover:text-white cursor-pointer text-lg">Artistas</span>
          </div>

          <div className="flex flex-col items-left">
              <span className="text-white text-lg">Enlaces utiles</span>
              <span className="text-semiWhite hover:text-white cursor-pointer text-lg">Asistencia</span>
              <span className="text-semiWhite hover:text-white cursor-pointer text-lg">Ayuda</span>
          </div>

          <div className="flex flex-col items-left">
              <span className="text-white text-lg">Contacto</span>
              <span className="text-semiWhite hover:text-white cursor-pointer text-lg">Direccion</span>
          </div>

          <div className="flex gap-2">
            <FaInstagram className="text-white w-10 h-10 p-2 rounded-full bg-blackLogo hover:bg-slate-700"/>
            <FaFacebookSquare className="text-white w-10 h-10 p-2 rounded-full bg-blackLogo hover:bg-slate-700"/>
            <FaYoutube className="text-white w-10 h-10 p-2 rounded-full bg-blackLogo hover:bg-slate-700"/>
          </div>
      </div>
      
      <hr className="mx-2 border border-semiWhite border-opacity-20 my-6" />
      
      <div className="flex items-end gap-1 justify-end mr-8 text-semiWhite">
        <span>REPERDOM </span>
        <span>© {new Date().getFullYear()}
        </span>
      </div>
    </footer>
    )
}