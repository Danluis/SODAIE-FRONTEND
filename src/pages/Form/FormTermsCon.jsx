import Header from "../../components/Home/Header"
import Footer from "../../components/Footer"
import Navbar from "../../components/Home/Navbar"
import { useState } from "react"

export default function FormTermsCon() {
    const [accepted, setAccepted] = useState(false);

    const handleCheckboxChange = () => {
        setAccepted(!accepted);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (accepted) {
            alert("Has aceptado los términos y condiciones.");
        } else {
            alert("Debes aceptar los términos y condiciones para continuar.");
        }
    };

    return (
        <div className="w-full h-full max-w-full-xl mt-2 bg-blackMain text-white">
            <Header />
            <div className="flex">
                <Navbar />
                <div className="w-full h-full">
                    <div className="bg-blackMain mr-2 p-8 object-cover w-full h-full">
                        <div className="mt-12 w-full h-full">
                            <div className="flex gap-2 items-center justify-center">
                                <h1 className="text-3xl font-semibold text-center">Términos y condiciones de uso</h1>
                            </div>
                            <div className="mt-8">
                                <form onSubmit={handleSubmit}>
                                    <div className="bg-gray-800 p-4 rounded-md">
                                        <textarea
                                            readOnly
                                            className="w-full h-64 p-4 bg-gray-900 text-white rounded-md"
                                            value={`TERMINOS Y CONDICIONES

1. Aceptación de Términos
Al acceder y utilizar este sitio web, aceptas estar sujeto a los siguientes términos y condiciones de uso. Si no estás de acuerdo con algún término o condición, no debes utilizar este sitio.

2. Uso del Sitio
Este sitio web está destinado únicamente para uso personal y no comercial. No puedes modificar, copiar, distribuir, transmitir, mostrar, realizar, reproducir, publicar, licenciar, crear trabajos derivados, transferir o vender ninguna información, software, productos o servicios obtenidos del sitio.

3. Propiedad Intelectual
Todo el contenido presente en este sitio, incluyendo pero no limitándose a texto, gráficos, logotipos, iconos de botones, imágenes, clips de audio, descargas digitales y compilaciones de datos, es propiedad de [Nombre de la Empresa] o de sus proveedores de contenido y está protegido por las leyes de derechos de autor internacionales.

4. Privacidad
Tu uso del sitio está sujeto a nuestra Política de Privacidad. Por favor, revisa nuestra Política de Privacidad, que también rige el sitio e informa a los usuarios sobre nuestras prácticas de recopilación de datos.

5. Enlaces a Terceros
Este sitio puede contener enlaces a otros sitios web operados por terceros. Estos enlaces se proporcionan únicamente para tu conveniencia. No controlamos estos sitios web y no somos responsables de su contenido ni de su política de privacidad.

6. Limitación de Responsabilidad
En ningún caso [Nombre de la Empresa] será responsable por daños directos, indirectos, incidentales, especiales o consecuentes que resulten del uso o de la imposibilidad de uso de este sitio.

7. Modificaciones de los Términos
[Nombre de la Empresa] se reserva el derecho de modificar estos términos y condiciones en cualquier momento. Es tu responsabilidad revisar estos términos periódicamente para estar informado de cualquier cambio.

8. Ley Aplicable
Estos términos y condiciones se regirán e interpretarán de acuerdo con las leyes de [País], sin dar efecto a ningún principio de conflictos de leyes.

Al aceptar estos términos y condiciones, confirmas que has leído y comprendido este acuerdo en su totalidad.`}
                                        />
                                    </div>
                                    <div className="mt-4 flex items-center">
                                        <input
                                            type="checkbox"
                                            id="terms"
                                            checked={accepted}
                                            onChange={handleCheckboxChange}
                                            className="mr-2"
                                        />
                                        <label htmlFor="terms" className="text-white">Acepto los términos y condiciones</label>
                                    </div>
                                    <div className="mt-4">
                                        <button
                                            type="submit"
                                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                                        >
                                            Enviar
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    );
}
