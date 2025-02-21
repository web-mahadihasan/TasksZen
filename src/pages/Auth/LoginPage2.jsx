import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, UserCircle2, KeyRound, AtSign, ImageIcon, Chrome } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Link } from 'react-router';
import bgImage from "../../assets/authentication.png"
import GoogleLogin from '../../components/GoogleLogin';
import { Checkbox } from "@/components/ui/checkbox"

function LoginPage2() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-400/90 via-indigo-500/90 to-purple-500/90 flex items-center justify-center p-4" style={{backgroundImage: `url(${bgImage})`}}>
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-5">
        <div className="p-4 rounded-full bg-main/10 shadow-lg">
            <UserCircle2 className="w-12 h-12 text-main" />
          </div>
        </div>
        
        <Card className="border-0 shadow-2xl bg-white">
          <CardHeader className="space-y-1 text-center pb-8">
            <CardTitle className="text-3xl font-bold tracking-tight text-gray-900">
                Welcome back!
            </CardTitle>
            <CardDescription className="text-base text-gray-500">
                Please sign in to continue
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email address</Label>
              <div className="relative">
                <AtSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="you@example.com" 
                  className="pl-10 h-12 bg-white border-gray-200 focus:border-main outline-none focus:outline-none transition-all duration-300 font-medium text-gray-700"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="pl-10 pr-10 h-12 bg-white border-gray-200 focus:border-main transition-all duration-300 font-medium text-gray-700 "
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>


              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-500"
                  >
                    Remember me
                  </label>
                </div>
                <Button 
                  variant="link" 
                  className="text-gray-500 duration-300 hover:text-blue-700 p-0"
                >
                  Forgot password?
                </Button>
              </div>
     
            <Button 
              className="w-full h-12 text-lg font-medium bg-main hover:bg-main-dark text-white transition-all duration-300"
            >
              Sign in
            </Button>


              <>
                <div className="relative my-6">
                  <Separator className="bg-gray-200" />
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-sm text-gray-500">
                    or continue with
                  </span>
                </div>

                <GoogleLogin title={"Login with google"}/>
              </>
            
          </CardContent>
          <CardFooter className="flex flex-col items-center pb-8 pt-4">
            <Button
              variant="link"
              className="text-main hover:text-main-dark group hover:no-underline"
            >
              Don't have an account? <Link to={"/auth/register"} className='group-hover:underline duration-500 group-hover:text-blue-500 transition-all ease-in-out'>Sign up</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default LoginPage2;