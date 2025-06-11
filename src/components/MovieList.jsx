import PropTypes from 'prop-types';
import Moviecard from "./Moviecard";

const MovieList = ({ title, movies }) => {
  return (
    <div className="px-4 md:px-6 lg:px-8 mt-0 relative">
      <h1 className="text-lg md:text-2xl lg:text-3xl py-4 text-white font-semibold">{title}</h1>
      
      {/* Scrollable container with custom scrollbar */}
      <div className="relative group">
        <div className="flex overflow-x-scroll scrollbar-hide gap-4 pb-4">
          <div className="flex gap-4">
            {movies?.map((movie) => (
              <div key={movie.id} className="flex-none">
                <Moviecard 
                  posterPath={movie.poster_path}
                  title={movie.title}
                  overview={movie.overview}
                  releaseDate={movie.release_date}
                  voteAverage={movie.vote_average}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Gradient overlays for scroll indication */}
        <div className="absolute top-0 right-0 bottom-4 w-12 bg-gradient-to-l from-black to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="absolute top-0 left-0 bottom-4 w-12 bg-gradient-to-r from-black to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
        
      </div>

      {/* Optional scroll buttons for desktop */}
      <button 
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hidden md:group-hover:block transition-opacity opacity-0 group-hover:opacity-75 hover:opacity-100 z-10"
        onClick={() => {
          const container = document.getElementById('movie-scroll');
          container.scrollLeft -= container.offsetWidth / 2;
        }}
      >
        ←
      </button>
      <button 
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hidden md:group-hover:block transition-opacity opacity-0 group-hover:opacity-75 hover:opacity-100 z-10"
        onClick={() => {
          const container = document.getElementById('movie-scroll');
          container.scrollLeft += container.offsetWidth / 2;
        }}
      >
        →
      </button>

    </div>
  );
};

MovieList.propTypes = {
  title: PropTypes.string.isRequired,
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      poster_path: PropTypes.string,
      title: PropTypes.string,
      overview: PropTypes.string,
      release_date: PropTypes.string,
      vote_average: PropTypes.number
    })
  ).isRequired,
};

export default MovieList;