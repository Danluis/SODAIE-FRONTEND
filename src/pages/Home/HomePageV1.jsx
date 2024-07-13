import Header from "../../components/Home/Header"
import Slider from "../../components/Home/Slider"
import SongCardList from "../../components/Home/SongCardListV1"
import Footer from "../../components/Footer"
import Navbar from "../../components/Home/Navbar"
import ArtistList from "../../components/Home/ArtistList"
import { AudioPlayer } from "./../../components/MediaPlayer/AudioPlayer";

export default function HomePageV1(){

    return (
        <div className=" w-full h-full max-w-full-xl mt-2 bg-blackMain">
                <Header/>


        <div className="flex flex-col-2">
                <Navbar/>

            <div className="w-[90%] h-full">
                <div className='bg-blackMain mr-2 p-8 w-full h-full text-white'>
                <Slider/>
                    <ArtistList title={'Artistas mas Escuchados'}/>
                    <SongCardList title={'Escuchado recientemente'}/>
                    <SongCardList title={'Subidas recientemente'}/>
                    <SongCardList title={'Las mas votadas'}/>
                    <SongCardList title={'Musica de Temporada'}/>
                    <Footer/>
                    
                </div>
            </div>

        </div>

            <div className="bottom-0 fixed h-[5.5rem] w-full max-w-[80rem]">
                 <AudioPlayer />
            </div>

        </div>

    )
}