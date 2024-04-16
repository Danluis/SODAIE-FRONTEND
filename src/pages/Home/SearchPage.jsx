import SideBarMenu from '../../components/SideBarMenu'
import SideBarPlaylist from '../../components/SideBarPlaylist'
import SodaieLogo from '../../assets/SODAIE.png'
import ToggleButton from '../../components/ToggleButton'
export default function SearchPage(){


    return(
        <div className='flex flex-col-2 bg-black w-full h-screen'>
            <div className='p-2'>
                <SideBarMenu />
                <SideBarPlaylist />
            </div>

            <div className='bg-blackMain my-2 mr-2 rounded-xl p-8 gap-4 flex flex-col items-center w-full h-full text-white'>
                <img className='w-72' src={SodaieLogo} alt="" />      
                <span>Encuentra a nuevos artistas y compositores</span>         
                
                <div className='flex'>
                    <ToggleButton/>
                    <input type="text" className='text-black px-4 ' placeholder='Luis Segura' />
                </div>

                <div className='flex'>
                    <ToggleButton/>
                    <input type="text" className='text-black px-4' placeholder='Bruno Mars' />
                </div>
               
            </div>
        </div>
    )
}
