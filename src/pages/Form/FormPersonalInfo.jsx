import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import Header from "../../components/Home/Header";
import Footer from "../../components/Footer";
import Navbar from "../../components/Home/Navbar";
import FormInput from "../../components/Form/FormInput";
import Timeline from "../../components/Form/Timeline";
import { updateUserRequest } from "../../api/auth";
import { validateCedulaRequest } from "../../api/jce/jce";
import { useAuth } from "../../context/AuthContext"; // Importa useAuth desde tu contexto

export default function FormPersonalInfo() {
    const methods = useForm();
    const { handleSubmit } = methods;
    const navigate = useNavigate();
    const [redirect, setRedirect] = useState(false);

    const {setErrors,errors: RegisterErrors } = useAuth() // Obtén errors y setErrors desde el contexto

    useEffect(() => {
        if (redirect) {
            navigate('/FormFirstSong');
        }
    }, [redirect, navigate]);

    const onSubmit = handleSubmit(async (values) => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            const updatedUser = {
                ...user,
                ...values
            };

            try {
                const response = await validateCedulaRequest(values.dni);
                console.log('Response from validateCedulaRequest:', response.data);

                if (response.data && response.data.valid) {
                    updatedUser.nationality = "Dominicano/a";
                    await updateUserRequest(user.credentials_id, updatedUser);
                    // Actualizar el localStorage con los datos actualizados
                    localStorage.setItem('user', JSON.stringify(updatedUser));
                    // Establecer el estado de redirección
                    setRedirect(true);
                } else {
                    setErrors(["Cédula o documento inválido"]);
                }
            } catch (error) {
                console.error('Error actualizando los datos del usuario:', error.response ? error.response.data : error.message);
                setErrors([error.response ? error.response.data.message : 'Error actualizando los datos del usuario']);
            }
        } else {
            console.error('No se encontró ningún usuario');
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
                                    <div className="mb-6 text-3xl font-semibold">Información Personal</div>  
                                {
                                    RegisterErrors.map((error,i) => (
                                        <div className="w-[28rem] mb-2 bg-red-500 p-2 text-white" key={i}>
                                            {error}
                                        </div>
                                    ))
                                }
                                    <FormInput
                                        name="dni"
                                        text="Cédula"
                                        placeholder="001-0000000-1"
                                    />
                                    <FormInput
                                        name="phone"
                                        text="Teléfono"
                                        placeholder="854-456-7890"
                                    />

                                    <div className="flex justify-between gap-10 mt-6">
                                        <Link to="/FormGeneralInfo" className="w-1/4 text-center bg-semiBlack text-semiWhite px-4 py-3 rounded-xl font-semibold hover:bg-slate-900 transition-transform transform hover:scale-105">Atrás</Link>
                                        <button type="submit" className="w-1/2 text-center bg-cyan-700 text-white px-12 py-3 rounded-xl font-semibold transition-transform transform hover:scale-105">Siguiente</button>
                                        <Link to="/FormFirstSong" className="w-1/4 text-center bg-semiBlack text-semiWhite px-4 py-3 rounded-xl font-semibold hover:bg-slate-900 transition-transform transform hover:scale-105">Omitir</Link>
                                    </div>
                                    <Timeline paso1="completed" paso2="completed" paso3="upcoming" paso4="upcoming" />
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
