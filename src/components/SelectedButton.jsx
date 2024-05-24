import { useState } from 'react';

export default function SelectedButton() {

    const [selectedOption, setSelectedOption] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const options = ["Titulo", "Ejecutante", "Compositor o Escritor", "Disquera/Editora"];

    const handleSelect = (option) => {
        setSelectedOption(option);
        setMenuOpen(!menuOpen); // Cambia el estado de visibilidad del menú al hacer clic
    };

    return(
        <div className="relative">
            <button 
                onClick={() => setMenuOpen(!menuOpen)} // Cambia el estado de visibilidad del menú al hacer clic
                className="flex items-center px-4 py-2 text-sm font-medium text-white bg-secondaryBlack border border-gray-300 shadow-sm hover:bg-black focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100 w-[14rem] h-[3rem]" // Establece un ancho fijo de 32
                type="button" 
                aria-haspopup="true" 
                aria-expanded={menuOpen ? "true" : "false"} // Indica si el menú está abierto o cerrado
            >
                {selectedOption ? selectedOption : "Seleccionar"}
                <svg className={`-mr-1 ml-2 h-5 w-5 ${menuOpen ? "transform rotate-180" : ""}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.293 7.293a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L10 10.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4z" clipRule="evenodd" />
                </svg>
            </button>

            {menuOpen && ( // Renderiza el menú solo si está abierto
                <div className="absolute z-10 mt-1 w-56 bg-white shadow-lg rounded-md">
                    <ul className="py-1">
                        {options.map((option, index) => (
                            <li key={index}>
                                <button
                                    className={`${
                                        index > 0 ? "border-t border-gray-200" : ""
                                    } w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900`}
                                    onClick={() => handleSelect(option)}
                                >
                                    {option}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
