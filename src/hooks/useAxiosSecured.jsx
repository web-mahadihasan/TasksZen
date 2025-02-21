import axios from "axios";
import { useNavigate } from "react-router";
import useAuth from "./useAuth";


export const axiosSecured = axios.create({
    baseURL: 'http://localhost:5000'
})

const useAxiosSecured = () => {
    const navigate = useNavigate()
    const {logOutUser} = useAuth()

    axiosSecured.interceptors.request.use((config) => {
        const token = localStorage.getItem('token')
        config.headers.authorization = (`Bearer ${token}`);
        return config; 
    }, (error) => {
        return Promise.reject(error);
    })

    // Log out user by Axios resoponse
    axiosSecured.interceptors.response.use((res) => {
        return res;
    }, async (error) => {
        const status = error?.response?.status

        if(status === 401 || status === 403){
            await logOutUser()
            navigate("/auth/login")
        }
        return Promise.reject(error);
    })
    return axiosSecured
}

export default useAxiosSecured;
