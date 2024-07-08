import Header from "../../components/Home/Header"
import Footer from "../../components/Footer"
import Navbar from "../../components/Home/Navbar"
export default function ComposerPerfil(){

    return (
        <div className=" w-full h-full max-w-full-xl mt-2 bg-blackMain">
                <Header/>


        <div className="flex flex-col-2">
                <Navbar/>

            <div className="w-full h-full">
                <div className='bg-blackMain mr-2 p-8 w-full h-full text-white mt-10'>

                    <Footer/>
                </div>
            </div>

        </div>

        </div>

    )
}