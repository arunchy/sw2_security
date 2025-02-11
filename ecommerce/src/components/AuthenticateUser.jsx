import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAdmin, setVendor, setAuthenticated } from "../reducer/authSlice"; // Adjust import path
import { validateUserTokenApi } from "../api/api"; // Adjust import path

const AuthenticateUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true; // To prevent updates if unmounted

    const validateUser = async () => {
      try {
        const response = await validateUserTokenApi();
        if (response.status === 200 && isMounted) {
          dispatch(setAdmin(response.data.is_admin));
          dispatch(setVendor(response.data.is_vendor));
          dispatch(setAuthenticated(true));
        }
      } catch (error) {
        if (isMounted) {
          dispatch(setAdmin(false));
          dispatch(setVendor(false));
          dispatch(setAuthenticated(false));
        }
      }
    };

    validateUser();

    return () => {
      isMounted = false; // Cleanup function
    };
  }, [dispatch, navigate]); // Added dependencies

  return null; // Since this is just an authentication check, no UI needed
};

export default AuthenticateUser;
