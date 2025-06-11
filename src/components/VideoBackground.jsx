import { useSelector } from 'react-redux';
import useMovieTrailer from '../hooks/useMovieTrailer';
import PropTypes from 'prop-types';

const VideoBackground = ({ movieid }) => {

    


    const trailerVideo = useSelector((store) => store.movies?.trailerVideo);



    useMovieTrailer({ movieid });


  console.log("trailerVideo:",trailerVideo)
    return (
        <div className="w-screen py-2 ">

           <iframe  className='w-screen aspect-video'
            src={"https://www.youtube.com/embed/"+trailerVideo?.key+"?&autoplay=1&mute=1&loop=1&controls=0&modestbranding=0&rel=0"} 
            title="YouTube video player" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share " 
            allowFullScreen
           referrerPolicy="strict-origin-when-cross-origin" 
           ></iframe>
        </div>
    );
};
VideoBackground.propTypes = {
    movieid: PropTypes.string.isRequired,
  
};
VideoBackground.defaultProps = {
  movieid: 'defaultId',
};



export default VideoBackground;

