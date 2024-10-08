import { Link } from "react-router-dom";

export default function ArtistCard({ img, title, artist, user_id }) {
  return (
    <Link
      to={`/ComposerPerfil/${user_id}`}
      className="flex flex-col items-center mb-8 w-48 min-w-[150px] sm:min-w-[150px] md:min-w-[180px] md:min-h-[180px] max-w-xs py-4 rounded-lg transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer"
      role="button" // Cambiado a 'button' para mejorar la semántica de interacción
      aria-label={`Ver perfil de ${artist}`} // Mejora la accesibilidad
    >
      {/* Imagen del artista */}
      <img
        className="w-36 h-36 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full object-cover shadow-md"
        src={img}
        alt={`Foto de perfil de ${artist}`} // Texto alt más descriptivo
        loading="lazy"
      />

      {/* Nombre del artista */}
      <h2
        className="mt-4 text-sm sm:text-lg font-semibold text-white tracking-wide text-center"
      >
        {artist}
      </h2>

      {/* Descripción opcional */}
      {title && (
        <p className="mt-1 text-xs sm:text-sm text-gray-400 text-center">
          {title}
        </p>
      )}
    </Link>
  );
}
