export default function ArtistCard({img,title,artist}) {
    return(
        <div className="flex flex-col items-center mb-16 w-full h-min-height py-2 bg-transparent transition-transform transform hover:scale-105 cursor-pointer">
            <img className="w-39 h-39 rounded-full" src={img} alt={title} />
            <span className="text-white">{artist}</span>
        </div>
    )
}