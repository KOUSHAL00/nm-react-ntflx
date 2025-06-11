import { API_OPTIONS } from "../utils/constants";
import  { useDispatch } from "react-redux";
import { addnowplayingmovies } from "../utils/movieslice";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const useNowplayingMovies = () => {


  //fetching data from TMDB API and update store with now playing movies
  
    const dispatch = useDispatch();

    const nowplayingmovies = useSelector(
      (store) => store.movies.nowplayingmovies
    );


  const getNowplayingmovies = async () => {



    try {
       
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?api_key=a3bd1aedf1ecd7c5642e279304698a6f",
        API_OPTIONS
      );
      const json = await data.json();
      console.log("API Response:", json.results);

      dispatch(addnowplayingmovies(json.results));
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {

    !nowplayingmovies && 

    getNowplayingmovies();
    
  }, []);

  
}

export default useNowplayingMovies;
