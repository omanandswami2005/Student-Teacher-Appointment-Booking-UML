// useAuth.js
import { useContext } from "react";
import { AuthContext } from "../context/authContext"; // Update the path as necessary

const useAuth = () => useContext(AuthContext);

export default useAuth;
