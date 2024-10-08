import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ArtistCard from "./ArtistCard";
import { apiGetComposers } from '../../api/auth';

export default function ArtistList({ title = "Artistas Destacados" }) {
  const [composers, setComposers] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error

  useEffect(() => {
    // Llamada a la API para obtener los compositores
    const fetchComposers = async () => {
      try {
        const response = await apiGetComposers();
        if (Array.isArray(response.data)) {
          setComposers(response.data); // Setea el array de compositores
        } else {
          throw new Error('La propiedad data no es un array');
        }
      } catch (error) {
        console.error('Error fetching composers:', error);
        setError('Hubo un problema al cargar los compositores.');
      } finally {
        setLoading(false); // Desactiva el estado de carga
      }
    };

    fetchComposers();
  }, []);

  return (
    <div className="flex flex-col mt-4">
      <div className="flex justify-between">
        <Link to="/artists" className='mb-4'>
          <span className="text-2xl font-bold text-white cursor-pointer hover:text-semiWhite">
            {title}
          </span>
        </Link>
      </div>

      <div className="flex w-full justify-between gap-8 rounded-xl overflow-x-auto py-2 scrollbar-hidden">
        {loading ? (
          <p className="text-white">Cargando compositores...</p> // Mensaje de carga
        ) : error ? (
          <p className="text-red-500">{error}</p> // Muestra error si ocurre
        ) : composers.length > 0 ? (
          composers.map((composer) => (
            <ArtistCard
              key={composer.user_id}
              img={composer.userImageUrl || 'https://via.placeholder.com/150'} // Placeholder si no hay imagen
              artist={composer.nickname || 'Desconocido'} // Si no hay nickname, muestra 'Desconocido'
              user_id={composer.user_id}
            />
          ))
        ) : (
          <p className="text-white">No hay compositores disponibles.</p> // Mensaje si la lista está vacía
        )}
      </div>
    </div>
  );
}
