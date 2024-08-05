import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import HeaderLogged from "../../components/Home/HeaderLogged";
import Footer from "../../components/Footer";
import NavbarComposer from "../../components/Home/NavbarComposer";
import FormInput from "../../components/Form/FormInput";
import ScrollMenu from "../../components/ScrollMenu";
import Timeline from "../../components/Form/Timeline";
import { RiFolderMusicFill } from "react-icons/ri";
import { supabase } from "../../supabase/supabaseClient";
import { apiCreateSong } from "../../api/auth"; // Asegúrate de ajustar la ruta según tu estructura de proyecto

export default function FormFirstSong() {
    const methods = useForm();
    const { handleSubmit } = methods;
    const navigate = useNavigate();
    const [coverFile, setCoverFile] = useState(null);
    const [audioFile, setAudioFile] = useState(null);
    const [composers, setComposers] = useState(['']);
    const [etiquetas, setEtiquetas] = useState(['']);
    const [interpreters, setInterpreters] = useState(['']);

    const handleFileChange = (e, setFile) => {
        setFile(e.target.files[0]);
    };

    const handleListChange = (index, value, list, setList) => {
        const newList = [...list];
        newList[index] = value;
        setList(newList);
    };

    const addToList = (list, setList) => {
        setList([...list, '']);
    };

    const removeFromList = (index, list, setList) => {
        const newList = list.filter((_, i) => i !== index);
        setList(newList);
    };

    const uploadFile = async (file, bucket) => {
        const { data, error } = await supabase.storage
            .from(bucket)
            .upload(`${Date.now()}_${file.name}`, file);

        if (error) {
            console.error("Error uploading file:", error);
            return null;
        }
        const fullPath = data.fullPath;
        const publicURL = await supabase.storage.from(bucket).url;
        const URL = `${publicURL}/object/public/${fullPath}`;
        return URL;
    };

    const onSubmit = handleSubmit(async (values) => {
        let coverURL = null;
        let audioURL = null;

        if (coverFile) {
            coverURL = await uploadFile(coverFile, "images");
        }

        if (audioFile) {
            audioURL = await uploadFile(audioFile, "audios");
        }

        const song = {
            ...values,
            composers,
            interpreters,
            gender: values.gender,
            etiquetas,
            cover: coverURL,
            letter: values.letter,
            likes: 100,
            audio: audioURL,
            favorites: 100,
            registro_ONDA: values.registro_ONDA
        };

        try {
            console.log(song);
            await apiCreateSong(song);
            navigate('/');
        } catch (error) {
            console.error("Error creating song:", error);
        }
    });

    const genres = [
        "MERENGUE", "BACHATA", "DEMBOW", "SALSA", "BOLERO", "BALADA", "DISCO",
        "MAMBO", "ROCK", "MERENGUE SON", "MERENHOUSE", "MERENGUE TIPICO",
        "POP", "POP ROCK LATINO", "RANCHERA", "REGGAE", "REGGEATON", "SON",
        "URBANO", "VALLENATO", "CRISTIANO", "JAZZ", "CUMBIA", "ACUSTICO",
        "FUSION", "OTRO"
    ];

    return (
        <div className="w-full h-full max-w-full-xl mt-2 bg-blackMain text-white">
            <HeaderLogged />
            <div className="flex">
                <NavbarComposer />
                <div className="w-full h-full">
                    <div className="bg-blackMain mr-2 p-8 object-cover w-full h-full">
                        <div className="mt-12 w-full h-full">
                            <div className="flex gap-2 items-center justify-center">
                                <h1 className="text-3xl font-semibold text-center">Sube tu primera canción</h1>
                                <RiFolderMusicFill className="w-10 h-10"/>
                            </div>
                            <FormProvider {...methods}>
                                <form onSubmit={onSubmit}>
                                    <div>
                                        <h1 className="text-2xl mt-6 mb-6">Composición</h1>
                                        <div className="flex justify-around">
                                            <FormInput name="title" text="Título" placeholder="Título de la canción"/>
                                            <ScrollMenu text={'Género'} placeholder={'Seleccione un género'} options={genres} name="gender" />
                                        </div>

                                        <div className="flex gap-6">
                                            <div className="flex flex-col gap-6 flex-grow ml-32">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-400 mb-2">Compositor o compositores</label>
                                                    {composers.map((composer, index) => (
                                                        <div key={index} className="flex items-center mb-2">
                                                            <input
                                                                type="text"
                                                                className="w-[28rem] px-4 pl-7 py-3 rounded-lg bg-semiBlack text-white"
                                                                value={composer}
                                                                onChange={(e) => handleListChange(index, e.target.value, composers, setComposers)}
                                                                placeholder="Nombre de los autores, compositores o arreglistas"
                                                            />
                                                            {index > 0 && (
                                                                <button
                                                                    type="button"
                                                                    className="ml-2 px-2 py-1 rounded bg-red-600 text-white"
                                                                    onClick={() => removeFromList(index, composers, setComposers)}
                                                                >
                                                                    -
                                                                </button>
                                                            )}
                                                        </div>
                                                    ))}
                                                    <button
                                                        type="button"
                                                        className="mt-2 px-4 py-2 rounded bg-cyan-700 text-white"
                                                        onClick={() => addToList(composers, setComposers)}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-400 mb-2">Etiquetas</label>
                                                    {etiquetas.map((etiqueta, index) => (
                                                        <div key={index} className="flex items-center mb-2">
                                                            <input
                                                                type="text"
                                                                className="w-[28rem] px-4 pl-7 py-3 rounded-lg bg-semiBlack text-white"
                                                                value={etiqueta}
                                                                onChange={(e) => handleListChange(index, e.target.value, etiquetas, setEtiquetas)}
                                                                placeholder="Ej: #salsa o #bachata"
                                                            />
                                                            {index > 0 && (
                                                                <button
                                                                    type="button"
                                                                    className="ml-2 px-2 py-1 rounded bg-red-600 text-white"
                                                                    onClick={() => removeFromList(index, etiquetas, setEtiquetas)}
                                                                >
                                                                    -
                                                                </button>
                                                            )}
                                                        </div>
                                                    ))}
                                                    <button
                                                        type="button"
                                                        className="mt-2 px-4 py-2 rounded bg-cyan-700 text-white"
                                                        onClick={() => addToList(etiquetas, setEtiquetas)}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-6 mr-32">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-400 mb-2">Intérpretes</label>
                                                    {interpreters.map((interpreter, index) => (
                                                        <div key={index} className="flex items-center mb-2">
                                                            <input
                                                                type="text"
                                                                className="w-[28rem] px-4 pl-7 py-3 rounded-lg bg-semiBlack text-white"
                                                                value={interpreter}
                                                                onChange={(e) => handleListChange(index, e.target.value, interpreters, setInterpreters)}
                                                                placeholder="Nombre de los intérpretes"
                                                            />
                                                            {index > 0 && (
                                                                <button
                                                                    type="button"
                                                                    className="ml-2 px-2 py-1 rounded bg-red-600 text-white"
                                                                    onClick={() => removeFromList(index, interpreters, setInterpreters)}
                                                                >
                                                                    -
                                                                </button>
                                                            )}
                                                        </div>
                                                    ))}
                                                    <button
                                                        type="button"
                                                        className="mt-2 px-4 py-2 rounded bg-cyan-700 text-white"
                                                        onClick={() => addToList(interpreters, setInterpreters)}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                                <FormInput name="registro_ONDA" text={'Registro del Número del Onda'} placeholder={'Ej: #500/07/2024'} />
                                            </div>
                                        </div>

                                        <div className="w-[63rem]">
                                            <h1 className="text-2xl mt-6 mb-6">Letra</h1>
                                            <textarea
                                                name="letter"
                                                placeholder="Escriba la letra aquí..."
                                                className="w-full h-32 ml-10 px-6 py-3 bg-semiBlack border-blue-600 text-white p-2 rounded mt-2"
                                                {...methods.register('letter')}
                                            ></textarea>
                                        </div>
                                    </div>
                                    <div>
                                        <h1 className="text-2xl mt-6 mb-6">Subir archivos</h1>
                                        <div className="flex justify-around">
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-400 mb-2">Subir Portada</label>
                                                <input
                                                    type="file"
                                                    className="w-[28rem] px-6 py-3 rounded-lg bg-semiBlack text-white cursor-pointer"
                                                    onChange={(e) => handleFileChange(e, setCoverFile)}
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-400 mb-2">Subir Audio</label>
                                                <input
                                                    type="file"
                                                    className="w-[28rem] px-6 py-3 rounded-lg bg-semiBlack text-white cursor-pointer"
                                                    onChange={(e) => handleFileChange(e, setAudioFile)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-around">
                                        <Timeline paso1="completed" paso2="completed" paso3="completed" />
                                        <div className="flex mt-16">
                                            <Link to="/FormPersonalInfo" className="w-1/4 text-center bg-semiBlack text-semiWhite px-4 py-3 rounded-xl font-semibold hover:bg-slate-900 transition-transform transform hover:scale-105">Atrás</Link>&nbsp;&nbsp;&nbsp;&nbsp;
                                            <button to="/FormTermsCon" type="submit" className="mr-4 text-center w-1/2 bg-cyan-700 text-white px-12 py-3 rounded-xl font-semibold transition-transform transform hover:scale-105">
                                                Finalizar
                                            </button>
                                            <Link to="/FormTermsCon" className="text-center w-1/4 bg-semiBlack text-semiWhite px-4 py-3 rounded-xl font-semibold hover:bg-slate-900 transition-transform transform hover:scale-105">Omitir</Link>
                                        </div>
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
