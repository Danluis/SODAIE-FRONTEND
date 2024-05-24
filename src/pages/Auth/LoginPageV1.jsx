import Header from "../../components/Home/Header";
import Footer from "../../components/Footer";
import Navbar from "../../components/Home/Navbar";
import { Link } from "react-router-dom";
export default function LoginPageV1() {
    return (
        <div className="w-full h-full max-w-full-xl mt-2 bg-blackMain text-white">
            <Header />
            <div className="flex">
                <Navbar />
                <div className="w-full h-full">
                    <div className="bg-blackMain mr-2 p-8 w-full h-full">
                        <div className="mt-16 flex items-center justify-center mb-48">
                            <div className="flex items-center flex-col">
                                <span className="text-4xl mb-10">Iniciar Sesion</span>
                                <div className="flex gap-4 mb-4">
                                    <button className="flex rounded-lg text-sm font-semibold px-10 py-3 hover:bg-slate-900 bg-semiBlack">
                                    <img className="w-5 h-5 mr-2" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg" />
                                        Continuar con Google
                                    </button>
                                    <button className="flex text-sm rounded-lg font-semibold px-10 py-3 hover:bg-slate-900 bg-semiBlack">

                                    <img className="w-5 h-5 mr-2" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/facebook/facebook-original.svg" />
                                        Continuar con Facebook
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

                                    <div className="w-full flex justify-between mt-4 text-sm">
                                        <Link to={'/RegisterPageV1'} className="cursor-pointer hover:text-semiWhite">Registrarse</Link>
                                        <span className="cursor-pointer hover:text-blue-600">¿Olvidaste tu contraseña?</span>
                                    </div>
                                    <button className="w-[28rem] p-4 font-semibold bg-cyan-700 rounded-lg mt-4 transition-transform transform hover:scale-105">Iniciar Sesion</button>

                                    </div>
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
