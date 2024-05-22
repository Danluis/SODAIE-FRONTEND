import { LuMenu } from "react-icons/lu";
import { IoHome } from "react-icons/io5";
import { MdOutlineExplore } from "react-icons/md";
import { MdLibraryMusic } from "react-icons/md";


export default function Navbar() {
    return(
      
      <div className={`mr-4 flex items-center justify-between min-h-[740px] h-max-height flex-col text-white mt-[9vh] pt-4 w-[6rem] border-r-2 border-r-white border-opacity-5`}>
       <div className="fixed">
        <div className="flex flex-col gap-4">
        <div className="flex items-center justify-center hover:bg-slate-600 p-2 rounded-full">
        <LuMenu className="  text-white w-6 h-6 cursor-pointer"/>
        </div>
          <div className="hover:bg-slate-600 flex flex-col items-center p-2 rounded-lg cursor-pointer">
            <IoHome className=" w-6 h-6"/>
            <span>Inicio</span>
          </div>
          <div className="hover:bg-slate-600 flex flex-col items-center p-2 rounded-lg cursor-pointer">
            <MdOutlineExplore className=" w-6 h-6"/>
            <span>Explorar</span>
          </div>
          <div className="hover:bg-slate-600 flex flex-col items-center p-2 rounded-lg cursor-pointer">
            <MdLibraryMusic className=" w-6 h-6"/>
            <span>Biblioteca</span>
          </div>
          </div>
          </div>
      </div>
    )
}