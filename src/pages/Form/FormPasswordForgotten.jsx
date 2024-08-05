import Header from "../../components/Home/Header";
import Footer from "../../components/Footer";
import Navbar from "../../components/Home/Navbar";
import FormInput from "../../components/Form/FormInput";
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

export default function FormPasswordForgotten() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        // Manejar el envío del formulario aquí
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
                                    <button className="w-[28rem] p-3 font-semibold bg-cyan-700 rounded-lg mt-4 transition-transform transform hover:scale-105">
                                        Restablecer Contraseña
                                    </button>
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
