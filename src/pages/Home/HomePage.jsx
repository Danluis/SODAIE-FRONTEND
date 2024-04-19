import SideBarMenu from '../../components/SideBarMenu'
import SideBarPlaylist from '../../components/SideBarPlaylist'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import logoSodaie from '../../assets/SODAIE.png'
import SongCardList from '../../components/SongCardList'
export default function HomePage(){

    return(
        <div className='flex flex-col-2 bg-black w-full pb-4 h-full'>
           
            <div className='p-2 h-70vh'>
                <SideBarMenu />
                <SideBarPlaylist />
            </div>

            
            <div className='overflow-y-auto bg-blackMain my-2 mr-2 rounded-xl p-8 w-full h-95vh text-white'>
                <Header logo={logoSodaie}/>
                <SongCardList title={'Escuchado recientemente'}/>
                <SongCardList title={'Subidas recientemente'}/>
                <SongCardList title={'Las mas escuchadas'}/>
                <SongCardList title={'Las mas votadas'}/>
                <SongCardList title={'Musica de Temporada'}/>
                <Footer/>
            </div>

        </div>
    )
}
