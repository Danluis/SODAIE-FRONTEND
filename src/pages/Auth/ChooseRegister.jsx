import Header from "../../components/Home/Header";
import Footer from "../../components/Footer";
import Navbar from "../../components/Home/Navbar";
import Slider from "../../components/Home/Slider";
import ChooseRegisterCard from "../../components/ChooseRegister/ChooseRegisterCard";
import { FaUserPlus } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";


export default function ChooseRegister() {
    return (
        <div className="w-full h-full max-w-full-xl mt-2 bg-blackMain text-white">
            <Header />
            <div className="flex">
                <Navbar />
                <div className="w-full h-full">
                    <div className="bg-blackMain mr-2 p-8 w-full h-full">
                        <Slider height="h-[40vh]"/>
                        <div className="flex items-center justify-around">
                            <ChooseRegisterCard Icon={FaUserPlus} title={'Usuario de la musica'} NameUser={'usuario'} subTitle={'Escucho o busco nuevos talentos.'} img={'https://i.imgur.com/NpV8qvu.jpg'}/>
                            <ChooseRegisterCard Icon={FaUserEdit} title={'Creador de musica'} NameUser={'artista'} subTitle={'Escribo, compongo o publico musica.'} img={'https://i.imgur.com/S4v8eUl.jpg'}/>
                        </div>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    );
}
