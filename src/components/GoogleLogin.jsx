import { Chrome } from "lucide-react";
import { Button } from "@/components/ui/button";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const GoogleLogin = ({title}) => {
  const {setUser, loginWithGoogle, user} = useAuth()
  const axiosPublic = useAxiosPublic()
  const navigate = useNavigate()

  const handleGoogleLogin = async () => {
    const toastId = toast.loading('Trying Loged in...');
    try {
      const result = await loginWithGoogle()
      console.log(result)
      const userInfo = {
        name: result?.user?.displayName,
        email: result?.user?.email,
        photoUrl: result?.user?.photoURL,
        createAt: result?.user?.metadata?.creationTime
      }
      const {data} = await axiosPublic.post("/users", {userInfo})
      setUser(result.user)
      toast.success(`Welcome ${result?.user?.displayName}!`, {
        id: toastId, 
      });
      navigate("/dashboard")
    } catch (error) {
      console.log(error)
    }
  }
    return (
            <Button onClick={handleGoogleLogin}
                  variant="outline" 
                  className="w-full h-12 border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50 transition-all duration-300 text-gray-600"
                >
                  <Chrome className="mr-2 h-5 w-5" />
                  {title}
            </Button>
    );
};

export default GoogleLogin;