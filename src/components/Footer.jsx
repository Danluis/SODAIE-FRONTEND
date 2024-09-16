import { FaInstagram, FaFacebookSquare, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="mt-36 w-full mb-12 px-4">
      <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-12">
        {/* Sección de Empresa */}
        <nav aria-label="Empresa" className="flex flex-col">
          <h2 className="text-white text-lg mb-2">Empresa</h2>
          <ul>
            <li>
              <a 
                href="#acerca" 
                className="text-semiWhite hover:text-white cursor-pointer text-lg"
              >
                Acerca de
              </a>
            </li>
            <li>
              <a 
                href="#nosotros" 
                className="text-semiWhite hover:text-white cursor-pointer text-lg"
              >
                Nosotros
              </a>
            </li>
          </ul>
        </nav>

        {/* Sección de Comunidades */}
        <nav aria-label="Comunidades" className="flex flex-col">
          <h2 className="text-white text-lg mb-2">Comunidades</h2>
          <ul>
            <li>
              <a 
                href="#artistas" 
                className="text-semiWhite hover:text-white cursor-pointer text-lg"
              >
                Artistas
              </a>
            </li>
          </ul>
        </nav>

        {/* Sección de Enlaces útiles */}
        <nav aria-label="Enlaces útiles" className="flex flex-col">
          <h2 className="text-white text-lg mb-2">Enlaces útiles</h2>
          <ul>
            <li>
              <a 
                href="#asistencia" 
                className="text-semiWhite hover:text-white cursor-pointer text-lg"
              >
                Asistencia
              </a>
            </li>
            <li>
              <a 
                href="#ayuda" 
                className="text-semiWhite hover:text-white cursor-pointer text-lg"
              >
                Ayuda
              </a>
            </li>
          </ul>
        </nav>

        {/* Sección de Contacto */}
        <nav aria-label="Contacto" className="flex flex-col">
          <h2 className="text-white text-lg mb-2">Contacto</h2>
          <ul>
            <li>
              <a 
                href="#direccion" 
                className="text-semiWhite hover:text-white cursor-pointer text-lg"
              >
                Dirección
              </a>
            </li>
          </ul>
        </nav>

        {/* Sección de Redes Sociales */}
        <div className="flex gap-2 mt-4 md:mt-0">
          <a href="https://instagram.com" aria-label="Instagram">
            <FaInstagram className="text-white w-10 h-10 p-2 rounded-full bg-blackLogo hover:bg-slate-700" />
          </a>
          <a href="https://facebook.com" aria-label="Facebook">
            <FaFacebookSquare className="text-white w-10 h-10 p-2 rounded-full bg-blackLogo hover:bg-slate-700" />
          </a>
          <a href="https://youtube.com" aria-label="YouTube">
            <FaYoutube className="text-white w-10 h-10 p-2 rounded-full bg-blackLogo hover:bg-slate-700" />
          </a>
        </div>
      </div>

      <hr className="border border-semiWhite border-opacity-20 my-6" />

      <div className="flex items-center justify-end text-semiWhite">
        <span className="text-lg">REPERDOM</span>
        <span className="ml-2 text-lg">© {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
