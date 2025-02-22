import { Navigate } from "react-router";
import useAuth from "../hooks/useAuth";
import LoadingPage from "../pages/LoadingPage/LoadingPage";

const PrivateRoute = ({children}) => {
    const {user, loading} = useAuth()

    if(loading) return <LoadingPage/>
    
    if(!user) return <Navigate to={"/auth/login"}/>
    
    return <>{children}</>
};

export default PrivateRoute;