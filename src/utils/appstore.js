import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userslice.js";
import movieReducer from "./movieslice.js";
import gptReducer from "./gptSlice";
import configReducer from "./configSlice";


const appstore = configureStore({
    reducer: {      
        
        user: userReducer,
        movies: movieReducer,
        gpt: gptReducer,
        config: configReducer,
    
    }
});

export default appstore;