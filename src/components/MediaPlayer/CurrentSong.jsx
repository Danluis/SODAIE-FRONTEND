export const CurrentSong = ({ cover, title, composers }) => {
    return (
      <div className="flex items-center gap-5 relative overflow-hidden">
        <div className="w-16 h-16 bg-zinc-800 rounded-md shadow-lg overflow-hidden">
          <img src={cover} alt={title} className="w-full h-full object-cover" />
        </div>
        <div className="text-white">
          <div className="text-lg font-semibold">{title}</div>
          <div className="text-gray-400 text-sm">{composers.join(', ')}</div>
        </div>
      </div>
    );
  };