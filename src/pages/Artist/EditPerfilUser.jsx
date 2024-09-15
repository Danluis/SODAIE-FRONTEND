import { useParams } from "react-router-dom";
import Header from "../../components/Home/Header";
import Footer from "../../components/Footer";
import Navbar from "../../components/Home/Navbar";
import FormInput from "../../components/Form/FormInput";
import ScrollMenu from "../../components/ScrollMenu";
import { updateUserRequest } from "../../api/auth";
import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../../supabase/supabaseClient"; // Import supabase

export default function EditPerfil() {
  const { userId } = useParams();
  const methods = useForm();
  const { handleSubmit, register } = methods;
  const navigate = useNavigate();
  const [redirect, setRedirect] = useState(false);
  const [bannerImage, setBannerImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    if (redirect) navigate(`/UserPerfil/${userId}`);
  }, [redirect, navigate, userId]);

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
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      let bannerURL = user.bannerImage;
      let profileURL = user.profileImage;

      // Subir banner si hay uno nuevo
      if (bannerImage) {
        bannerURL = await uploadFile(bannerImage, "images");
      }

      // Subir foto de perfil si hay una nueva
      if (profileImage) {
        profileURL = await uploadFile(profileImage, "images");
      }

      const updatedUser = {
        ...user,
        ...values,
        bannerImage: bannerURL,
        profileImage: profileURL,
      };

      try {
        await updateUserRequest(user.credentials_id, updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
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

  const handleImageChange = (e, setImage) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
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
