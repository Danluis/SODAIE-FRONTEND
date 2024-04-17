import SideBarMenu from '../../components/SideBarMenu'
import SideBarPlaylist from '../../components/SideBarPlaylist'
import SodaieLogo from '../../assets/SODAIE.png'
import SelectedButton from '../../components/SelectedButton'
import Footer from '../../components/Footer'
import { IoSearch } from "react-icons/io5";
export default function SearchPage(){


    return(
        <div className='flex flex-col-2 bg-black w-full pb-4 h-full'>
           
            <div className='p-2 h-70vh'>
                <SideBarMenu />
                <SideBarPlaylist />
            </div>

            
            <div className='overflow-y-auto bg-blackMain my-2 mr-2 rounded-xl p-8 w-full h-95vh text-white'>

                <div className='flex flex-col items-center w-full h-full gap-4'>
                    <img className='w-72' src={SodaieLogo} alt="" />      
                    <span>Encuentra a nuevos artistas y compositores</span>         
                    
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
    )
}
