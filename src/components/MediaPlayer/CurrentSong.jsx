import { Link } from "react-router-dom";

export const CurrentSong = ({ cover, title, composers, song_id }) => {
    return (
      <div className="flex items-center gap-5 relative overflow-hidden">
        <Link to={`/Artist/${song_id}`} className="w-16 h-16 bg-zinc-800 rounded-md shadow-lg overflow-hidden sm:block hidden">
          <img src={cover} alt={title} className="w-full h-full object-cover cursor-pointer" />
        </Link>
        <div className="text-white">
          <Link to={`/Artist/${song_id}`} className="sm:text-lg text-sm font-semibold hover:text-semiWhite">{title}</Link>
          <div className="text-gray-400 text-sm">{composers.join(', ')}</div>
        </div>
      </div>
    );
  };