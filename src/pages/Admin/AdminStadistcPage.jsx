import Header from "../../components/Home/Header";
import Footer from "../../components/Footer";
import NavbarAdmin from "../../components/Home/NavbarAdmin";
import { FaTrash, FaDownload } from "react-icons/fa"; // Importa iconos para las acciones

export default function AdminStadisticPage() {
  return (
    <div className="min-h-screen flex flex-col bg-blackMain text-white">
      <Header />
      <div className="flex flex-1 flex-col lg:flex-row">
        <NavbarAdmin className="w-full lg:w-1/4 bg-gray-900" />
        <main className="w-full lg:w-3/4 p-8 flex flex-col gap-16 mt-16">
          {/* Contenedores de estadísticas */}
          <div className="flex flex-col lg:flex-row gap-16">
            {/* Sección de usuarios conectados */}
            <section className="bg-gray-800 p-8 rounded-lg shadow-lg flex-1">
              <h2 className="text-2xl font-bold mb-6">Connected Users</h2>
              <div className="overflow-x-auto">
                <table className="w-full table-auto text-lg">
                  <thead className="bg-gray-700 text-gray-300">
                    <tr>
                      <th className="px-6 py-4 text-left">Username</th>
                      <th className="px-6 py-4 text-left">Last Active</th>
                      <th className="px-6 py-4 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-200">
                    <tr className="border-t border-gray-700">
                      <td className="px-6 py-4">@johndoe</td>
                      <td className="px-6 py-4">2 minutes ago</td>
                      <td className="px-6 py-4">
                        <button className="text-red-500 hover:text-red-700">
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                    <tr className="border-t border-gray-700">
                      <td className="px-6 py-4">@janedoe</td>
                      <td className="px-6 py-4">10 minutes ago</td>
                      <td className="px-6 py-4">
                        <button className="text-red-500 hover:text-red-700">
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                    <tr className="border-t border-gray-700">
                      <td className="px-6 py-4">@bobsmith</td>
                      <td className="px-6 py-4">30 minutes ago</td>
                      <td className="px-6 py-4">
                        <button className="text-red-500 hover:text-red-700">
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                    {/* Agrega más usuarios */}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Sección de canciones subidas */}
            <section className="bg-gray-800 p-8 rounded-lg shadow-lg flex-1">
              <h2 className="text-2xl font-bold mb-6">Uploaded Songs</h2>
              <div className="overflow-x-auto">
                <table className="w-full table-auto text-lg">
                  <thead className="bg-gray-700 text-gray-300">
                    <tr>
                      <th className="px-6 py-4 text-left">Song</th>
                      <th className="px-6 py-4 text-left">Uploaded By</th>
                      <th className="px-6 py-4 text-left">Date</th>
                      <th className="px-6 py-4 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-200">
                    <tr className="border-t border-gray-700">
                      <td className="px-6 py-4">Summer Breeze</td>
                      <td className="px-6 py-4">@janedoe</td>
                      <td className="px-6 py-4">2023-05-15</td>
                      <td className="px-6 py-4 flex space-x-4">
                        <button className="text-blue-500 hover:text-blue-700">
                          <FaDownload />
                        </button>
                        <button className="text-red-500 hover:text-red-700">
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                    <tr className="border-t border-gray-700">
                      <td className="px-6 py-4">Moonlight Serenade</td>
                      <td className="px-6 py-4">@bobsmith</td>
                      <td className="px-6 py-4">2023-04-30</td>
                      <td className="px-6 py-4 flex space-x-4">
                        <button className="text-blue-500 hover:text-blue-700">
                          <FaDownload />
                        </button>
                        <button className="text-red-500 hover:text-red-700">
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                    <tr className="border-t border-gray-700">
                      <td className="px-6 py-4">Autumn Leaves</td>
                      <td className="px-6 py-4">@johndoe</td>
                      <td className="px-6 py-4">2023-03-20</td>
                      <td className="px-6 py-4 flex space-x-4">
                        <button className="text-blue-500 hover:text-blue-700">
                          <FaDownload />
                        </button>
                        <button className="text-red-500 hover:text-red-700">
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                    {/* Agrega más canciones */}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
