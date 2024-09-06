import { useEffect, useState, useRef } from 'react';
import { apiGetSongs, apiGetSong, apiCreatePlaylists, apiCreateSongPlaylists, apiAddPlaylistToLibrary, apiGetLibrary } from "../../api/auth";
import CardPlayButton from "../../components/MediaPlayer/CardPlayButton";

export default function LibrarySongCardList({ title, searchTerm, id = '' }) {
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hoveredSongId, setHoveredSongId] = useState(null);
    const [menuVisible, setMenuVisible] = useState(null);
    const [playlists, setPlaylists] = useState([]);
    const menuRef = useRef(null);

    useEffect(() => {
        console.log("Recibido searchTerm en LibrarySongCardList:", searchTerm);

        const fetchSongs = async () => {
            try {
                if (id !== '') {
                    const response = await apiGetSong(id);
                    console.log('Fetched song:', response.data);
                    setSongs([response.data]);
                } else {
                    const response = await apiGetSongs();
                    console.log('Fetched songs:', response.data);

                    if (response.data && Array.isArray(response.data)) {
                        setSongs(response.data);
                    } else {
                        console.error('Unexpected response format:', response.data);
                    }
                }
            } catch (error) {
                setError(error);
                console.error('Error fetching songs:', error);
            } finally {
                setLoading(false);
            }
        };

        const fetchLibraryPlaylists = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                const response = await apiGetLibrary(user.credentials_id);
                console.log('Fetched library:', response.data);
                setPlaylists(response.data.Playlist_Libraries.map(lib => lib.Playlist));
            } catch (error) {
                console.error('Error fetching library:', error);
            }
        };

        fetchSongs();
        fetchLibraryPlaylists();
    }, [id]);

    const handleCreatePlaylist = async (song, event) => {
        event.stopPropagation();
    
        console.log('handleCreatePlaylist triggered', song);
        const user = JSON.parse(localStorage.getItem('user'));
        const newPlaylist = {
            name: song.title,
            cover: song.cover,
            public: false,
            user_id: user.credentials_id
        };
    
        try {
            const response = await apiCreatePlaylists(newPlaylist);
            console.log('API response (playlist creada):', response);
            const playlistId = response.data.playlist_id;
    
            const newSongPlaylist = {
                song_id: song.song_id,
                playlist_id: playlistId,
            };
            await apiCreateSongPlaylists(newSongPlaylist);
            console.log('API response (song-playlist creada):', newSongPlaylist);
    
            const playlistLibrary = {
                library_id: user.credentials_id,
                playlist_id: playlistId,
            };
            await apiAddPlaylistToLibrary(playlistLibrary);
            console.log('API response (playlist añadida a librería):', playlistLibrary);
    
            alert('Playlist creada y añadida a tu librería con éxito');
        } catch (error) {
            console.error('Error creando playlist o añadiéndola a la librería:', error);
            alert('Hubo un error al crear la playlist o añadirla a la librería');
        } finally {
            setMenuVisible(null);
        }
    };

    const handleAddSongToPlaylist = async (song, playlistId) => {
        try {
            const newSongPlaylist = {
                song_id: song.song_id,
                playlist_id: playlistId,
            };
            await apiCreateSongPlaylists(newSongPlaylist);
            console.log('API response (song-playlist añadida):', newSongPlaylist);
            alert('Canción añadida a la playlist con éxito');
        } catch (error) {
            console.error('Error añadiendo canción a la playlist:', error);
            alert('Hubo un error al añadir la canción a la playlist');
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
                                                <li 
                                                    className="px-4 py-2 hover:bg-gray-900 cursor-pointer w-full"
                                                    onClick={(event) => handleCreatePlaylist(song, event)}
                                                >
                                                    <span className='text-2xl mr-4'>+</span> Nueva playlist
                                                </li>
                                                <hr className='w-full' />
                                                {playlists.length > 0 ? (
                                                    playlists.map((playlist) => (
                                                        <li 
                                                            key={playlist.playlist_id} 
                                                            className="px-4 py-2 w-full text-center hover:bg-gray-900 cursor-pointer"
                                                            onClick={() => handleAddSongToPlaylist(song, playlist.playlist_id)}
                                                        >
                                                            {playlist.name}
                                                        </li>
                                                    ))
                                                ) : (
                                                    <div className='flex items-center justify-center'>
                                                        <li className="px-4 py-2 hover:bg-gray-900 cursor-pointer">Mi playlist</li>
                                                    </div>
                                                )}
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
