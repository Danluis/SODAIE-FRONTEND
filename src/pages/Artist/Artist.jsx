import Header from "../../components/Home/Header"
import Footer from "../../components/Footer"
import Navbar from "../../components/Home/Navbar"
import CardPlayButton from "../../components/MediaPlayer/CardPlayButton"
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
            <p class="text-sm text-gray-400 mb-12">Artistas o Compositores • Año de la canción</p>
            <div class="flex justify-between items-center mb-4">
                <button class="relative top-16 z-20 left-14 ">
                    <CardPlayButton/>
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