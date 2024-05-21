export default function SongCard({img,title,artist}) {
    return(
        <div className="flex flex-col items-center mb-16 w-32 h-min-height py-2 bg-transparent transition-transform transform hover:scale-105 cursor-pointer">
            <img className="w-32 h-32 rounded-lg" src={img} alt={title} />
            <span className="text-white">{artist}</span>
            <span className="text-semiWhite text-sm">{title}</span>
        </div>
    )
}