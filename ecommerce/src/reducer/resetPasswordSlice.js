import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    old_password: "",
    new_password: "",
    confirm_password: "",
    user_type:'customer'
};

const resetPasswordSlice = createSlice({
    name: "resetPassword",
    initialState,
    reducers: {
        updatePasswordField: (state, action) => {
            const { values } = action.payload;
            console.log("value redux: ", values);
            Object.keys(values).forEach(key => {
                state[key] = values[key];
            });
        },
        resetPasswordFields: (state) => {
            Object.assign(state, initialState);
        }
    }
});

export const { updatePasswordField, resetPasswordFields } = resetPasswordSlice.actions;
export default resetPasswordSlice.reducer;
