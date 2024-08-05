import Header from "../../components/Home/Header"
import SongCardList from "../../components/Home/SongCardListV1"
import Footer from "../../components/Footer"
import Navbar from "../../components/Home/Navbar"
export default function Library(){

    return (
        <div className=" w-full h-full max-w-full-xl mt-2 bg-blackMain">
                <Header/>


        <div className="flex flex-col-2">
                <Navbar/>

            <div className="w-full h-full">
                <div className='bg-blackMain mr-2 p-8 w-full h-full text-white mt-10'>
                    <SongCardList title={'Escuchado recientemente'}/>
                    <SongCardList title={'Tus listas de reproduccion'}/>
                    <SongCardList title={'Canciones que te han gustado'}/>
                    <Footer/>
                </div>
            </div>

        </div>

        </div>

    )
}