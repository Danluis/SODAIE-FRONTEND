import HeaderLogged from "../../components/Home/HeaderLogged";
import Footer from "../../components/Footer";
import NavbarComposer from "../../components/Home/NavbarComposer";
import FormInput from "../../components/Form/FormInput";
import FormInputDesigner from "../../components/Form/FormInputDesigner";
import ScrollMenu from "../../components/ScrollMenu";
import Timeline from "../../components/Form/Timeline";
import { Link } from "react-router-dom";
import { RiFolderMusicFill } from "react-icons/ri";

export default function FormFirstSong() {
    const genres = [
        "Pop", "Rock", "Jazz", "Hip Hop", "Classical", "Electronic", "Reggae", 
        "Country", "Blues", "Latin", "Folk", "Disco", "Soul", "R&B", "Metal"
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
                            
                            <div>
                                <h1 className="text-2xl mt-6 mb-6">Composición</h1>
                                <div className="flex flex-wrap justify-around gap-6">
                                    <FormInputDesigner text={'Título'} placeholder={'Título de la canción'}/>
                                    <ScrollMenu text={'Género'} placeholder={'Seleccione un género'} options={genres} />  {/* Usar el nuevo componente */}
                                    <FormInputDesigner text={'Etiquetas'} placeholder={'Ej: #salsa o #bachata'}/>
                                    <FormInputDesigner text={'Compositor o compositores'} placeholder={'Nombre de los autores, compositores o arreglistas'}/>
                                    <FormInputDesigner text={'Intérpretes'} placeholder={'Nombre de los intérpretes'}/>
                                    <FormInputDesigner text={'Registro del Número del Onda'} placeholder={'Ej: #500/07/2024'}/>
                                </div>
                            </div>
                            
                            <div>
                                <h1 className="text-2xl mt-6 mb-6">Letra</h1>
                                <textarea placeholder="Escriba la letra aquí" className="w-full h-32 bg-semiBlack border-blue-600 text-white p-2 rounded mt-2"></textarea>
                            </div>

                            <div>
                                <h1 className="text-2xl mt-6 mb-6">Subir archivos</h1>
                                <div className="flex justify-around">
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Subir Portada</label>
                                        <input
                                            type="file"
                                            className="w-[28rem] px-6 py-3 rounded-lg bg-semiBlack text-white cursor-pointer"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Subir Audio</label>
                                        <input
                                            type="file"
                                            className="w-[28rem] px-6 py-3 rounded-lg bg-semiBlack text-white cursor-pointer "
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-around">
                                <Timeline paso1={'completed'} paso2={'completed'} paso3={'completed'} paso4={'upcoming'} />
                                <div className="mt-16">
                                    <Link to={'/FormPersonalInfo'} className="w-1/4 text-center bg-semiBlack text-semiWhite px-4 py-3 rounded-xl font-semibold hover:bg-slate-900 transition-transform transform hover:scale-105">Atrás</Link>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <Link to={'/'} className="mr-4 text-center w-1/2 bg-cyan-700 text-white px-12 py-3 rounded-xl font-semibold transition-transform transform hover:scale-105">Finalizar</Link>
                                    <Link to={'/'} className="text-center w-1/4 bg-semiBlack text-semiWhite px-4 py-3 rounded-xl font-semibold hover:bg-slate-900 transition-transform transform hover:scale-105">Omitir</Link>
                                </div>
                            </div>

                        </div>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    );
}
