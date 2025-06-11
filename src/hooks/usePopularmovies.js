import { API_OPTIONS } from "../utils/constants";
import  { useDispatch } from "react-redux";
import { addPopularmovies } from "../utils/movieslice";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const usePopularmovies = () => {

  //fetching data from TMDB API and update store with now playing movies
  
    const dispatch = useDispatch();

    const popularmovies = useSelector(store => store.movies.popularmovies);

  const getpopularmovies = async () => {

    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/popular?api_key=a3bd1aedf1ecd7c5642e279304698a6f",
        API_OPTIONS
      );

      const json = await data.json();
      console.log("API Response:", json.results);

      dispatch(addPopularmovies(json.results));

    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    !popularmovies &&
    getpopularmovies();
    
  }, []);

  
}

export default usePopularmovies;
