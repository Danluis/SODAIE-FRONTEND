export default function SongCard({img,title,artist}) {
    return(
        <div className="flex flex-col w-full h-min-height bg-transparent transition-transform transform hover:scale-105 cursor-pointer">
            <img className="w-40 h-40 rounded-xl" src={img} alt={title} />
            <span className="text-white text-lg">{title}</span>
            <span className="text-semiWhite text-sm">{artist}</span>
        </div>
    )
}