import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addTopratedmovies } from "../utils/movieslice";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const useTopratedmovies = () => {
  //fetching data from TMDB API and update store with toprated movies

  const dispatch = useDispatch();

  const topratedmovies = useSelector((store) => store.movies.topratedmovies);


  const gettopratedmovies = async () => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/top_rated?api_key=a3bd1aedf1ecd7c5642e279304698a6f",
        API_OPTIONS
      );
      const json = await data.json();
      console.log("API Response:", json.results);

      dispatch(addTopratedmovies(json.results));
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    !topratedmovies &&
    gettopratedmovies();
  }, []);
};

export default useTopratedmovies;
