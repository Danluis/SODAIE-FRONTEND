import { Link } from 'react-router-dom';
import ArtistCard from "./ArtistCard";
import { apiGetComposers } from '../../api/auth';

export default function ArtistList({ title }) {
  return (
    <div className="flex flex-col mt-4">
      <div className="flex justify-between">
        <Link to="/artists" className='mb-4'>
          <span className="text-2xl font-bold text-white cursor-pointer hover:text-semiWhite">
            {title}
          </span>
        </Link>
      </div>
      <div className="flex justify-between gap-8 rounded-xl overflow-x-auto py-2 scrollbar-hidden">
        <ArtistCard img={'https://cdn.pixabay.com/photo/2021/08/20/17/48/man-6560971_960_720.jpg'} artist={'NOMBRE'} />
        <ArtistCard img={'https://cdn.pixabay.com/photo/2018/07/19/08/22/singer-3548070_1280.jpg'} artist={'NOMBRE'} />
        <ArtistCard img={'https://cdn.pixabay.com/photo/2020/05/24/08/40/city-5213062_1280.jpg'} artist={'NOMBRE'} />
        <ArtistCard img={'https://cdn.pixabay.com/photo/2023/05/23/23/33/trumpet-8013698_1280.jpg'} artist={'NOMBRE'} />
        <ArtistCard img={'https://cdn.pixabay.com/photo/2018/01/30/19/30/music-3119459_1280.jpg'} artist={'NOMBRE'} />
      </div>
    </div>
  );
}
