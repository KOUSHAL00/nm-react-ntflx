
import PropTypes from 'prop-types';

const Videotitle = ({ title, overview }) => {
  return (
    <div className="   px-3  md:absolute top-[40%] left-12 text-white w-1/2   ">
      <h1 className="  md:text-6xl font-bold mb-6  md:block ">{title}</h1>
      <p className=" md:text-lg mb-8 hidden md:block ">{overview}</p>
      <div className="  md:flex gap-4  ">
        <button className=" md: bg-white text-black px-8 py-3 rounded-lg hover:bg-opacity-80   ">
          ▶ Play
        </button>
        <button className="bg-gray-500 text-white px-8 py-3 rounded-lg hover:bg-opacity-80 hidden md:block  ">
          More Info
        </button>
      </div>
    </div>

  );
};
  Videotitle.propTypes = {
    title: PropTypes.string.isRequired,
    overview: PropTypes.string.isRequired,
  };
  export default Videotitle;





