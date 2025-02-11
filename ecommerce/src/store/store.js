import { configureStore } from "@reduxjs/toolkit";
import signupReducer from '../reducer/signupSlice';
import searchReducer from '../reducer/searchSlice';
import vendorReducer from '../reducer/vendorSignupSlice';
import resetPasswordReducer from '../reducer/resetPasswordSlice';
import authReducer from '../reducer/authSlice';
const store=configureStore({
    reducer:{
        signup:signupReducer,
        search:searchReducer,
        vendor:vendorReducer,
        resetPassword:resetPasswordReducer,
        auth:authReducer,
    }
})

export default store;