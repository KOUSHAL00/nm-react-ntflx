import Header from "./Header"
import  useNowplayingMovies  from "../hooks/useNowplayingMovies.js";
import Maincontainer from "./Maincontainer.jsx";
import GptSearch from "./GptSearch.jsx";
import Secondarycontainer from "./Secondarycontainer.jsx";
import usePopularmovies from "../hooks/usePopularmovies.js";
import useUpcomingmovies from "../hooks/useUpcomingmovies.js";
import useTrendingmovies from "../hooks/useTrendingMovies.js";
import useTopratedmovies  from "../hooks/useTopratedmovies.js";
import { useSelector } from "react-redux";


const Browse = () => { 

 //fetching data from TMDB API and update store with now playing movies

  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  

  useNowplayingMovies();
  usePopularmovies();
  useUpcomingmovies();
  useTrendingmovies();
  useTopratedmovies();



  return (

    <div>
      <Header />
      {showGptSearch ? (
        <GptSearch />
      ) : (
        <>
          <Maincontainer />
          <Secondarycontainer />
        </>
      )}
    </div>
  )
  
}

export default Browse