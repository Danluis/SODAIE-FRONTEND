import Header from "../../components/Home/Header";
import Footer from "../../components/Footer";
import Navbar from "../../components/Home/Navbar";
import { Link } from "react-router-dom";

export default function RegisterPageV1() {
    return (
        <div className="w-full h-full max-w-full-xl mt-2 bg-blackMain text-white">
            <Header />
            <div className="flex">
                <Navbar />
                <div className="w-full h-full">
                    <div className="bg-blackMain mr-2 p-8 w-full h-full">
                        <div className="mt-10 flex items-center justify-center mb-48">
                            <div className="flex items-center flex-col">
                                <span className="text-4xl mb-10">Registrarse</span>
                                <div className="flex gap-4 mb-4">
                                    <button className="flex rounded-lg text-sm font-semibold px-10 py-3 hover:bg-slate-900 bg-semiBlack">
                                    <img className="w-5 h-5 mr-2" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg" />
                                        Registrarse con Google
                                    </button>
                                    <button className="flex text-sm rounded-lg font-semibold px-10 py-3 hover:bg-slate-900 bg-semiBlack">

                                    <img className="w-5 h-5 mr-2" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/facebook/facebook-original.svg" />
                                        Registrarse con Facebook
                                    </button>
                                </div>
                                <div className="flex items-center mb-4 pt-3 w-full">
                                    <hr className="flex-1 border-t border-gray-700 min-h-[1px]" />
                                    <span className="mx-4 text-gray-300">o</span>
                                    <hr className="flex-1 border-t border-gray-700 min-h-[1px]" />
                                </div>
                                <span className="text-2xl mb-8">Ingresa tu correo y contraseña</span>
                                <div className="w-full flex items-center flex-col">
                                    <div className="mb-4">
                                        <span className="block bg-transparent px-1 mb-1 text-sm font-semibold text-gray-400">
                                            Correo Electrónico
                                        </span>
                                        <input
                                            type="text"
                                            placeholder="usuario@gmail.com"
                                            className="w-[28rem] px-6 py-3 rounded-lg mt-1 bg-semiBlack border-blue-600 text-white"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <span className="block bg-transparent px-1 text-sm font-semibold text-gray-400">
                                            Contraseña
                                        </span>
                                        <input
                                            type="password"
                                            placeholder="**********"
                                            className="w-[28rem] px-6 py-3 rounded-lg mt-1 bg-semiBlack border-blue-600 text-white"
                                        />


                                    </div>
                                    <Link to={'/ChooseRegister'} className="w-[28rem] text-center p-4 font-semibold bg-cyan-700 rounded-lg mt-2 transition-transform transform hover:scale-105">Continuar</Link>

                                </div>

                                </div>
                        </div>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    );
}
