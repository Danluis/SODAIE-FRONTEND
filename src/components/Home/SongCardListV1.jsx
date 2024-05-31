import SongCard from "./SongCardV1"
import ShowMore from "./ShowMore"
export default function SongCardList({title}) {
    return(
        <div className="flex flex-col">
            <div className="flex justify-between">
                <span className="text-2xl font-bold mb-4 text-white cursor-pointer hover:text-semiWhite">{title}</span>
            </div>

            <div className="flex gap-6 rounded-xl py-2">
            
                <SongCard img={'https://cdn.pixabay.com/photo/2022/08/21/21/24/colours-7402147_1280.jpg'} title={'TITULO'} artist={'NOMBRE'}/>
                <SongCard img={'https://cdn.pixabay.com/photo/2022/01/05/00/13/music-6916184_1280.jpg'} title={'TITULO'} artist={'NOMBRE'}/>
                <SongCard img={'https://cdn.pixabay.com/photo/2024/01/09/14/52/man-8497739_1280.jpg'} title={'TITULO'} artist={'NOMBRE'}/>
                <SongCard img={'https://cdn.pixabay.com/photo/2020/08/31/00/33/guitar-5531027_1280.jpg'} title={'TITULO'} artist={'NOMBRE'}/>
                <SongCard img={'https://cdn.pixabay.com/photo/2024/04/20/07/14/boy-8707989_1280.jpg'} title={'TITULO'} artist={'NOMBRE'}/>
                <div className="relative top-10 right-8">
                <ShowMore/>

                </div>
                </div>
        </div>
    )
}