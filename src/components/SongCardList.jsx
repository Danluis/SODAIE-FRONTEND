import SongCard from "./SongCard"

export default function SongCardList({title}) {
    return(
        <div className="flex flex-col">
            <div className="flex justify-between my-6">
                <span className="text-2xl font-bold text-white cursor-pointer hover:text-semiWhite">{title}</span>
                <span className="text-semiWhite font-bold cursor-pointer text-sm hover:text-white">Mostrar todos</span>
            </div>

            <div className="flex gap-2">
            
                <SongCard img={''} title={'Como Yo'} artist={'Luis Segura'}/>
                <SongCard img={''} title={'La bilirrubina'} artist={'Juan Luis Guerra'}/>
                <SongCard img={''} title={'La Chiflera'} artist={'Fefita La Grande'}/>
                <SongCard img={''} title={'Si tu estuvieras'} artist={'El Torito'}/>
                <SongCard img={''} title={'Los Aparatos'} artist={'El Alfa'}/>
            
            </div>
        </div>
    )
}