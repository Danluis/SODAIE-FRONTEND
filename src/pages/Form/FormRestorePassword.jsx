import Header from "../../components/Home/Header";
import Footer from "../../components/Footer";
import Navbar from "../../components/Home/Navbar";
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Asegúrate de importar el hook useAuth

export default function FormRestorePassword() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { updatePassword } = useAuth(); // Obtener la función updatePassword del contexto
    const [message, setMessage] = useState(''); // Estado para mensajes de error o éxito
    const [isLoading, setIsLoading] = useState(false); // Estado para el cargando
    const navigate = useNavigate(); // Inicializar useNavigate

    const onSubmit = async (data) => {
        if (data.newPassword !== data.confirmPassword) {
            setMessage('Las contraseñas no coinciden');
            return;
        }

        setIsLoading(true);
        try {
            await updatePassword(data.newPassword);
            setMessage('Contraseña actualizada con éxito');

            // Redirigir después de 2 segundos para permitir la lectura del mensaje
            setTimeout(() => {
                navigate('/LoginPageV1'); // Reemplaza con la ruta correcta para el inicio de sesión
            }, 2000); // 2000 milisegundos = 2 segundos
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
                                <span className="text-4xl mb-8">Restablezca su Contraseña</span>
                                <span className="text-2xl mb-8">Ingresa tu nueva contraseña</span>
                                <form onSubmit={handleSubmit(onSubmit)} className="w-full flex items-center flex-col">
                                    <div className="mb-4">
                                        <span className="block bg-transparent px-1 mb-1 text-sm font-semibold text-gray-400">
                                            Nueva Contraseña
                                        </span>
                                        <input
                                            {...register('newPassword', { required: true, minLength: 6 })}
                                            type="password"
                                            placeholder="**********"
                                            className="w-[28rem] px-6 py-3 rounded-lg mt-1 bg-semiBlack border-blue-600 text-white"
                                        />
                                        {errors.newPassword && (
                                            <p className="text-red-500">Nueva contraseña es requerida y debe tener al menos 6 caracteres</p>
                                        )}
                                    </div>
                                    <div className="mb-4">
                                        <span className="block bg-transparent px-1 mb-1 text-sm font-semibold text-gray-400">
                                            Confirmar Nueva Contraseña
                                        </span>
                                        <input
                                            {...register('confirmPassword', { required: true })}
                                            type="password"
                                            placeholder="**********"
                                            className="w-[28rem] px-6 py-3 rounded-lg mt-1 bg-semiBlack border-blue-600 text-white"
                                        />
                                        {errors.confirmPassword && (
                                            <p className="text-red-500">Confirmación de la nueva contraseña es requerida</p>
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
