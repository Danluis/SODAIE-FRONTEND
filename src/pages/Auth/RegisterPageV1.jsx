import Header from "../../components/Home/Header";
import Footer from "../../components/Footer";
import Navbar from "../../components/Home/Navbar";
import AuthGoogleRegister from "../../components/auth/AuthGoogleRegister";
import AuthFacebookRegister from "../../components/auth/AuthFacebookRegister";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function RegisterPageV1() {
    const {register, handleSubmit, formState:{ errors }} = useForm()
    const {signup, isRegister, errors: RegisterErrors } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (isRegister) navigate('/ChooseRegister')
    }, [isRegister])

    const onSubmit = handleSubmit(async (values)=> {
        signup(values)
    })

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
                                      <AuthGoogleRegister/>
                                    
                                    <AuthFacebookRegister/>
                                </div>
                                <div className="flex items-center mb-4 pt-3 w-full">
                                    <hr className="flex-1 border-t border-gray-700 min-h-[1px]" />
                                    <span className="mx-4 text-gray-300">o</span>
                                    <hr className="flex-1 border-t border-gray-700 min-h-[1px]" />
                                </div>
                                <span className="text-2xl mb-8">Ingresa tu correo y contraseña</span>
                                {
                                    RegisterErrors.map((error,i) => (
                                        <div className="w-[28rem] mb-2 bg-red-500 p-2 text-white" key={i}>
                                            {error}
                                        </div>
                                    ))
                                }
                                <form onSubmit={onSubmit} className="w-full flex items-center flex-col">
                                    <div className="mb-4">
                                        <span className="block bg-transparent px-1 mb-1 text-sm font-semibold text-gray-400">
                                            Correo Electrónico
                                        </span>
                                        <input
                                            {...register('email', {required: true})}
                                            type="email"
                                            placeholder="usuario@gmail.com"
                                            className="w-[28rem] px-6 py-3 rounded-lg mt-1 bg-semiBlack border-blue-600 text-white"
                                        />
                                        { 
                                        errors.email && (
                                            <p className="text-red-500">Email is required</p>
                                        )
                                        }
                                    </div>
                                    <div className="mb-4">
                                        <span className="block bg-transparent px-1 text-sm font-semibold text-gray-400">
                                            Contraseña
                                        </span>
                                        <input
                                            {...register('password', {required: true})}
                                            type="password"
                                            placeholder="**********"
                                            className="w-[28rem] px-6 py-3 rounded-lg mt-1 bg-semiBlack border-blue-600 text-white"
                                        />
                                        { 
                                        errors.password && (
                                            <p className="text-red-500">Password is required</p>
                                        )
                                        }

                                    </div>
                                    <button type="submit" className="w-[28rem] text-center p-4 font-semibold bg-cyan-700 rounded-lg mt-2 transition-transform transform hover:scale-105">Continuar</button>

                                </form>

                                </div>
                        </div>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    );
}
