import { Chrome } from "lucide-react";
import { Button } from "@/components/ui/button";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";

const GoogleLogin = ({title}) => {
  const {setUser, loginWithGoogle, user} = useAuth()
  const axiosPublic = useAxiosPublic()
  const handleGoogleLogin = async () => {
    try {
      const result = await loginWithGoogle()
      const userInfo = {
        name: user?.displayName,
        email: user?.email,
        photoUrl: user?.photoURL,
        createAt: user?.metadata?.creationTime
      }
      const {data} = await axiosPublic.post("/users", {userInfo})
      
    } catch (error) {
      
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