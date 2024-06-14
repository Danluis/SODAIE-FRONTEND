import Header from "../../components/Home/Header";
import Footer from "../../components/Footer";
import Navbar from "../../components/Home/Navbar";
import FormInput from "../../components/Form/FormInput";
import Timeline from "../../components/Form/Timeline";
import { Link } from "react-router-dom";

export default function FormPersonalInfo() {
    return (
        <div className="w-full h-full max-w-full-xl mt-2 bg-blackMain text-white">
            <Header />
            <div className="flex">
                <Navbar />
                <div className="w-full h-full">
                    <div className="bg-blackMain mr-2 p-8 object-cover w-full h-full">
                        <div className="flex gap-16 flex-col-2 flex justify-center">
                            <div className="mt-10">
                                <div className="mb-6 text-3xl font-semibold">Información Personal</div>
                                <FormInput text={'Nacionalidad'} placeholder={''}/>
                                <FormInput text={'Teléfono'} placeholder={''}/>
                                <div className="flex justify-between gap-10 mt-6">
                                    <Link to={'/FormGeneralInfo'} className="w-1/4 text-center bg-semiBlack text-semiWhite px-4 py-3 rounded-xl font-semibold hover:bg-slate-900 transition-transform transform hover:scale-105">Atrás</Link>
                                    <Link to={'/FormFirstSong'} className="w-1/2 text-center bg-cyan-700 text-white px-12 py-3 rounded-xl font-semibold transition-transform transform hover:scale-105">Siguiente</Link>
                                    <Link to={'/'} className="w-1/4 text-center bg-semiBlack text-semiWhite px-4 py-3 rounded-xl font-semibold hover:bg-slate-900 transition-transform transform hover:scale-105">Omitir</Link>
                                </div>
                                <Timeline paso1={'completed'} paso2={'completed'} paso3={'upcoming'}/>

                            </div>
                        </div>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    );
}
