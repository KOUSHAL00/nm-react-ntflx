// hooks/useMovieTrailer.js
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { API_OPTIONS } from '../utils/constants';
import  {addTrailerVideo}  from '../utils/movieslice';
import { useSelector } from 'react-redux';

const useMovieTrailer = ({ movieid }) => {

  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);

    const dispatch = useDispatch();

    const getMovieVideos = async () => {
        try {

            console.log("Fetching trailer for movie ID:", movieid); // Debug log
            
        //     const data = await fetch(
        //   `https://api.themoviedb.org/3/movie/${movieid}/videos?api_key=a3bd1aedf1ecd7c5642e279304698a6f`,
        //         API_OPTIONS
        //     );

        console.log("Fetching trailer for movie ID:")
        const data = await fetch(
            `https://api.themoviedb.org/3/movie/${movieid}/videos`,
            API_OPTIONS
          );

            const json = await data.json();
            console.log("API Response:", json); // Debug log
            
            const trailers = json.results?.filter(video => video.type === "Trailer");
            console.log("Available trailers:", trailers); // Debug log
            
            const trailer = trailers?.length ? trailers[0] : json.results?.[0];
            console.log("Selected trailer:", trailer); // Debug log
            
            
                dispatch(addTrailerVideo(trailer));
           
        } catch (error) {
            console.error("Error fetching movie videos:", error);
        }
    };

    useEffect(() => {
        !trailerVideo &&
         getMovieVideos();
    }, [movieid]);
};

export default useMovieTrailer;