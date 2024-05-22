import { FaArrowRight } from "react-icons/fa";


export default function ShowMore() {
    return(
        <div className="flex items-center justify-center p-2 rounded-full h-28 w-28 ">
            <FaArrowRight className="w-14 h-14 hover:text-slate-800 cursor-pointer" />
        </div>
    )
}