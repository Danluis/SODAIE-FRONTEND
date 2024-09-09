import { useEffect, useState, useRef } from 'react';
import { 
    apiGetLibrary,
    apiAddSongToLibrary,
    apiRemoveSongFromLibrary
} from "../../api/auth";
import CardPlayButton from "../../components/MediaPlayer/CardPlayButton";

export default function LibrarySongsLiked({ title, searchTerm }) {
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hoveredSongId, setHoveredSongId] = useState(null);
    const [menuVisible, setMenuVisible] = useState(null);
    const [likedSongs, setLikedSongs] = useState([]);
    const menuRef = useRef(null);

    useEffect(() => {
        const fetchLibrarySongs = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                const response = await apiGetLibrary(user.credentials_id);
                console.log('Fetched library songs:', response.data);
                
                if (response.data && response.data.Song_Libraries) {
                    const librarySongs = response.data.Song_Libraries.map(songLib => songLib.Song);
                    setSongs(librarySongs);
                    setLikedSongs(librarySongs.map(song => song.song_id));
                }
            } catch (error) {
                setError(error);
                console.error('Error fetching library songs:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLibrarySongs();
    }, []);

    const handleToggleLikedSong = async (song) => {
        const user = JSON.parse(localStorage.getItem('user'));
        const isLiked = likedSongs.includes(song.song_id);
        
        try {
            if (isLiked) {
                await apiRemoveSongFromLibrary({ 
                    library_id: user.credentials_id, 
                    song_id: song.song_id 
                });
                console.log('Canción removida de liked songs:', song.song_id);
                setLikedSongs(likedSongs.filter(id => id !== song.song_id));
            } else {
                await apiAddSongToLibrary({ 
                    library_id: user.credentials_id, 
                    song_id: song.song_id 
                });
                console.log('Canción añadida a liked songs:', song.song_id);
                setLikedSongs([...likedSongs, song.song_id]);
            }
        } catch (error) {
            console.error('Error al gestionar liked songs:', error);
        }
    };

    const toggleMenu = (songId, event) => {
        event.stopPropagation();
        setMenuVisible(songId === menuVisible ? null : songId);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const filteredSongs = songs.filter((song) =>
        song.title.toLowerCase().includes(searchTerm || '')
    );

    console.log('Filtered songs based on searchTerm:', filteredSongs);

    return (
        <div className="w-full">
            <h2 className="text-2xl font-bold mb-6 text-white">{title}</h2>
            <table className="w-full text-left text-semiWhite mb-6">
                <thead className="bg-secondaryBlack">
                    <tr>
                        <th className="pl-8 pr-4 py-2">#</th>
                        <th className="px-4 py-2">Titulo</th>
                        <th className="px-4 py-2">Creador</th>
                        <th className="px-4 py-2">Duracion</th>
                        <th className="px-4 py-2">Acciones</th>
                    </tr>
                </thead>
                <tbody className="bg-blackMain">
                    {filteredSongs.map((song, index) => (
                        <tr 
                            key={song.song_id} 
                            className="border-t border-semiBlack hover:bg-secondaryBlack"
                            onMouseEnter={() => setHoveredSongId(song.song_id)} 
                            onMouseLeave={() => setHoveredSongId(null)}
                        >
                            <td className="px-4 py-2">
                                <div className="relative w-full h-full flex justify-start items-center">
                                    {hoveredSongId === song.song_id ? (
                                        <div className="absolute left-14 bottom-5">
                                            <CardPlayButton id={song.song_id} />
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
                                        src={song.cover} 
                                        alt={song.title} 
                                        className="w-full h-full rounded-md object-cover" 
                                    />
                                </div>
                                {song.title}
                            </td>
                            <td className="px-4 py-2">{song.composers.join(', ')}</td>
                            <td className="px-4 py-2">{song.duration}</td>
                            <td className="px-8 py-2 space-x-2">
                                <div className="relative inline-block" ref={menuRef}>
                                    <button 
                                        className="text-semiWhite hover:text-white text-2xl"
                                        onClick={(event) => toggleMenu(song.song_id, event)}
                                    >
                                        +
                                    </button>
                                    {menuVisible === song.song_id && (
                                        <div className="absolute right-0 mt-2 z-20 bg-semiBlack text-white rounded-md shadow-lg w-48">
                                            <ul className='flex flex-col items-center'>
                                                {/* Opciones del menú, por ejemplo: */}
                                                <li 
                                                    className='w-full hover:bg-primaryColor cursor-pointer p-2 text-center'
                                                    onClick={() => console.log('Añadir a playlist')}
                                                >
                                                    Añadir a playlist
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                                <button 
                                    className={`text-2xl ${likedSongs.includes(song.song_id) ? 'text-red-500' : 'text-gray-500'}`} 
                                    onClick={() => handleToggleLikedSong(song)}
                                >
                                    ♥
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
