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
                        <div className="flex items-center justify-around">
                            <ChooseRegisterCard Icon={FaUserPlus} title={'Usuario de la música'} NameUser={'usuario'} subTitle={'Escucho o busco nuevos talentos.'} img={'https://cdn.pixabay.com/photo/2024/04/12/17/40/model-8692324_960_720.jpg'}/>
                            <ChooseRegisterCard Icon={FaUserEdit} title={'Creador de música'} NameUser={'creador'} subTitle={'Escribo, compongo, arreglo o administro música.'} img={'https://cdn.pixabay.com/photo/2024/04/17/16/33/ai-generated-8702438_960_720.png'}/>
                        </div>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    );
}
