import { useEffect, useState, useRef } from 'react';
import { apiGetLibrary } from "../../api/auth"; // Cambiado a la función de API que obtiene la librería
import CardPlayButton from "../../components/MediaPlayer/CardPlayButton";

export default function LibraryPlaylistCardList({ title, searchTerm }) {
    const [playlists, setPlaylists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hoveredPlaylistId, setHoveredPlaylistId] = useState(null);
    const [menuVisible, setMenuVisible] = useState(null);
    const menuRef = useRef(null);
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user.credentials_id
    useEffect(() => {
        const fetchPlaylists = async () => {
            try {
                const response = await apiGetLibrary(userId);
                console.log('Fetched library:', response.data);

                if (response.data && response.data.Playlist_Libraries) {
                    const playlistData = response.data.Playlist_Libraries.map(pl => pl.Playlist);
                    setPlaylists(playlistData);
                } else {
                    console.error('Unexpected response format:', response.data);
                }
            } catch (error) {
                setError(error);
                console.error('Error fetching playlists:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPlaylists();
    }, [userId]);

    const toggleMenu = (playlistId, event) => {
        event.stopPropagation();
        setMenuVisible(playlistId === menuVisible ? null : playlistId);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const filteredPlaylists = playlists.filter((playlist) =>
        playlist.name.toLowerCase().includes(searchTerm || '')
    );

    return (
        <div className="w-full">
            <h2 className="text-2xl font-bold mb-6 text-white">{title}</h2>
            <table className="w-full text-left text-semiWhite mb-6">
                <thead className="bg-secondaryBlack">
                    <tr>
                        <th className="pl-8 pr-4 py-2">#</th>
                        <th className="px-4 py-2">Nombre</th>
                        <th className="px-4 py-2">Descripción</th>
                        <th className="px-4 py-2">Duracion</th>
                        <th className="px-4 py-2">Acciones</th>
                    </tr>
                </thead>
                <tbody className="bg-blackMain">
                    {filteredPlaylists.map((playlist, index) => (
                        <tr 
                            key={playlist.playlist_id} 
                            className="border-t border-semiBlack hover:bg-secondaryBlack"
                            onMouseEnter={() => setHoveredPlaylistId(playlist.playlist_id)} 
                            onMouseLeave={() => setHoveredPlaylistId(null)}
                        >
                            <td className="px-4 py-2">
                                <div className="relative w-full h-full flex justify-start items-center">
                                {hoveredPlaylistId === playlist.playlist_id ? (
                                <div className="absolute left-14 bottom-5">
                                    <CardPlayButton id={playlist.playlist_id} />
                                </div>
                                ) : (
                                    <div className="absolute left-4">
                                        {index + 1}
                                    </div>
                                )}
                                </div>
                            </td>
                            <td className="px-4 py-2 flex items-center gap-2 text-white font-semibold">
                                <div className="relative w-[3rem] h-[3rem]">
                                    <img 
                                        src={playlist.cover} 
                                        alt={playlist.name} 
                                        className="w-full h-full rounded-md object-cover" 
                                    />
                                </div>
                                {playlist.name}
                            </td>
                            <td className="px-4 py-2">{playlist.description || 'Sin descripción'}</td>
                            <td className="px-4 py-2">{playlist.duration}</td>
                            <td className="px-8 py-2 space-x-2">
                                <div className="relative inline-block" ref={menuRef}>
                                    <button 
                                        className="text-semiWhite hover:text-white text-2xl"
                                        onClick={(event) => toggleMenu(playlist.playlist_id, event)}
                                    >
                                        +
                                    </button>
                                    {menuVisible === playlist.playlist_id && (
                                        <div className="absolute right-0 mt-2 z-20 bg-semiBlack text-white rounded-md shadow-lg w-48">
                                            <ul className='flex flex-col items-center'>
                                                <li 
                                                    className="px-4 py-2 hover:bg-gray-900 cursor-pointer w-full"
                                                >
                                                    <span className='text-2xl mr-4'>+</span> Añadir a playlist
                                                </li>
                                                <hr className='w-full' />
                                                <div className='flex items-center justify-center'>
                                                    <li className="px-4 py-2 hover:bg-gray-900 cursor-pointer">Ver detalles</li>
                                                </div>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                                <button className="text-semiWhite hover:text-white text-xl">♡</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
