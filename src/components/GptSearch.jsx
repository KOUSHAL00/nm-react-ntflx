 import { BG_URL } from "../utils/constants";
import GptMovieSuggestions from "./GptMovieSuggestion";
import GptSearchBar from "./GptSearchbar";

const GPTSearch = () => {
  return (
<>
  <div className="fixed inset-0 -z-10">
    <img 
      className="h-screen w-screen object-cover brightness-50" 
      src={BG_URL} 
      alt="background" 
    />
  </div>
  <div className="relative min-h-screen pt-[20%] sm:pt-[15%] md:pt-[10%] px-4 sm:px-6 md:px-8">
    <GptSearchBar />
    <GptMovieSuggestions />
  </div>
</>
  );
  };
  export default GPTSearch;