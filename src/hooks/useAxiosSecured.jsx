import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";
import { useEffect } from "react";

export const axiosSecured = axios.create({
  baseURL: "http://localhost:5000",
});

const useAxiosSecured = () => {
  const navigate = useNavigate();
  const { logOutUser } = useAuth();

  useEffect(() => {
    const requestInterceptor = axiosSecured.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosSecured.interceptors.response.use(
      (res) => res,
      async (error) => {
        const status = error?.response?.status;
        if (status === 401 || status === 403) {
          await logOutUser();
          navigate("/auth/login");
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecured.interceptors.request.eject(requestInterceptor);
      axiosSecured.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate, logOutUser]);

  return axiosSecured;
};

export default useAxiosSecured;
