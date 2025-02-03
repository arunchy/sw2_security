import { createSlice } from "@reduxjs/toolkit";

const initialState={
    firstName:"",
    lastName:"",
    email:"",
    newPassword:"",
    contactNumber:"",
    dob:"",
    city:"",
    state:"",
    streetAddress:"",
    gender:"",
    profile_picture:"",
    captcha:''
}

const signupSlice=createSlice({
    name:"signup",
    initialState,
    reducers:{
        updateField:(state,action)=>{
            const {values}=action.payload;
            console.log("value redux: ",values)
            Object.keys(values).forEach(key=>{
                state[key]=values[key]
            })
        },
        resetFields:(state)=>{
            Object.assign(state,initialState)
        }
    }
});

export const {updateField,resetFields}=signupSlice.actions;
export default signupSlice.reducer;