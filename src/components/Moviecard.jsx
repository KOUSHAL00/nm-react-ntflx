import { IMG_CDN_URL } from "../utils/constants";
import PropTypes from "prop-types";
import { useState } from "react";
import { Play, Plus, ThumbsUp, X } from "lucide-react";

const MovieCard = ({
  posterPath,
  title,
  overview,
  releaseDate,
  voteAverage,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  if (!posterPath) return null;

  return (
    <>
      {/* Movie Card */}
      <div
        className="w-32 sm:w-40 md:w-48 lg:w-56 pr-2 md:pr-4 relative group cursor-pointer
                   transition-all duration-300 ease-in-out hover:scale-110 hover:z-10"
      >
        {/* Card Image */}
        <div className="relative overflow-hidden rounded-lg shadow-lg">
          <img
            alt={title || "Movie Card"}
            src={IMG_CDN_URL + posterPath}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:brightness-75"
            loading="lazy"
          />

          {/* Hover Effects - Desktop */}
          <div
            className={`hidden md:flex absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent
                          opacity-0 hover:opacity-100 transition-opacity duration-300
                          p-4 flex-col justify-between`}
          >
            <h3
              className="text-white text-sm lg:text-base font-semibold line-clamp-2 
                         opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 
                         transition-all duration-300"
            >
              {title}
            </h3>

            <div
              className="flex gap-2 opacity-0 group-hover:opacity-100 transform translate-y-2 
                          group-hover:translate-y-0 transition-all duration-300 delay-100"
            >
              <button
                onClick={() => setShowModal(true)}
                className="p-2 bg-white rounded-full hover:bg-gray-200 transition-colors
                         transform hover:scale-110 duration-200"
              >
                <Play size={18} className="text-black" />
              </button>
              <button
                className="p-2 bg-gray-600/80 rounded-full hover:bg-gray-700 transition-colors
                              transform hover:scale-110 duration-200"
              >
                <Plus size={18} className="text-white" />
              </button>
              <button
                className="p-2 bg-gray-600/80 rounded-full hover:bg-gray-700 transition-colors
                              transform hover:scale-110 duration-200"
                onClick={() => setIsLiked(!isLiked)}
              >
                <ThumbsUp
                  size={18}
                  className={`${
                    isLiked ? "text-blue-500" : "text-white"
                  } transition-colors`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Touch Handler */}
        <button
          className="md:hidden absolute inset-0"
          onClick={() => setShowModal(true)}
          aria-label="Open movie details"
        />
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 md:p-6
                     transition-opacity duration-300"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowModal(false);
          }}
        >
          {/* Modal Content */}
          <div
            className="bg-zinc-900 text-white rounded-xl w-full max-h-[90vh] overflow-y-auto relative
                        sm:max-w-lg md:max-w-2xl lg:max-w-3xl
                        transform transition-all duration-300 ease-out
                        shadow-[0_0_50px_rgba(0,0,0,0.3)]"
          >
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute right-3 top-3 sm:right-4 sm:top-4 text-gray-400 hover:text-white
                         p-2 rounded-full hover:bg-white/10 transition-colors z-10"
            >
              <X size={24} />
            </button>

            {/* Modal Header */}
            <div className="p-6 sm:p-8 border-b border-gray-800/50">
              <h2
                className="text-2xl sm:text-3xl font-bold pr-8 bg-gradient-to-r from-white to-gray-300 
                           bg-clip-text text-transparent"
              >
                {title}
              </h2>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="aspect-video overflow-hidden rounded-lg">
                <img
                  src={IMG_CDN_URL + posterPath}
                  alt={title}
                  className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="flex flex-wrap gap-3 sm:gap-4 text-sm items-center">
                <span className="text-green-400 font-medium text-base">
                  {Math.round(voteAverage * 10)}% ❤️
                </span>
                <span className="text-gray-300">{releaseDate}</span>
              </div>

              {/* Movie Controls */}
              <div className="flex flex-wrap gap-4">
                <button
                  className="flex items-center gap-2 bg-white text-black px-6 sm:px-8 py-3 rounded-lg
                                 hover:bg-gray-100 transition-colors flex-1 sm:flex-none justify-center
                                 font-semibold transform hover:scale-105 duration-200"
                >
                  <Play size={20} /> Play
                </button>
                <button
                  className="flex items-center gap-2 bg-gray-600/80 text-white px-6 sm:px-8 py-3 rounded-lg
                                 hover:bg-gray-700 transition-colors flex-1 sm:flex-none justify-center
                                 font-semibold transform hover:scale-105 duration-200"
                >
                  <Plus size={20} /> My List
                </button>
              </div>

              <p className="text-gray-300 text-sm sm:text-base leading-relaxed overflow-scroll ">
                {overview}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

MovieCard.propTypes = {
  posterPath: PropTypes.string.isRequired,
  title: PropTypes.string,
  overview: PropTypes.string,
  releaseDate: PropTypes.string,
  voteAverage: PropTypes.number,
};

export default MovieCard;
