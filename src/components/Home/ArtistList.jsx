import ArtistCard from "./ArtistCard"
export default function ArtistList({title}) {
    return(
        <div className="flex flex-col">
            <div className="flex justify-between">
                <span className="text-2xl font-bold mb-4 text-white cursor-pointer hover:text-semiWhite">{title}</span>
            </div>

            <div className="flex gap-4 rounded-xl py-2">
            
                <ArtistCard img={'https://cdn.pixabay.com/photo/2021/08/20/17/48/man-6560971_960_720.jpg'} title={'TITULO'} artist={'NOMBRE'}/>
                <ArtistCard img={'https://cdn.pixabay.com/photo/2018/07/19/08/22/singer-3548070_1280.jpg'} title={'TITULO'} artist={'NOMBRE'}/>
                <ArtistCard img={'https://cdn.pixabay.com/photo/2020/05/24/08/40/city-5213062_1280.jpg'} title={'TITULO'} artist={'NOMBRE'}/>
                <ArtistCard img={'https://cdn.pixabay.com/photo/2023/05/23/23/33/trumpet-8013698_1280.jpg'} title={'TITULO'} artist={'NOMBRE'}/>
                <ArtistCard img={'https://cdn.pixabay.com/photo/2018/01/30/19/30/music-3119459_1280.jpg'} title={'TITULO'} artist={'NOMBRE'}/>
            </div>
        </div>
    )
}