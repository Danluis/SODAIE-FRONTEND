import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import Header from "../../components/Home/Header";
import Footer from "../../components/Footer";
import Navbar from "../../components/Home/Navbar";
import FormInput from "../../components/Form/FormInput";
import Timeline from "../../components/Form/Timeline";
import ScrollMenu from "../../components/ScrollMenu"; // Importa el componente ScrollMenu
import { updateUserRequest } from "../../api/auth";
import { useAuth } from "../../context/AuthContext"; // Importa useAuth desde tu contexto

export default function FormPersonalInfoUser() {
    const methods = useForm();
    const { handleSubmit } = methods;
    const navigate = useNavigate();
    const [redirect, setRedirect] = useState(false);

    const { setErrors, errors: RegisterErrors } = useAuth(); // Obtén errors y setErrors desde el contexto

    useEffect(() => {
        if (redirect) {
            navigate('/FormTermsCon');
        }
    }, [redirect, navigate]);

    const onSubmit = handleSubmit(async (values) => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            const updatedUser = {
                ...user,
                ...values,
                nationality: values.country // Asigna la nacionalidad basada en el país seleccionado
            };

            try {
                await updateUserRequest(user.credentials_id, updatedUser);
                // Actualizar el localStorage con los datos actualizados
                localStorage.setItem('user', JSON.stringify(updatedUser));
                // Establecer el estado de redirección
                setRedirect(true);
            } catch (error) {
                console.error('Error actualizando los datos del usuario:', error.response ? error.response.data : error.message);
                setErrors([error.response ? error.response.data.message : 'Error actualizando los datos del usuario']);
            }
        } else {
            console.error('No se encontró ningún usuario');
        }
    });

    const countries = [
        "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria",
        "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
        "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia",
        "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo (Congo-Brazzaville)", "Costa Rica",
        "Croatia", "Cuba", "Cyprus", "Czech Republic", "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor",
        "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland",
        "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea",
        "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq",
        "Ireland", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati",
        "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania",
        "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius",
        "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia",
        "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway",
        "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland",
        "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino",
        "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands",
        "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland",
        "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey",
        "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu",
        "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
    ];
    

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
                                    <ScrollMenu
                                        name="country"
                                        text="País"
                                        placeholder="Seleccione su país"
                                        options={countries}
                                    />
                                    <FormInput
                                        name="phone"
                                        text="Teléfono"
                                        placeholder="854-456-7890"
                                    />

                                    <div className="flex justify-between gap-10 mt-6">
                                        <Link to="/FormGeneralInfoUser" className="w-1/4 text-center bg-semiBlack text-semiWhite px-4 py-3 rounded-xl font-semibold hover:bg-slate-900 transition-transform transform hover:scale-105">Atrás</Link>
                                        <button type="submit" className="w-1/2 text-center bg-cyan-700 text-white px-12 py-3 rounded-xl font-semibold transition-transform transform hover:scale-105">Siguiente</button>
                                        <Link to="/FormTermsCon" className="w-1/4 text-center bg-semiBlack text-semiWhite px-4 py-3 rounded-xl font-semibold hover:bg-slate-900 transition-transform transform hover:scale-105">Omitir</Link>
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
