import { useParams } from "react-router-dom"; // Importar useParams
import Header from "../../components/Home/Header";
import Footer from "../../components/Footer";
import Navbar from "../../components/Home/Navbar";
import FormInput from "../../components/Form/FormInput";
import ScrollMenu from "../../components/ScrollMenu";
import { updateUserRequest } from "../../api/auth";
import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";

export default function EditPerfil() {
  const { userId } = useParams(); // Obtener el userId dinámicamente
  const methods = useForm();
  const { handleSubmit } = methods;
  const navigate = useNavigate();
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (redirect) navigate(`/ComposerPerfil/${userId}`); // Redirigir a la página del perfil con el userId
  }, [redirect, navigate, userId]);

  const onSubmit = handleSubmit(async (values) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const updatedUser = {
        ...user,
        ...values,
      };

      try {
        await updateUserRequest(user.credentials_id, updatedUser);
        // Actualizar el localStorage con los datos actualizados
        localStorage.setItem("user", JSON.stringify(updatedUser));
        // Establecer el estado de redirección
        setRedirect(true);
      } catch (error) {
        console.error(
          "Error actualizando los datos del usuario: ",
          error.response ? error.response.data : error.message
        );
      }
    } else {
      console.error("No se encontró ningún usuario");
    }
  });

  const instruments = [
    "Guitarra",
    "Violín",
    "Viola",
    "Violonchelo",
    "Contrabajo",
    "Arpa",
    "Laúd",
    "Mandolina",
    "Banjo",
    "Ukulele",
    "Cítara",
    "Balalaica",
    "Clavecín",
    "Flauta",
    "Flautín",
    "Clarinete",
    "Oboe",
    "Fagot",
    "Contrafagot",
    "Saxofón alto",
    "Saxofón tenor",
    "Saxofón soprano",
    "Saxofón barítono",
    "Corno inglés",
    "Duduk",
    "Ocarina",
    "Quena",
    "Trompeta",
    "Trombón",
    "Tuba",
    "Corno francés",
    "Flicorno",
    "Trompa",
    "Batería",
    "Timbal",
    "Xilófono",
    "Marimba",
    "Vibráfono",
    "Caja",
    "Platillos",
    "Bongos",
    "Conga",
    "Darbuka",
    "Pandereta",
    "Djembe",
    "Piano",
    "Teclado",
    "Órgano",
    "Clave",
    "Acordeón",
    "Sintetizador",
    "Sitar",
    "Tambura",
    "Shamisen",
    "Koto",
    "Erhu",
    "Dulcémele",
    "Charango",
    "Bandoneón",
    "Maracas",
    "Cuatro",
    "Zampoña",
    "Kalimba",
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
                <form onSubmit={onSubmit} className="mt-10 w-full max-w-2xl">
                  <div className="ml-56 mb-6 text-3xl font-semibold">
                    Edición del Perfil
                  </div>
                  <FormInput
                    name="nickname"
                    text="Apodo"
                    placeholder="Apodo"
                    className="w-full"
                  />
                  <ScrollMenu
                    text="Instrumento"
                    placeholder="Seleccione un Instrumento"
                    options={instruments}
                    name="instruments"
                    className="w-full"
                  />
                  <FormInput
                    name="phone"
                    text="Teléfono"
                    placeholder="Número de teléfono"
                    className="w-full"
                  />
                  <div className="mt-4">
                    <label htmlFor="bio" className="block text-sm font-medium">
                      Biografía
                    </label>
                    <textarea
                      name="biografia"
                      rows="4"
                      className="w-full p-2 bg-gray-600 text-white rounded"
                      placeholder="Escriba su biografía..."
                      {...methods.register("biografia")} // Registrar el campo con react-hook-form
                    />
                  </div>
                  <div className="flex justify-between gap-10 mt-6">
                    <button
                      type="submit"
                      className="text-center w-full md:w-1/2 bg-cyan-700 text-white px-12 py-3 rounded-xl font-semibold transition-transform transform hover:scale-105"
                    >
                      Siguiente
                    </button>
                    <Link
                      to={`/ComposerPerfil/${userId}`} // Redirigir al perfil dinámicamente
                      className="text-center w-full md:w-1/4 bg-semiBlack text-semiWhite px-4 py-3 rounded-xl font-semibold hover:bg-slate-900 transition-transform transform hover:scale-105"
                    >
                      Cancelar
                    </Link>
                  </div>
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
