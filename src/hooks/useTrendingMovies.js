import { API_OPTIONS } from "../utils/constants";
import  { useDispatch } from "react-redux";
import { addTrendingmovies } from "../utils/movieslice";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const useTrendingmovies = () => {


  //fetching data from TMDB API and update store with now playing movies
  
    const dispatch = useDispatch();

    const trendingmovies = useSelector(
      (store) => store.movies.trendingmovies
    );

  const gettrendingmovies = async () => {

    try {
       
      const data = await fetch(
        "https://api.themoviedb.org/3/trending/all/day?language=en-US",
        API_OPTIONS
      );
      const json = await data.json();
      console.log("API Response:", json.results);

      dispatch(addTrendingmovies(json.results));
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {

    !trendingmovies &&

    gettrendingmovies();
    
  }, []);

  
}

export default useTrendingmovies;
