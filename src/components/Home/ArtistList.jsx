import ArtistCard from "./ArtistCard"
export default function ArtistList({title}) {
    return(
        <div className="flex flex-col">
            <div className="flex justify-between">
                <span className="text-2xl font-bold mb-4 text-white cursor-pointer hover:text-semiWhite">{title}</span>
            </div>

            <div className="flex gap-4 rounded-xl py-2">
            
                <ArtistCard img={'https://cdn.pixabay.com/photo/2016/11/22/23/45/acoustic-1851248_1280.jpg'} title={'TITULO'} artist={'NOMBRE'}/>
                <ArtistCard img={'https://cdn.pixabay.com/photo/2016/10/12/23/22/electric-guitar-1736291_1280.jpg'} title={'TITULO'} artist={'NOMBRE'}/>
                <ArtistCard img={'https://cdn.pixabay.com/photo/2018/05/13/16/19/saxophone-3397023_960_720.jpg'} title={'TITULO'} artist={'NOMBRE'}/>
                <ArtistCard img={'https://cdn.pixabay.com/photo/2016/05/07/21/20/music-1378224_1280.jpg'} title={'TITULO'} artist={'NOMBRE'}/>
                <ArtistCard img={'https://cdn.pixabay.com/photo/2022/09/17/21/20/music-7461855_1280.jpg'} title={'TITULO'} artist={'NOMBRE'}/>
            </div>
        </div>
    )
}