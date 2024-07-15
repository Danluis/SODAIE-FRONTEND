import Header from "../../components/Home/Header";
import Footer from "../../components/Footer";
import Navbar from "../../components/Home/Navbar";
import ToggleSwitch from "../../components/Utilities/ToggleSwitch";
import { useState } from 'react';

export default function Artist() {
    const [currentPage, setCurrentPage] = useState('main'); // 'main' o 'alternate'

    const handleToggleClick = () => {
        setCurrentPage(currentPage === 'main' ? 'alternate' : 'main');
    };

    return (
        <div className="w-full h-full max-w-full-xl mt-2 bg-blackMain">
            <Header />

            <div className="flex">
                <Navbar />

                <div className="flex-1  p-8">
                    {/* Banner Section */}
                    <div className="w-full h-48 bg-gray-900 flex items-center justify-center mb-8">
                        <span className="text-white text-2xl">Banner Placeholder</span>
                    </div>
                    
                    {/* Sección de Perfil */}
                    <div className="bg-gray-700 p-6 rounded mt-8">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                                <div className="bg-gray-500 rounded-full h-12 w-12 mr-4"></div>
                                <button className="bg-gray-500 text-white px-4 py-1 rounded hover:bg-blue-500">
                                    Seguir
                                </button>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span>Cancion mas escuchada:</span>
                                <div className="bg-gray-500 h-12 w-12 inline-block"></div>
                            </div>
                        </div>
                        <div className="mb-4">
                            <span>Generos que toca:</span>
                            <span> etiquetas irian aqui</span>
                        </div>
                        <div className="mb-4">
                            <textarea 
                                className="w-1/2 h-32 bg-gray-600 text-white p-2 rounded mt-2" 
                                placeholder="Escriba su biografía aquí...">
                            </textarea>
                        </div>
                        <div className="mb-4">
                            <span>Composiciones:</span>
                            <div className="flex space-x-2">
                                <div className="bg-gray-500 h-12 w-12"></div>
                                <div className="bg-gray-500 h-12 w-12"></div>
                                <div className="bg-gray-500 h-12 w-12"></div>
                                <div className="bg-gray-500 h-12 w-12"></div>
                            </div>
                        </div>
                        <div>
                            <span>Estadisticas? (interrogacion significa que no se si lo ponemos o no)</span>
                        </div>
                    </div>

                    {/* Toggle Button */}
                    <div className="mt-8">
                        <ToggleSwitch onClick={handleToggleClick} />
                    </div>

                    {/* Conditionally Render Pages */}
                    {currentPage === 'main' ? (
                        <div className="text-white">compositor Page Content</div>
                    ) : (
                        <div className="text-white">usuario Page Content</div>
                    )}

                    <Footer />
                </div>
            </div>
        </div>
    );
}
