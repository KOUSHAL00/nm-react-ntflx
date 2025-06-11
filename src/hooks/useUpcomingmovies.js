import { API_OPTIONS } from "../utils/constants";
import  { useDispatch } from "react-redux";
import { addUpcomingmovies } from "../utils/movieslice";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const useUpcomingmovies = () => {


  //fetching data from TMDB API and update store with now playing movies
  
    const dispatch = useDispatch();
    const upcomingmovies = useSelector(
      (store) => store.movies.upcomingmovies
    );

  const getupcomingmovies = async () => {

    try {
       
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
        API_OPTIONS
      );
      const json = await data.json();
      console.log("API Response:", json.results);

      dispatch(addUpcomingmovies(json.results));
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {

    !upcomingmovies &&

    getupcomingmovies();
    
  }, []);

  
}

export default useUpcomingmovies;
