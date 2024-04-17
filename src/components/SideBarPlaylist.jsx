import { FaPlus } from "react-icons/fa6";
import { MdLibraryMusic } from "react-icons/md";
import NotificationGuide from "./NotificationGuide";

export default function SideBarPlaylist () {
    return(
        <div className="overflow-y-auto text-semiWhite flex item flex-col bg-blackMain rounded-xl w-72 h-full mt-2">
            
            
            <div className="flex items-center px-4 pt-4 pb-2 justify-between hover:text-white cursor-pointer">
                
                <div className="flex items-center">
                    <MdLibraryMusic className="w-5 h-5 mr-4"/> 
                    <span className="font-semibold text-lg">Tu Biblioteca</span>
                </div>
                
                <div>
                    <FaPlus className="w-5 h-5 mr-4"/> 
                </div>

            </div>

            <NotificationGuide title={'Crea tu primera lista'} message={'Es muy facil, y te echaremos una mano.'} buttonText={'Crear lista'} widthButton={'24'} />                
            <NotificationGuide title={'Crea tu primera lista'} message={'Es muy facil, y te echaremos una mano.'} buttonText={'Crear lista'} widthButton={'24'} />                


        </div>
    )
    
}