import ArtistCard from "./ArtistCard"
export default function ArtistList({title}) {
    return(
        <div className="flex flex-col">
            <div className="flex justify-between">
                <span className="text-2xl font-bold mb-4 text-white cursor-pointer hover:text-semiWhite">{title}</span>
            </div>

            <div className="flex gap-4 rounded-xl py-2">
            
                <ArtistCard img={'https://i.imgur.com/na8LePB.png'} title={'Como Yo'} artist={'Luis Segura'}/>
                <ArtistCard img={'https://i.imgur.com/rrsOjBD.png'} title={'La bilirrubina'} artist={'Juan Luis Guerra'}/>
                <ArtistCard img={'https://i.imgur.com/tkPSPeA.png'} title={'La Chiflera'} artist={'Fefita La Grande'}/>
                <ArtistCard img={'https://i.imgur.com/BvEOTeI.png'} title={'Si tu estuvieras'} artist={'El Torito'}/>
                <ArtistCard img={'https://i.imgur.com/UW32Y8f.png'} title={'Si tu estuvieras'} artist={'El Alfa'}/>
            </div>
        </div>
    )
}