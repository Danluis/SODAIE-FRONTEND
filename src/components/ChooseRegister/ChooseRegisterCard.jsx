import { Link } from "react-router-dom"

export default function ChooseRegisterCard({img, NameUser, title, subTitle}){
    return(
        <div className="flex flex-col">
        <span className="text-2xl mb-4">Acceder como {NameUser}</span>
        <Link to={'/FormGeneralInfo'} className="flex bg-white gap-3 items-center w-[36vw] rounded-xl h-32 cursor-pointer transition-transform transform hover:scale-105">
            <img src={`${img}`} className="object-cover w-1/3 h-full"/>
            <div className="flex flex-col text-sm gap-2">
                <span className="text-xl text-cyan-700 font-semibold ">{title}</span>
                <span className="text-semiWhite">{subTitle}</span>
                <span className="text-black font-bold">Acceder como {NameUser}</span>
            </div>
        </Link>
    </div>
    )
}