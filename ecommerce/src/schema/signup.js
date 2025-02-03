import * as Yup from "yup";

export const signUpSchema=Yup.object({
    firstName:Yup.string().min(2).max(25).required("firstname is required"),
    lastName:Yup.string().min(2).max(25).required("lastname is required"),
    email:Yup.string().email("Invalid email").required("email is required"),
    newPassword:Yup.string().min(6,"password must be more than 6 or 6 character").max(10,"password must be less than 10 or 10 character").required("password is required"),
    contactNumber:Yup.string().min(10,"contact number must be 10 digits").max(10,"contact number should be 10 digit").required("contact number required"),
    city:Yup.string().required("city is required"),
    state:Yup.string().required("state is required"),
    streetAddress:Yup.string().required("street address is required"),
    gender:Yup.string().required("gender is required"),

});
