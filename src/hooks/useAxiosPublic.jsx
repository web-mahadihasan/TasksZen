import axios from "axios";


const axiosPublic = axios.create({
    baseURL: 'https://app-taskszen-server.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic;