import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(16, "Password must be at most 16 characters")
    .matches(/[A-Z]/, "Password must include at least one uppercase letter")
    .matches(/[a-z]/, "Password must include at least one lowercase letter")
    .matches(/\d/, "Password must include at least one number")
    .matches(/[@$!%*?&]/, "Password must include at least one special character (@, $, !, %, *, ?, &)")
    .required("Password is required"),
});
