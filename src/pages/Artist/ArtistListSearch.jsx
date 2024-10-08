import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ArtistCard from '../../components/Home/ArtistCard';
import { apiGetComposers } from '../../api/auth';

export default function ArtistListSearch({ title = "Artistas Destacados", search }) {
  const [composers, setComposers] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error

  useEffect(() => {
    // Llamada a la API para obtener los compositores
    const fetchComposers = async () => {
      try {
        const response = await apiGetComposers();
        console.log(response.data); // Agregar esta línea para depuración
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

  // Mostrar en consola el valor de 'search' y los compositores antes de filtrar
  console.log("Valor de search:", search);
  console.log("Compositores antes de filtrar:", composers);

  // Filtrar compositores según el parámetro de búsqueda
  const filteredComposers = search
    ? composers.filter(composer => {
        // Verifica si el search está en nickname, name o lastname
        const lowerCaseSearch = search.toLowerCase();
        return (
          composer.nickname?.toLowerCase().includes(lowerCaseSearch) ||
          composer.name?.toLowerCase().includes(lowerCaseSearch) ||
          composer.lastname?.toLowerCase().includes(lowerCaseSearch)
        );
      })
    : composers;

  console.log("Compositores filtrados:", filteredComposers); // Comprobación después del filtrado

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
        ) : filteredComposers.length > 0 ? (
          filteredComposers.map((composer) => (
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
