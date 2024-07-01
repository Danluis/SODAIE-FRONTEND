import Header from "../../components/Home/Header"
import Footer from "../../components/Footer"
import Navbar from "../../components/Home/Navbar"
export default function Artist(){

    return (
        <div className=" w-full h-full max-w-full-xl mt-2 bg-blackMain">
                <Header/>


        <div className="flex flex-col-2">
                <Navbar/>

            <div className="w-full h-full">
                <div className='bg-blackMain mr-2 p-8 w-full h-full text-white mt-10'>
                <div class="w-full h-full max-w-full-xl mt-2 bg-blackMainmax-w-sm bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div class="p-6">
            <h1 class="text-2xl font-bold text-white mb-2">Canción</h1>
            <p class="text-sm text-gray-400 mb-4">Artistas o Compositores • Año de la canción</p>
            <div class="flex justify-between items-center mb-4">
                <button class="bg-cyan-500 text-white p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-6.406-3.692A1 1 0 007 8.414v7.172a1 1 0 001.346.936l6.406-3.692a1 1 0 000-1.732z" />
                    </svg>
                </button>
            </div>
            <div class="border-t border-gray-700 pt-2 mb-4">
                <div class="flex justify-between text-gray-400">
                    <span>Canción</span>
                    <span>Duración de la canción</span>
                </div>
            </div>
            <p class="text-xs text-gray-400 mb-2">Fecha de publicacion</p>
            <p class="text-xs text-gray-400">Sus derechos de autor</p>
        </div>
    </div>
                    <Footer/>
                </div>
            </div>

        </div>

        </div>

    )
}