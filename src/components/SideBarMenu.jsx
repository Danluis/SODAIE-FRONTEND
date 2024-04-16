import { GoHome } from "react-icons/go";
import { IoSearch } from "react-icons/io5";

export default function SideBarMenu () {
    return(
        <div className="text-semiWhite flex item flex-col bg-blackMain rounded-xl w-72 h-28">
            
            
            <div className="flex items-center px-4 pt-4 hover:text-white cursor-pointer">
                <GoHome className="w-5 h-5 mr-4"/> 
                <span className="font-semibold text-lg">Inicio</span>
            </div>

            <div className="flex items-center p-4 hover:text-white cursor-pointer">
                <IoSearch className="w-5 h-5 mr-4"/> 
                <span className="font-semibold text-lg">Buscar</span>
            </div>
        </div>
    )
    
}