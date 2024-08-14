import { useEffect, useState } from 'react';
import { apiGetSongs } from "../../api/auth";

export default function LibrarySongCardList({ title, searchTerm }) {
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const response = await apiGetSongs();
                setSongs(response.data);
            } catch (error) {
                setError(error);
                console.error('Error fetching songs:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSongs();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    // Filtrar canciones según el término de búsqueda
    const filteredSongs = songs.filter((song) =>
        song.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="w-full">
            <h2 className="text-2xl font-bold mb-4 text-white">{title}</h2>
            <table className="w-full text-left text-semiWhite">
                <thead className="bg-secondaryBlack">
                    <tr>
                        <th className="px-4 py-2">Titulo</th>
                        <th className="px-4 py-2">Creador</th>
                        <th className="px-4 py-2">Duracion</th>
                        <th className="px-4 py-2">Acciones</th>
                    </tr>
                </thead>
                <tbody className="bg-blackMain">
                    {filteredSongs.map((song) => (
                        <tr key={song.song_id} className="border-t border-semiBlack hover:bg-secondaryBlack">
                            <td className="px-4 py-2">{song.title}</td>
                            <td className="px-4 py-2">{song.composers.join(', ')}</td>
                            <td className="px-4 py-2">{song.duration}</td>
                            <td className="px-4 py-2 flex space-x-2">
                                <button className="text-semiWhite hover:text-white">+</button>
                                <button className="text-semiWhite hover:text-white">♡</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
