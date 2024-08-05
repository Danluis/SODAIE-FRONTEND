import Header from "../../components/Home/Header";
import Footer from "../../components/Footer";
import Navbar from "../../components/Home/Navbar";
import { useForm } from 'react-hook-form';

export default function FormRestorePassword() {
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
                                <span className="text-4xl mb-8">Restablezca su Contraseña</span>
                                <span className="text-2xl mb-8">Ingresa tu nueva contraseña</span>
                                <form onSubmit={handleSubmit(onSubmit)} className="w-full flex items-center flex-col">
                                    <div className="mb-4">
                                        <span className="block bg-transparent px-1 mb-1 text-sm font-semibold text-gray-400">
                                            Nueva Contraseña
                                        </span>
                                        <input
                                            {...register('newPassword', { required: true })}
                                            type="password"
                                            placeholder="**********"
                                            className="w-[28rem] px-6 py-3 rounded-lg mt-1 bg-semiBlack border-blue-600 text-white"
                                        />
                                        {errors.newPassword && (
                                            <p className="text-red-500">Nueva contraseña es requerida</p>
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
