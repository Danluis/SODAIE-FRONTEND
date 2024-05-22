import Header from "../../components/Home/Header"
import Footer from "../../components/Footer"
import Navbar from "../../components/Home/Navbar"
import SelectedButton from '../../components/SelectedButton'
import { IoSearch } from "react-icons/io5";
import logoSodaie from '../../assets/SODAIE.png'
export default function ExplorePageV1(){

    return (
        <div className=" w-full h-full max-w-full-xl mt-2 bg-blackMain">
                <Header/>


        <div className="flex flex-col-2">
                <Navbar height={'[2210px]'} />

            <div className="w-full h-full mt-[10rem]">
                <div className='bg-blackMain mr-2 p-8 w-full h-full text-white'>

                <div className="flex items-center">
                    <img className="w-52" src={logoSodaie} alt="" />
                </div>

                <div className='flex flex-col items-center w-full h-full mt-4 gap-4'>
                    <span className='text-2xl font-semibold'>Encuentra a nuevos artistas y compositores</span>         
                    
                    <div className='flex'>
                        <SelectedButton/>
                        <input type="text" className='text-black px-4 ' placeholder='Luis Segura' />
                    </div>

                    <div className='flex'>
                        <SelectedButton/>
                        <input type="text" className='text-black px-4' placeholder='Bruno Mars' />
                    </div>
                    
                        <button className='flex items-center gap-2 py-2 px-4 bg-secondaryBlack hover:bg-black'>
                            <IoSearch className=''/>
                            <span>Buscar</span>
                        </button>
                </div>

                    <Footer/>
                </div>
            </div>

        </div>

        </div>

    )
}