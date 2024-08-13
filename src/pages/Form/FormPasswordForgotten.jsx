import Header from "../../components/Home/Header";
import Footer from "../../components/Footer";
import Navbar from "../../components/Home/Navbar";
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from "../../store/authStore";

export default function FormPasswordForgotten() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { requestPasswordResetWithCode } = useAuth(); // Using the correct function from the context
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const {setForgottenPasswordResponse} = useAuthStore(state => state);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const response = await requestPasswordResetWithCode(data.email);
            setForgottenPasswordResponse(response);
            const token = response.resetToken; // Asegúrate de que esta propiedad existe en el response
            
            setMessage('Si el correo electrónico está registrado, recibirás instrucciones para restablecer tu contraseña a tu correo.');
            
            // Redirect to the next route with the token as a URL parameter
            setTimeout(() => {
                navigate(`/FormOTPInput?token=${token}`);
            }, 2000);
        } catch (error) {
            console.error('Error:', error);
            setMessage(error.message || 'Ocurrió un error');
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
