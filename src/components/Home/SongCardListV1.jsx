import SongCard from "./SongCardV1"
import ShowMore from "./ShowMore"
export default function SongCardList({title}) {
    return(
        <div className="flex flex-col">
            <div className="flex justify-between">
                <span className="text-2xl font-bold mb-4 text-white cursor-pointer hover:text-semiWhite">{title}</span>
            </div>

            <div className="flex gap-6 rounded-xl py-2">
            
                <SongCard img={'https://cdn.pixabay.com/photo/2015/07/31/15/01/guitar-869217_1280.jpg'} title={'TITULO'} artist={'NOMBRE'}/>
                <SongCard img={'https://cdn.pixabay.com/photo/2016/03/26/22/36/man-1281642_1280.jpg'} title={'TITULO'} artist={'NOMBRE'}/>
                <SongCard img={'https://cdn.pixabay.com/photo/2017/11/12/16/45/people-2943124_1280.jpg'} title={'TITULO'} artist={'NOMBRE'}/>
                <SongCard img={'https://cdn.pixabay.com/photo/2016/11/19/21/05/bass-guitar-1841186_1280.jpg'} title={'TITULO'} artist={'NOMBRE'}/>
                <SongCard img={'https://cdn.pixabay.com/photo/2023/10/28/11/52/dj-8347229_1280.jpg'} title={'TITULO'} artist={'NOMBRE'}/>
                <div className="relative top-10 right-8">
                <ShowMore/>

                </div>
                </div>
        </div>
    )
}