import SongCard from "./SongCardV1"
import ShowMore from "./ShowMore"
export default function SongCardList({title}) {
    return(
        <div className="flex flex-col">
            <div className="flex justify-between">
                <span className="text-2xl font-bold mb-4 text-white cursor-pointer hover:text-semiWhite">{title}</span>
            </div>

            <div className="flex gap-6 rounded-xl py-2">
            
                <SongCard img={'https://i.imgur.com/na8LePB.png'} title={'Como Yo'} artist={'Luis Segura'}/>
                <SongCard img={'https://i.imgur.com/rrsOjBD.png'} title={'La bilirrubina'} artist={'Juan Luis Guerra'}/>
                <SongCard img={'https://i.imgur.com/tkPSPeA.png'} title={'La Chiflera'} artist={'Fefita La Grande'}/>
                <SongCard img={'https://i.imgur.com/BvEOTeI.png'} title={'Si tu estuvieras'} artist={'El Torito'}/>
                <SongCard img={'https://i.imgur.com/UW32Y8f.png'} title={'Si tu estuvieras'} artist={'El Alfa'}/>
                <div className="relative top-10 right-8">
                <ShowMore/>

                </div>
                </div>
        </div>
    )
}