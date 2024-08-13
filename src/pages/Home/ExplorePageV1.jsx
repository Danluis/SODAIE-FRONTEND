import Header from "../../components/Home/Header"
import Footer from "../../components/Footer"
import Navbar from "../../components/Home/Navbar"
import SelectedButton from '../../components/SelectedButton'
import SelectedButton2 from "../../components/SelectedButton2"
import { IoSearch } from "react-icons/io5";
import { AudioPlayer } from "./../../components/MediaPlayer/AudioPlayer";

export default function ExplorePageV1(){

    return (
        <div className=" w-full h-full max-w-full-xl mt-2 bg-blackMain">
                <Header/>


        <div className="flex flex-col-2">
                <Navbar />

            <div className="w-full h-full mt-[6rem]">
                <div className='bg-blackMain mr-2 p-8 w-full h-full text-white'>

                <div className="flex justify-center w-full">
                    
                </div>

                <div className='flex flex-col items-center w-full h-full mt-4 gap-4 mb-96'>
                    <span className='text-2xl font-semibold'>Encuentra a nuevos autores, compositores y arreglistas</span>
                    <span></span>         
                    
                    <div className='flex'>
                        <SelectedButton/>
                        <input type="text" className='outline-none text-black px-4 w-[20rem] h-[3rem] ' placeholder='' />
                    </div>

                    <div className='flex'>
                        <SelectedButton2/>
                        <input type="text" className='outline-none text-black px-4 w-[20rem] h-[3rem]' placeholder='' />
                    </div>
                    
                        <button className='flex items-center justify-center gap-2 py-2 px-4 bg-secondaryBlack hover:bg-black w-[8rem] h-[3rem]'>
                            <IoSearch className='w-[1rem] h-[1rem]'/>
                            <span className="text-lg">Buscar</span>
                        </button>
                </div>

                    <Footer/>
                </div>
            </div>

        </div>

        </div>

    )
}