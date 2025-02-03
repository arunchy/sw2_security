import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  vendor_shop_name: "",
  shop_location: "",
  contact_number: "",
  email: "",
  password: "",
  profile_picture: "",
  is_authenticated: "True",
  captcha:''
};

const vendorSlice = createSlice({
  name: "vendor",
  initialState,
  reducers: {
    updateField: (state, action) => {
      const { values } = action.payload;
      console.log("Vendor slice update:", values);
      Object.keys(values).forEach(key => {
        state[key] = values[key];
      });
    },
    resetFields: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { updateField, resetFields } = vendorSlice.actions;
export default vendorSlice.reducer;
