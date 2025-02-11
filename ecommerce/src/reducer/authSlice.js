import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    is_authenticated: false,
    is_admin: false,
    is_vendor: false
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setAuthenticated(state, action) {
            state.is_authenticated = action.payload;
        },
        setAdmin(state, action) {
            state.is_admin = action.payload;
        },
        setVendor(state, action) {
            state.is_vendor = action.payload;
        }
    }
});

export const { setAuthenticated, setAdmin, setVendor } = authSlice.actions;
export default authSlice.reducer;
