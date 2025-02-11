import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAdmin, setVendor, setAuthenticated } from "../reducer/authSlice"; // Adjust import path

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const logout = () => {
      localStorage.clear(); // Clear localStorage
      dispatch(setAdmin(false)); // Set admin state to false
      dispatch(setVendor(false)); // Set vendor state to false
      dispatch(setAuthenticated(false)); // Set authenticated state to false
      navigate("/login"); // Redirect to login page
    };

    logout(); // Call the logout function on component mount
  }, [dispatch, navigate]);

  return <div>Logging out...</div>; // A simple loading message, you can customize as needed
};

export default Logout;
