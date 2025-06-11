
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const Secondarycontainer = () => {

  const movies = useSelector((store) => store.movies);

  return (

      
      <div className="bg-black  ">
        <div className=" mt-0 md:-mt-52 pl-4 md:pl-12 relative z-20 ">
          <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies}  />
          <MovieList title={"Trending"} movies={movies.trendingMovies} />
          <MovieList title={"Popular"} movies={movies.popularMovies} />
          <MovieList
            title={"Upcoming Movies"}
            movies={movies.upcomingMovies}
          />
          <MovieList title={"Top Rated"} movies={movies.topratedMovies} />
        </div>
      </div>
    
  );
};
export default Secondarycontainer;