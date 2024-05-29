import Header from "../../components/Home/Header";
import Footer from "../../components/Footer";
import Navbar from "../../components/Home/Navbar";
import FormInput from "../../components/Form/FormInput";
import Timeline from "../../components/Form/Timeline";
import { Link } from "react-router-dom";

export default function FormGeneralInfo() {
    return (
        <div className="w-full h-full max-w-full-xl mt-2 bg-blackMain text-white">
            <Header />
            <div className="flex">
                <Navbar />
                <div className="w-full h-full">
                    <div className="bg-blackMain mr-2 p-8 object-cover w-full h-full">
                        <div className="flex gap-16 flex-col-2">
                            <div className="mt-10">
                                <div className="mb-6 text-3xl font-semibold">Informacion General</div>
                                <FormInput text={'Nombre'} placeholder={'Juan'}/>
                                <FormInput text={'Apellido'} placeholder={'Espaillat'}/>
                                <FormInput text={'Apodo'} placeholder={'El Chaval'}/>
                                <div className="flex justify-between gap-10 mt-6">
                                    <Link to={'/FormPersonalInfo'} className="text-center w-1/2 bg-cyan-700 text-white px-12 py-3 rounded-xl font-semibold transition-transform transform hover:scale-105">Siguiente</Link>
                                    <Link to={'/FormPersonalInfo'} className="text-center w-1/4 bg-semiBlack text-semiWhite px-4 py-3 rounded-xl font-semibold hover:bg-slate-900 transition-transform transform hover:scale-105">Omitir</Link>
                                </div>
                                <Timeline paso1={'completed'} paso2={'upcoming'} paso3={'upcoming'}/>

                            </div>
                            <div className="mt-10">
                                <img className="w-[100vw] h-[85vh] rounded-xl" src="https://i.pinimg.com/564x/28/72/aa/2872aa3196c9897ae773a6210000a229.jpg" alt="" />
                            </div>
                        </div>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    );
}
