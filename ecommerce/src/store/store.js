import { configureStore } from "@reduxjs/toolkit";
import signupReducer from '../reducer/signupSlice';
import searchReducer from '../reducer/searchSlice';
import vendorReducer from '../reducer/vendorSignupSlice';
const store=configureStore({
    reducer:{
        signup:signupReducer,
        search:searchReducer,
        vendor:vendorReducer
    }
})

export default store;