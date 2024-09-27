import { useParams } from "react-router-dom";
import Header from "../../components/Home/Header";
import Footer from "../../components/Footer";
import Navbar from "../../components/Home/Navbar";
import FormInput from "../../components/Form/FormInput";
import ScrollMenu from "../../components/ScrollMenu";
import { updateUserRequest, apiGetUser } from "../../api/auth";
import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../../supabase/supabaseClient"; // Import supabase

export default function EditPerfil() {
  const { userId } = useParams();
  const methods = useForm();
  const { handleSubmit, register, setValue } = methods;
  const navigate = useNavigate();
  const [redirect, setRedirect] = useState(false);
  const [bannerImage, setBannerImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [socialNetwork, setSocialNetwork] = useState([""]);
  const [socialNetworkLink, setSocialNetworkLink] = useState([""]);

  useEffect(() => {
    if (redirect) navigate(`/UserPerfil/${userId}`);
  }, [redirect, navigate, userId]);

  useEffect(() => {
    // Obtener los datos del usuario desde la API
    const fetchUserData = async () => {
      try {
        const { data: user } = await apiGetUser(userId); // Llamada a la API para obtener el usuario
        if (user) {
          // Rellenar los campos con los valores obtenidos de la API
          setValue("nickname", user.nickname || ""); // Apodo
          setValue("phone", user.phone || ""); // Teléfono
          setValue("instruments", user.instruments || ""); // Instrumento
          setSocialNetwork(user.social_network_selected || [""]); // Redes sociales
          setSocialNetworkLink(user.social_network_link || [""]); // Links de redes sociales
        }
      } catch (error) {
        console.error("Error obteniendo los datos del usuario: ", error);
      }
    };

    fetchUserData();
  }, [setValue, userId]);

  const uploadFile = async (file, bucket) => {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(`${Date.now()}_${file.name}`, file);

    if (error) {
      console.error("Error uploading file:", error);
      return null;
    }

    const fullPath = data.path;
    const { data: publicURLData, error: publicURLError } =
      await supabase.storage.from(bucket).getPublicUrl(fullPath);

    if (publicURLError) {
      console.error("Error retrieving public URL:", publicURLError);
      return null;
    }

    return publicURLData.publicUrl;
  };

  const onSubmit = handleSubmit(async (values) => {
    try {
      const { data: user } = await apiGetUser(userId); // Volvemos a obtener el usuario para asegurarnos
      let bannerURL = user.bannerImage;
      let profileURL = user.profileImage;

      if (bannerImage) {
        bannerURL = await uploadFile(bannerImage, "images");
      }

      if (profileImage) {
        profileURL = await uploadFile(profileImage, "images");
      }

      const updatedUser = {
        ...user,
        ...values,
        bannerImage: bannerURL,
        profileImage: profileURL,
        social_network_selected: socialNetwork,
        social_network_link: socialNetworkLink,
      };

      await updateUserRequest(userId, updatedUser); // Asegúrate de pasar userId correcto
      setRedirect(true);
    } catch (error) {
      console.error(
        "Error actualizando los datos del usuario: ",
        error.response ? error.response.data : error.message
      );
    }
  });

  const handleImageChange = (e, setImage) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleListChange = (index, value, list, setList) => {
    const newList = [...list];
    newList[index] = value;
    setList(newList);
  };

  const addToList = (list, setList) => {
    setList([...list, ""]);
  };

  const removeFromList = (index, list, setList) => {
    const newList = list.filter((_, i) => i !== index);
    setList(newList);
  };

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
                  <FormInput
                    name="phone"
                    text="Teléfono"
                    placeholder="Número de teléfono"
                    className="w-full"
                  />

                  <div className="">
                    <label className="block bg-transparent px-1 mb-1 text-sm font-semibold text-gray-400">
                      Redes Sociales
                    </label>
                    {socialNetwork.map((socialNet, index) => (
                      <div key={index} className="flex gap-4 items-center mb-2">
                        <select
                          className="w-1/2 px-4 py-3 rounded-lg bg-semiBlack text-white"
                          value={socialNet}
                          onChange={(e) =>
                            handleListChange(
                              index,
                              e.target.value,
                              socialNetwork,
                              setSocialNetwork
                            )
                          }
                        >
                          <option value="">Selecciona una red social</option>
                          <option value="Facebook">Facebook</option>
                          <option value="Twitter">Twitter</option>
                          <option value="Instagram">Instagram</option>
                          <option value="Youtube">Youtube</option>
                          <option value="TikTok">TikTok</option>
                        </select>

                        <input
                          type="text"
                          className="w-1/2 px-4 pl-7 py-3 rounded-lg bg-semiBlack text-white"
                          value={socialNetworkLink[index]}
                          onChange={(e) =>
                            handleListChange(
                              index,
                              e.target.value,
                              socialNetworkLink,
                              setSocialNetworkLink
                            )
                          }
                          placeholder="Link de la red social"
                        />
                        {index > 0 && (
                          <button
                            type="button"
                            className="ml-2 px-2 py-1 rounded bg-red-600 text-white"
                            onClick={() => {
                              removeFromList(
                                index,
                                socialNetwork,
                                setSocialNetwork
                              );
                              removeFromList(
                                index,
                                socialNetworkLink,
                                setSocialNetworkLink
                              );
                            }}
                          >
                            -
                          </button>
                        )}
                      </div>
                    ))}

                    <button
                      type="button"
                      className="mt-2 px-4 py-2 rounded bg-cyan-700 text-white"
                      onClick={() =>
                        addToList(
                          socialNetwork,
                          setSocialNetwork,
                          socialNetworkLink,
                          setSocialNetworkLink
                        )
                      }
                    >
                      +
                    </button>
                  </div>

                  <div className="mt-4">
                    <label htmlFor="bio" className="block text-sm font-medium">
                      Biografía
                    </label>
                    <textarea
                      name="biografia"
                      rows="4"
                      className="w-full p-2 bg-semiBlack border-blue-600 text-white rounded"
                      placeholder="Escriba su biografía..."
                      {...methods.register("biografia")}
                    />
                  </div>
                  <div className="mt-4">
                    <label
                      htmlFor="bannerImage"
                      className="block text-sm font-medium"
                    >
                      Imagen de Banner
                    </label>
                    <input
                      type="file"
                      id="bannerImage"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, setBannerImage)}
                      className="border-2 border-blue-500 p-4 w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-cyan-600 file:text-white hover:file:bg-cyan-700"
                    />
                  </div>
                  <div className="mt-4">
                    <label
                      htmlFor="profileImage"
                      className="block text-sm font-medium"
                    >
                      Foto de Perfil
                    </label>
                    <input
                      type="file"
                      id="profileImage"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, setProfileImage)}
                      className="border-2 border-blue-500 p-4 w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-cyan-600 file:text-white hover:file:bg-cyan-700"
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
                      to={`/UserPerfil/${userId}`}
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
