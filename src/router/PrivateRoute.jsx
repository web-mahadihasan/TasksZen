import { Navigate } from "react-router";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({children}) => {
    const {user, loading} = useAuth()

    if(loading) return <p>Loading...</p>
    
    if(!user) return <Navigate to={"/auth/login"}/>
    
    return <>{children}</>
};

export default PrivateRoute;