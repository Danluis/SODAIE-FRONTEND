import { Link } from "react-router-dom"
import ButtonRegister from "./ButtonRegister"
import LoginButtonHeader from "./LoginButtonHeader"
import { CiSearch } from "react-icons/ci";

export default function HeaderUnlogged() {
  return (

  <header className="fixed top-0 z-10 max-w-full-xl flex flex-wrap w-full border-b-2 border-b-white border-opacity-5">
  <div className=" w-full bg-blackMain max-w-full-xl flex flex-wrap items-center justify-between mx-auto px-8 p-2">
    
    <Link to={'/'} className="flex items-center space-x-3 rtl:space-x-reverse">
        <span className="pl-12 self-center text-2xl font-semibold whitespace-nowrap dark:text-white">REPERDOM</span>
    </Link>

    <div className="flex items-center">
    <input type="text" className="rounded-l-3xl py-2 px-6 w-[500px] bg-blackMain border-solid border-2 border-slate-800 text-white outline-none" placeholder="Buscar" />

    <div className="rounded-r-3xl py-3 px-6 bg-slate-800 cursor-pointer">
    <CiSearch className="text-white text-xl w-5 h-5"/>

    </div>
    </div>

    <div>
        
        <ButtonRegister text={'Registrarse'}/>
        <LoginButtonHeader text={'Iniciar Sesión'}/>
    </div>

  </div>
  </header>
  )
}
