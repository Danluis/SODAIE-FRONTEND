import Header from "../../components/Home/Header";
import Footer from "../../components/Footer";
import NavbarAdmin from "../../components/Home/NavbarAdmin";

export default function AdminStadisticPage() {
  return (
    <div className="min-h-screen flex flex-col bg-blackMain text-white">
      <Header />
      <div className="flex flex-1 flex-col lg:flex-row">
        <NavbarAdmin className="w-full lg:w-1/4" />
        <div className="w-full lg:w-3/4 p-4 flex flex-col gap-6 mt-16">
          {/* Sección de usuarios conectados */}
          <div className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-2">Usuarios Conectados</h2>
            <ul className="list-disc list-inside">
              <li>Usuario 1</li>
              <li>Usuario 2</li>
              <li>Usuario 3</li>
              {/* Agrega más usuarios conectados */}
            </ul>
          </div>

          {/* Sección de usuarios desconectados */}
          <div className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-2">Usuarios Desconectados</h2>
            <ul className="list-disc list-inside">
              <li>Usuario A</li>
              <li>Usuario B</li>
              <li>Usuario C</li>
              {/* Agrega más usuarios desconectados */}
            </ul>
          </div>

          {/* Sección de canciones subidas */}
          <div className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-2">Canciones Subidas</h2>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left">Título</th>
                    <th className="px-4 py-2 text-left">Subido Por</th>
                    <th className="px-4 py-2 text-left">Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border px-4 py-2">Canción 1</td>
                    <td className="border px-4 py-2">Usuario X</td>
                    <td className="border px-4 py-2">01/09/2024</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2">Canción 2</td>
                    <td className="border px-4 py-2">Usuario Y</td>
                    <td className="border px-4 py-2">01/09/2024</td>
                  </tr>
                  {/* Agrega más canciones */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
