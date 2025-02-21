import { Chrome } from "lucide-react";
import { Button } from "@/components/ui/button";

const GoogleLogin = ({title}) => {
    return (
            <Button 
                  variant="outline" 
                  className="w-full h-12 border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50 transition-all duration-300 text-gray-600"
                >
                  <Chrome className="mr-2 h-5 w-5" />
                  {title}
            </Button>
    );
};

export default GoogleLogin;