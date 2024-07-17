import Header from "../../components/Home/Header";
import Footer from "../../components/Footer";
import Navbar from "../../components/Home/Navbar";
import FormInput from "../../components/Form/FormInput";
import Timeline from "../../components/Form/Timeline";
import { updateUserRequest } from "../../api/auth";
import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";

export default function FormGeneralInfo() {
    const methods = useForm();
    const { handleSubmit } = methods;
    const navigate = useNavigate();
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (redirect) navigate('/FormPersonalInfo');
    }, [redirect, navigate]);

    const onSubmit = handleSubmit(async (values) => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            const updatedUser = {
                ...user,
                ...values
            };

            try {
                await updateUserRequest(user.credentials_id, updatedUser);
                // Actualizar el localStorage con los datos actualizados
                localStorage.setItem('user', JSON.stringify(updatedUser));
                // Establecer el estado de redirección
                setRedirect(true);
            } catch (error) {
                console.error('Error actualizando los datos del usuario: ', error.response ? error.response.data : error.message);
            }
        } else {
            console.error('No se encontró ningun usuario');
        }
    });

    return (
        <div className="w-full h-full max-w-full-xl mt-2 bg-blackMain text-white">
            <Header />
            <div className="flex">
                <Navbar />
                <div className="w-full h-full">
                    <div className="bg-blackMain mr-2 p-8 object-cover w-full h-full">
                        <div className="flex gap-16 flex-col-2 justify-center">
                            <FormProvider {...methods}>
                                <form onSubmit={onSubmit} className="mt-10">
                                    <div className="mb-6 text-3xl font-semibold">Información General</div>
                                    <FormInput name="name" text="Nombre" placeholder="Nombre" />
                                    <FormInput name="lastName" text="Apellido" placeholder="Apellido" />
                                    <FormInput name="nickname" text="Apodo" placeholder="Apodo" />
                                    
                                    <div className="flex justify-between gap-10 mt-6">
                                        <button type="submit" className="text-center w-1/2 bg-cyan-700 text-white px-12 py-3 rounded-xl font-semibold transition-transform transform hover:scale-105">Siguiente</button>
                                        <Link to="/FormPersonalInfo" className="text-center w-1/4 bg-semiBlack text-semiWhite px-4 py-3 rounded-xl font-semibold hover:bg-slate-900 transition-transform transform hover:scale-105">Omitir</Link>
                                    </div>
                                    <Timeline paso1="completed" paso2="upcoming" paso3="upcoming" />
                                </form>
                            </FormProvider>
                        </div>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    );
}
