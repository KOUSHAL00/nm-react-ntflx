import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addGptMovieResult } from '../utils/gptSlice';
import { API_OPTIONS } from '../utils/constants';
import lang from '../utils/languageConstants';
import genAI from '../utils/openai';

const GptSearchBar = () => {
  const dispatch = useDispatch();

  const langKey = useSelector((store) => store.config.lang);

  const searchText = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const searchMovieTMDB = async (movie) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(movie)}&include_adult=false&language=en-US&page=1`,
        API_OPTIONS
      );
      
      
      if (!response.ok) {
        throw new Error(`TMDB API error: ${response.status}`);
      }
      
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error searching TMDB:', error);
      return [];
    }
  };

  const handleGptSearchClick = async () => {
    try {
      setIsLoading(true);
      setError('');

      const searchValue = searchText.current?.value;
      if (!searchValue?.trim()) {
        throw new Error('Please enter a search term');
      }

      // Mock GPT response for development/testing
      // Remove this and uncomment the real GPT call when API is working

      // const mockGptResponse = [
      //   "The Shawshank Redemption",
      //   "The Godfather",
      //   "Pulp Fiction",
      //   "The Dark Knight",
      //   "Fight Club"
      // ];

      /*Comment out the GPT API call for now
      const gptQuery = `Act as a Movie Recommendation system and suggest some movies for the query: ${searchValue}. only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya`;

      const gptResults = await openai.chat.completions.create({
        messages: [{ role: 'user', content: gptQuery }],
        model: 'gpt-3.5-turbo',
      });

      if (!gptResults?.choices?.[0]?.message?.content) {
        throw new Error('No recommendations received from GPT');
      }

      const gptMovies = gptResults.choices[0].message.content
        .split(',')
        .map(movie => movie.trim())
        .filter(Boolean);
      */

        //gemini ai
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt =`Act as a Movie Recommendation system and suggest some movies for the query: ${searchValue}. only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya`;

const result = await model.generateContent(prompt);
console.log(result.response.text());

const gptMovies = result.response.text().split(',')

      // Use mock data instead
      //const gptMovies = mockGptResponse;

      if (!gptMovies.length) {
        throw new Error('No movie recommendations found');
      }

      const tmdbResults = await Promise.all(
        gptMovies.map(movie => searchMovieTMDB(movie))
      );

      dispatch(addGptMovieResult({ 
        movieNames: gptMovies, 
        movieResults: tmdbResults 
      }));

    } catch (err) {
      let errorMessage = 'An error occurred while searching';
      
      // Handle specific error cases
      if (err?.message?.includes('429')) {
        errorMessage = 'API rate limit exceeded. Please try again later or check your API quota.';
      } else if (err?.message?.includes('quota')) {
        errorMessage = 'You have exceeded your API quota. Please check your billing details.';
      }
      
      setError(errorMessage);
      console.error('Search error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-[35%] md:pt-[10%] flex flex-col items-center px-4 sm:px-6 lg:px-8">
    <form 
      className="w-full md:w-3/4 lg:w-1/2 bg-black grid grid-cols-12 rounded-lg shadow-lg"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        ref={searchText}
        type="text"
        className="p-2 sm:p-3 md:p-4 m-2 sm:m-3 md:m-4 col-span-9 rounded-lg border border-gray-300 focus:outline-none focus:border-red-700 text-sm sm:text-base"
        placeholder={lang[langKey].gptSearchPlaceholder}
        disabled={isLoading}
      />
      <button
        className="col-span-3 m-2 sm:m-3 md:m-4 py-1.5 sm:py-2 md:py-2.5 px-2 sm:px-3 md:px-4 bg-red-700 text-white rounded-lg hover:bg-red-800 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed text-sm sm:text-base whitespace-nowrap"
        onClick={handleGptSearchClick}
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="inline-block animate-pulse">
            {lang[langKey].searching || 'Searching...'}
          </span>
        ) : (
          lang[langKey].search
        )}
      </button>
    </form>
    {error && (
      <div className="mt-4 text-red-500 bg-red-100 p-2 sm:p-3 rounded-lg max-w-[90%] sm:max-w-md text-center text-sm sm:text-base">
        {error}
      </div>
    )}
  </div>
  );
};

export default GptSearchBar;