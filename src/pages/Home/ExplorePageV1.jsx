import React, { useState, useEffect } from "react";
import Header from "../../components/Home/Header";
import Footer from "../../components/Footer";
import Navbar from "../../components/Home/Navbar";
import SelectedButton from "../../components/SelectedButton";
import SelectedButton2 from "../../components/SelectedButton2";
import { IoSearch } from "react-icons/io5";
import { apiGetSongs } from "../../api/auth"; // Importa la función para obtener canciones

export default function ExplorePageV1() {
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [title, setTitle] = useState("");
  const [filterOption, setFilterOption] = useState("");
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    // Obtener todas las canciones al cargar el componente
    const fetchSongs = async () => {
      try {
        const response = await apiGetSongs();
        setSongs(response.data);
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };
    fetchSongs();
  }, []);

  const handleSearch = () => {
    let filtered = songs;

    if (title) {
      filtered = filtered.filter((song) =>
        song.title.toLowerCase().trim().includes(title.toLowerCase().trim())
      );
    }

    if (filterValue) {
      filtered = filtered.filter(
        (song) =>
          song.composers.some((composer) =>
            composer
              .toLowerCase()
              .trim()
              .includes(filterValue.toLowerCase().trim())
          ) ||
          song.interpreters.some((interpreter) =>
            interpreter
              .toLowerCase()
              .trim()
              .includes(filterValue.toLowerCase().trim())
          )
      );
    }

    setFilteredSongs(filtered);
  };

  return (
    <div className="w-full h-full max-w-full-xl mt-2 bg-blackMain">
      <Header />
      <div className="flex flex-col-2">
        <Navbar />
        <div className="w-full h-full mt-[6rem]">
          <div className="bg-blackMain mr-2 p-8 w-full h-full text-white">
            <div className="flex flex-col items-center w-full h-full mt-4 gap-4 mb-96">
              {/* Título y botones de búsqueda */}
              <span className="text-2xl font-semibold mb-4">
                Encuentra a nuevos autores, compositores y arreglistas
              </span>
              <div className="flex gap-4">
                <SelectedButton
                  options={["Título"]}
                  selectedOption={title}
                  setSelectedOption={setTitle}
                />
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="outline-none text-black px-4 w-[20rem] h-[3rem]"
                  placeholder="Buscar por título"
                />
              </div>

              <div className="flex gap-4">
                <SelectedButton2
                  options={["Compositor", "Intérprete"]}
                  selectedOption={filterOption}
                  setSelectedOption={setFilterOption}
                />
                <input
                  type="text"
                  value={filterValue}
                  onChange={(e) => setFilterValue(e.target.value)}
                  className="outline-none text-black px-4 w-[20rem] h-[3rem]"
                  placeholder={`Buscar por ${filterOption.toLowerCase()}`}
                />
              </div>

              <button
                className="flex items-center justify-center gap-2 py-2 px-4 bg-secondaryBlack hover:bg-black w-[8rem] h-[3rem]"
                onClick={handleSearch}
              >
                <IoSearch className="w-[1rem] h-[1rem]" />
                <span className="text-lg">Buscar</span>
              </button>

              {/* Mostrar canciones filtradas */}
              <div className="mt-8 w-full">
                {filteredSongs.length > 0 ? (
                  <div className="overflow-x-auto mt-4">
                    <table className="min-w-full text-white">
                      <thead>
                        <tr>
                          <th className="px-4 py-2">Título</th>
                          <th className="px-4 py-2">Compositores</th>
                          <th className="px-4 py-2">Intérpretes</th>
                          <th className="px-4 py-2">Género</th>
                          <th className="px-4 py-2">Letra</th>
                          <th className="px-4 py-2">Registro ONDA</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredSongs.map((song, index) => (
                          <tr
                            key={index}
                            className="bg-gray-800 hover:bg-gray-700"
                          >
                            <td className="border px-4 py-2">{song.title}</td>
                            <td className="border px-4 py-2">
                              {song.composers.join(", ")}
                            </td>
                            <td className="border px-4 py-2">
                              {song.interpreters.join(", ")}
                            </td>
                            <td className="border px-4 py-2">{song.gender}</td>
                            <td className="border px-4 py-2">{song.letter}</td>
                            <td className="border px-4 py-2">
                              {song.registro_ONDA}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="mt-4 text-white">
                    No se encontraron canciones con los criterios de búsqueda.
                  </div>
                )}
              </div>
            </div>

            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
