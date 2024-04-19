import { IoChevronForwardOutline } from "react-icons/io5";
import { IoChevronBackOutline } from "react-icons/io5";

import { IoNotificationsOutline } from "react-icons/io5";


import logoSodaie from '../assets/SODAIE.png'

export default function Header() {
    return(
        <div className="flex justify-between items-center">
                <div className="flex gap-2">
                    <IoChevronBackOutline className="bg-black text-white rounded-full p-2 w-10 h-10 cursor-pointer"/>
                    <IoChevronForwardOutline className="bg-black text-white rounded-full p-2 w-10 h-10 cursor-pointer"/>
                </div>

                <div>
                    <img className="w-52" src={logoSodaie} alt="" />
                </div>

                <div className="flex gap-2">
                    <IoNotificationsOutline className="bg-black text-semiWhite rounded-full p-2 w-10 h-10 transition-transform transform hover:scale-105 cursor-pointer hover:text-white"/>
                    <span className="inline-flex items-center justify-center w-10 h-10 bg-green-400 rounded-full cursor-pointer transition-transform transform hover:scale-105">
                        <span className="text-center text-black font-bold">D</span>
                    </span>
                </div>
        </div>
    )
}