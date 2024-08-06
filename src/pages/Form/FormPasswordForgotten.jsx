import Header from "../../components/Home/Header";
import Footer from "../../components/Footer";
import Navbar from "../../components/Home/Navbar";
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext'; // Asegúrate de importar el hook useAuth
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

export default function FormPasswordForgotten() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { checkEmail } = useAuth(); // Obtener la función checkEmail del contexto
    const [message, setMessage] = useState(''); // Estado para mensajes de error o éxito
    const [isLoading, setIsLoading] = useState(false); // Estado para el cargando
    const navigate = useNavigate(); // Inicializar useNavigate

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            await checkEmail(data.email);
            setMessage('Si el correo electrónico está registrado, recibirás instrucciones para restablecer tu contraseña.');
            
            // Redirigir después de 5 segundos para permitir la lectura del mensaje
            setTimeout(() => {
                navigate('/FormRestorePassword'); // Reemplaza con la ruta correcta para el formulario de restablecimiento de contraseña
            }, 5000); // 5000 milisegundos = 5 segundos
        } catch (error) {
            setMessage(error.response ? error.response.data.message : 'Ocurrió un error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full h-full max-w-full-xl mt-2 bg-blackMain text-white">
            <Header />
            <div className="flex">
                <Navbar />
                <div className="w-full h-full">
                    <div className="bg-blackMain mr-2 p-8 object-cover w-full h-full">
                        <div className="mt-10 flex items-center justify-center mb-48">
                            <div className="flex items-center flex-col">
                                <span className="text-4xl mb-8">Contraseña Olvidada</span>
                                <span className="text-2xl mb-8">Ingresa tu correo para restablecer tu contraseña</span>
                                <form onSubmit={handleSubmit(onSubmit)} className="w-full flex items-center flex-col">
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
                                    <button
                                        type="submit"
                                        className="w-[28rem] p-3 font-semibold bg-cyan-700 rounded-lg mt-4 transition-transform transform hover:scale-105"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? 'Enviando...' : 'Restablecer Contraseña'}
                                    </button>
                                    {message && <p className="mt-4 text-center">{message}</p>}
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
