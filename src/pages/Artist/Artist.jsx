import Header from "../../components/Home/Header"
import Footer from "../../components/Footer"
import Navbar from "../../components/Home/Navbar"
import CardPlayButton from "../../components/MediaPlayer/CardPlayButton"
import { Link } from 'react-router-dom'; // Importar Link desde React Router
export default function Artist(){

    return (
        <div className=" w-full h-full max-w-full-xl mt-2 bg-blackMain">
                <Header/>


        <div className="flex flex-col-2">
                <Navbar/>

            <div className="w-full h-full">
                <div className='bg-blackMain mr-2 p-8 w-full h-full text-white mt-10'>
                <div className="w-full h-full max-w-full-xl mt-2 bg-blackMainmax-w-sm bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
            <h1 className="text-2xl font-bold text-white mb-2">Canción</h1>
            <p className="text-sm text-gray-400 mb-12">
                <Link to="/Perfil" className="hover:text-white">Artistas o Compositores</Link> • Año de la canción</p>
            <div className="flex justify-between items-center mb-4">
                <button className="relative z-20 left-14 -mt-20 ">
                    <CardPlayButton/>
                </button>
            </div>
            <div className="border-t border-gray-700 pt-2 mb-4">
                <div className="flex justify-between text-gray-400">
                    <span>Canción</span>
                    <span>Duración de la canción</span>
                </div>
            </div>
            <p className="text-xs text-gray-400 mb-2">Fecha de publicacion</p>
            <p className="text-xs text-gray-400">Sus derechos de autor</p>
        </div>
    </div>
                    <Footer/>
                </div>
            </div>

        </div>

        </div>

    )
}