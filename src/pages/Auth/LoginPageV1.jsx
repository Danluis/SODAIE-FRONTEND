// Importar dependencias necesarias
import Header from "../../components/Home/Header";
import Footer from "../../components/Footer";
import Navbar from "../../components/Home/Navbar";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Definir la función LoginPageV1
export default function LoginPageV1() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signin, isAuthenticated, user, errors: signinErrors } = useAuth();  // Obtener `user` del contexto de autenticación
    const navigate = useNavigate();

    // useEffect para redirigir al usuario basado en su autenticación y rol
    useEffect(() => {
        if (isAuthenticated) {
            if (user.roles === 'admin') {
                navigate('/AdminPage');
            } else {
                navigate('/');
            }
        }
    }, [isAuthenticated, user, navigate]);  // Incluir `user` y `navigate` en las dependencias

    // Función de manejo del formulario
    const onSubmit = handleSubmit(async (data) => {
        await signin(data);
    });

    const handleForgotPasswordClick = () => {
        navigate('/FormPasswordForgotten');
    };

    return (
        <div className="w-full h-full max-w-full-xl mt-2 bg-blackMain text-white">
            <Header />
            <div className="flex">
                <Navbar />
                <div className="w-full h-full">
                    <div className="bg-blackMain mr-2 p-8 w-full h-full">
                        <div className="mt-10 flex items-center justify-center mb-48">
                            <div className="flex items-center flex-col">
                                <span className="text-4xl mb-8">Iniciar Sesion</span>
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
                                <form onSubmit={onSubmit} className="w-full flex items-center flex-col">
                                    {signinErrors.map((error, i) => (
                                        <div className="w-[28rem] mb-2 bg-red-500 p-2 text-white" key={i}>
                                            {error}
                                        </div>
                                    ))}
                                    <div className="mb-4">
                                        <span className="block bg-transparent px-1 mb-1 text-sm font-semibold text-gray-400">
                                            Correo Electrónico
                                        </span>
                                        <input
                                            {...register('email', { required: true })}
                                            type="email"
                                            placeholder="usuario@gmail.com"
                                            className="w-[28rem] px-6 py-3 rounded-lg mt-1 bg-semiBlack border-blue-600 text-white"
                                        />
                                        {errors.email && (
                                            <p className="text-red-500">Email is required</p>
                                        )}
                                    </div>
                                    <div className="mb-4">
                                        <span className="block bg-transparent px-1 text-sm font-semibold text-gray-400">
                                            Contraseña
                                        </span>
                                        <input
                                            {...register('password', { required: true })}
                                            type="password"
                                            placeholder="**********"
                                            className="w-[28rem] px-6 py-3 rounded-lg mt-1 bg-semiBlack border-blue-600 text-white"
                                        />
                                        {errors.password && (
                                            <p className="text-red-500">Password is required</p>
                                        )}
                                    </div>
                                    <div className="w-[28rem] flex justify-between text-sm">
                                        <Link to={'/RegisterPageV1'} className="cursor-pointer hover:text-semiWhite">Registrarse</Link>
                                        <span className="cursor-pointer text-blue-600 hover:text-blue-700" onClick={handleForgotPasswordClick}>¿Olvidaste tu contraseña?</span>
                                    </div>
                                    <button className="w-[28rem] p-3 font-semibold bg-cyan-700 rounded-lg mt-4 transition-transform transform hover:scale-105">Iniciar Sesion</button>
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
