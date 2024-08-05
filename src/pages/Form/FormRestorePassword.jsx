import Header from "../../components/Home/Header";
import Footer from "../../components/Footer";
import Navbar from "../../components/Home/Navbar";
import FormInput from "../../components/Form/FormInput";

export default function FormRestorePassword(){
    return (
        <div className="w-full h-full max-w-full-xl mt-2 bg-blackMain text-white">
            <Header />
            <div className="flex">
                <Navbar />
                <div className="w-full h-full">
                    <div className="bg-blackMain mr-2 p-8 object-cover w-full h-full">
                        <div className="mt-10 flex items-center justify-center mb-48">
                            <div className="flex items-center flex-col">
                                <span className="text-4xl mb-8">Restablesca su Contraseña</span>
                                <div className="flex gap-4 mb-4">
                                    
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