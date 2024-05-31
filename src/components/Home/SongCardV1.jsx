import { FaPlay } from "react-icons/fa";

export default function SongCard({ img, title, artist }) {
    return (
        <div className="relative flex flex-col mb-16 h-min-height py-2 bg-transparent cursor-pointer p-3 rounded-lg hover:bg-gray-800 hover:shadow-lg">
            <img className="w-21 h-30 rounded-lg" src={img} alt={title} />
            <span className="text-white mt-2">{artist}</span>
            <span className="text-semiWhite text-sm">{title}</span>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="p-3 rounded-full bg-cyan-700 absolute right-4 bottom-16 transition-transform transform hover:scale-105">
                <FaPlay className="w-5 h-5 text-black " />

                </div>
            </div>
        </div>
    );
}
