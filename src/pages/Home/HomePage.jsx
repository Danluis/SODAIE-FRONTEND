import SideBarMenu from '../../components/SideBarMenu'

export default function HomePage(){
    return(
        <div className='flex flex-col-2 bg-black w-full h-screen'>
            <div className='p-2'>
                
                <SideBarMenu />

                <div>
                    Biblioteca
                </div>
            </div>

            <div className='text-white'>
                <h1>main</h1>
            </div>
        </div>
    )
}