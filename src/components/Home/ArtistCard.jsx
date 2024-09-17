export default function ArtistCard({ img, title, artist }) {
    return (
      <div
        className="flex flex-col items-center mb-8 w-48 min-w-[120px] sm:min-w-[150px] md:min-w-[180px] max-w-xs py-4  rounded-lg transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer"
        role="group"
        aria-labelledby={`artist-${artist}`}
      >
        {/* Imagen del artista */}
        <img
          className="w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44 rounded-full object-cover shadow-md"
          src={img}
          alt={`Imagen de ${artist}`}
          loading="lazy"
        />
  
        {/* Título del artista */}
        <h2
          id={`artist-${artist}`}
          className="mt-4 text-sm sm:text-lg font-semibold text-white tracking-wide text-center"
        >
          {artist}
        </h2>
  
        {/* Descripción opcional o título del contenido */}
        {title && (
          <p className="mt-1 text-xs sm:text-sm text-gray-400 text-center">
            {title}
          </p>
        )}
      </div>
    );
  }
