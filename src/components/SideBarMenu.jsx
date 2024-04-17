import { GoHome } from "react-icons/go";
import { IoSearch } from "react-icons/io5";
import SodaieLogo from '../assets/SODAIE.png'
import { Link } from "react-router-dom";
export default function SideBarMenu () {
    return(
        <div className="text-semiWhite flex item flex-col bg-blackMain rounded-xl w-72 h-min-height">
            
            <Link to={'/home'} className="flex items-center px-4 pt-4 hover:text-white cursor-pointer">
                <img className='w-36' src={SodaieLogo} alt="" />  
            </Link>
            
            <Link to={'/home'} className="flex items-center px-4 pt-4 hover:text-white cursor-pointer">
                <GoHome className="w-5 h-5 mr-4"/> 
                <span className="font-semibold text-lg">Inicio</span>
            </Link>

            <Link to={'/search'} className="flex items-center p-4 hover:text-white cursor-pointer">
                <IoSearch className="w-5 h-5 mr-4"/> 
                <span className="font-semibold text-lg">Buscar</span>
            </Link>
        </div>
    )
    
}