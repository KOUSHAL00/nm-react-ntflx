import { useSelector } from 'react-redux';
import VideoBackground from './VideoBackground';
import Videotitle from './Videotitle';



const Maincontainer = () => {

    const movies = useSelector((store) => store.movies?.nowPlayingMovies);
    
    if (!movies) return null; // Return null if movies is not available

    const mainMovie = movies[0];
    const { original_title, overview, id } = mainMovie;

    return (
        <div className="pt-[30%] bg-black md:pt-0">
            
            <Videotitle title={original_title} overview={overview} />
            <VideoBackground movieid={String(id)} />
            
        </div>
    );
};

export default Maincontainer;