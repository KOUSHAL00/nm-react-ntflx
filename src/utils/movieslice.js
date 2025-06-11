import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    trailerVideo: null,
    popularMovies: null,
    upcomingMovies: null,
    trendingMovies: null,
    topratedMovies: null,
  },
  reducers: {
    addnowplayingmovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addTrailerVideo: (state, action) => {
      state.trailerVideo = action.payload;
    },
    addPopularmovies: (state, action) => {
      state.popularMovies = action.payload.data;
    },
    addUpcomingmovies: (state, action) => {
      state.upcomingMovies = action.payload;
    },
    addTrendingmovies: (state, action) => {
      state.trendingMovies = action.payload;
    },
    addHorrormovies: (state, action) => {
      state.horrorMovies = action.payload;
    },
    addTopratedmovies: (state, action) => {
      state.topratedMovies = action.payload;
    },
  },
});

export const {
  addnowplayingmovies,
  addTrailerVideo,
  addPopularmovies,
  addUpcomingmovies,
  addTrendingmovies,
  addTopratedmovies,
} = movieSlice.actions;
export default movieSlice.reducer;
