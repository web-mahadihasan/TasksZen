import { useContext } from "react";
import { AuthContextProvider } from "../contexts/AuthContext";

const useAuth = () => {
    const contextData = useContext(AuthContextProvider)
    return contextData;
};

export default useAuth;