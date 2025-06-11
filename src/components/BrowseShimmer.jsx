
const BrowseShimmer = () => {
  // Helper to create movie card shimmer items
  const MovieCardShimmer = () => (
    <div className="w-36 md:w-48 aspect-video bg-gray-800 rounded-lg animate-pulse"></div>
  );

  // Helper to create a row of movie cards
  const MovieRowShimmer = () => (
    <div className="px-6 md:px-12">
      <div className="h-6 w-48 bg-gray-800 rounded mb-4 animate-pulse"></div>
      <div className="flex gap-4 overflow-x-hidden">
        {[...Array(6)].map((_, index) => (
          <MovieCardShimmer key={index} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-black min-h-screen">
      {/* Main Hero Section Shimmer */}
      <div className="pt-[30%] md:pt-[20%] bg-gray-900 relative">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black">
          <div className="absolute bottom-1/4 left-8 md:left-12">
            {/* Title Shimmer */}
            <div className="w-64 h-8 md:h-12 bg-gray-800 rounded animate-pulse mb-4"></div>
            
            {/* Description Shimmer */}
            <div className="w-full max-w-xl">
              <div className="h-4 bg-gray-800 rounded animate-pulse mb-2"></div>
              <div className="h-4 bg-gray-800 rounded animate-pulse mb-2"></div>
              <div className="h-4 bg-gray-800 rounded animate-pulse"></div>
            </div>
            
            {/* Buttons Shimmer */}
            <div className="flex gap-4 mt-6">
              <div className="w-24 h-8 md:h-12 bg-gray-800 rounded animate-pulse"></div>
              <div className="w-24 h-8 md:h-12 bg-gray-800 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Container Shimmer */}
      <div className="bg-black -mt-20 relative z-20">
        <div className="space-y-8 py-8">
          {/* Multiple Movie Rows */}
          {[...Array(5)].map((_, index) => (
            <MovieRowShimmer key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrowseShimmer;