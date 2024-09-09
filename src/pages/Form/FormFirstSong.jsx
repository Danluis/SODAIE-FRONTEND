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
import { apiCreateSong } from "../../api/auth";

export default function FormFirstSong() {
    const methods = useForm();
    const { handleSubmit } = methods;
    const navigate = useNavigate();
    const [coverFile, setCoverFile] = useState(null);
    const [audioFile, setAudioFile] = useState(null);
    const [audioDuration, setAudioDuration] = useState(null);
    const [composers, setComposers] = useState(['']);
    const [etiquetas, setEtiquetas] = useState(['']);
    const [interpreters, setInterpreters] = useState(['']);
    
    const handleFileChange = async (e, setFile) => {
        const file = e.target.files[0];
        setFile(file);
    
        if (file && file.type.startsWith("audio/")) {
            try {
                console.log("Selected audio file:", file);
                const duration = await getAudioDuration(file);
                if (duration) {
                    setAudioDuration(duration);
                    console.log("Duration:", duration);  // Duración del audio en segundos
                } else {
                    console.error("Unable to retrieve audio duration.");
                }
            } catch (error) {
                console.error("Error getting audio duration:", error);
            }
        } else {
            console.error("The selected file is not an audio file.");
        }
    };
    
    const getAudioDuration = (file) => {
        return new Promise((resolve, reject) => {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const reader = new FileReader();
    
            reader.onload = function(event) {
                const arrayBuffer = event.target.result;
                audioContext.decodeAudioData(arrayBuffer, (audioBuffer) => {
                    if (audioBuffer && audioBuffer.duration) {
                        const durationInSeconds = audioBuffer.duration;
                        const minutes = Math.floor(durationInSeconds / 60);
                        const seconds = Math.floor(durationInSeconds % 60);
                        const formattedDuration = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
                        resolve(formattedDuration);
                    } else {
                        reject("Decoded audio buffer is invalid or duration is null.");
                    }
                }, (error) => {
                    reject("Error decoding audio data: " + error);
                });
            };
    
            reader.onerror = function(error) {
                reject("FileReader error: " + error);
            };
    
            if (file) {
                reader.readAsArrayBuffer(file);
            } else {
                reject("No file provided.");
            }
        });
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
        const fullPath = data.path;
        const { data: publicURLData, error: publicURLError } = await supabase
            .storage
            .from(bucket)
            .getPublicUrl(fullPath);

        if (publicURLError) {
            console.error("Error retrieving public URL:", publicURLError);
            return null;
        }

        return publicURLData.publicUrl;
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
            duration: audioDuration, // Agregar duración
            favorites: 100,
            registro_ONDA: values.registro_ONDA
        };

        try {
            console.log("Song Data:", song); // Información completa de la canción
            await apiCreateSong(song);
            navigate('/');
        } catch (error) {
            console.error("Error creating song:", error);
        }
    });

    const genres = [
        "MERENGUE", "BACHATA", "DEMBOW", "SALSA", "BOLERO", "BALADA", "DISCO",
        "MAMBO", "ROCK", "MERENGUE SON", "MERENHOUSE", "MERENGUE TIPICO",
        "POP", "POP ROCK LATINO", "RANCHERA", "REGGAE", "REGGAETON", "SON",
        "URBANO", "VALLENATO", "CRISTIANO", "JAZZ", "CUMBIA", "ACUSTICO",
        "FUSION", "OTRO"
    ];

    return (
        <div className="w-full h-full max-w-full-xl">
            <HeaderLogged />

        <div className="w-full h-full max-w-full-xl mx-auto bg-blackMain text-white p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row">
                <NavbarComposer />
                <main className="w-full h-full">
                    <section className="bg-blackMain p-6 sm:p-8 lg:p-10 w-full h-full">
                    <div className="mt-12 w-full h-full">
                    <div className="flex flex-col items-center justify-center text-center">
                            <h1 className="text-3xl font-semibold">Sube tu primera canción</h1>
                            <RiFolderMusicFill className="w-10 h-10 mt-4"/>
                    </div>
                        <FormProvider {...methods}>
                            <form onSubmit={onSubmit}>
                                <section className="mb-6">
                                    <h2 className="text-2xl mb-4">Composición</h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <FormInput name="title" text="Título" placeholder="Título de la canción"/>
                                        <ScrollMenu text={'Género'} placeholder={'Seleccione un género'} options={genres} name="gender" />
                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        <div className="flex flex-col gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-400 mb-2">Compositor o compositores</label>
                                                {composers.map((composer, index) => (
                                                    <div key={index} className="flex items-center mb-2">
                                                        <input
                                                            type="text"
                                                            className="w-full px-4 pl-7 py-3 rounded-lg bg-semiBlack text-white"
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
                                                            className="w-full px-4 pl-7 py-3 rounded-lg bg-semiBlack text-white"
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

                                        <div className="flex flex-col gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-400 mb-2">Intérprete o intérpretes</label>
                                                {interpreters.map((interpreter, index) => (
                                                    <div key={index} className="flex items-center mb-2">
                                                        <input
                                                            type="text"
                                                            className="w-full px-4 pl-7 py-3 rounded-lg bg-semiBlack text-white"
                                                            value={interpreter}
                                                            onChange={(e) => handleListChange(index, e.target.value, interpreters, setInterpreters)}
                                                            placeholder="Nombre de los intérpretes o quien canta"
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
                                            <FormInput name="registro_ONDA" text="Número de registro ONDA" placeholder="ONDA" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                                    <FormInput name="letter" text="Letra" placeholder="Escribe la letra de tu canción" textarea={true}/>



                                    </div>

                                    <div className="flex flex-col">
                                            <label className="block text-sm font-medium text-gray-400 mb-2">Portada</label>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="border-2 border-blue-500 p-4 w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-cyan-600 file:text-white hover:file:bg-cyan-700"
                                                onChange={(e) => handleFileChange(e, setCoverFile)}
                                            />
                                        </div>
                                    <div className="flex flex-col mt-6">
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Audio</label>
                                        <input
                                            type="file"
                                            accept="audio/*"
                                            className="border-2 border-blue-500 p-4 w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-cyan-600 file:text-white hover:file:bg-cyan-700"
                                            onChange={(e) => handleFileChange(e, setAudioFile)}
                                        />
                                    </div>
                                </section>

                                <Timeline paso1={'completed'} paso2={'completed'} paso3={'completed'} />

                                <div className="mt-6 flex justify-center">
                                    <button
                                        type="submit"
                                        className="px-6 py-3 rounded-lg bg-cyan-700 text-white hover:bg-cyan-600"
                                    >
                                        Guardar canción
                                    </button>
                                </div>
                            </form>
                        </FormProvider>
                        </div>
                        <div className="flex justify-center mt-4">
                            <Link to="/" className="text-cyan-700">Cancelar</Link>
                        </div>
                    </section>
                </main>
            </div>
            <Footer />
        </div>
        </div>
    );
}
