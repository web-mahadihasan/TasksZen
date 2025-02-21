import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, UserCircle2, KeyRound, AtSign, ImageIcon, Chrome } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Link } from 'react-router';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from 'axios';
import bgImage from "../../assets/authentication.png"
import GoogleLogin from '../../components/GoogleLogin';
import { Checkbox } from "@/components/ui/checkbox"

const yupSchema = yup.object().shape({
  name: yup.string().min(3, "Name must be at least 3 characters").max(20, "Name cannot be more than 20 characters").required("Name is required"),
  email: yup.string().matches(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    "Invalid email address"
  ).required("Email is required"),
  password: yup.string().matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
    "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one number."
  ).required("Password is required"),
  image: yup
    .mixed().required("Image is required")
});



function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [fileName, setFileName] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({resolver: yupResolver(yupSchema)})
  const cloudinaryApi = import.meta.env.VITE_CLOUDINARY_API

  // Handle image upload 
  const handleImageUpload = (e) => {
    setFileName(e.target.files[0])
  }
  
  const onSubmit =async (data) => {
    const formData = new FormData()
    formData.append("file", fileName)
    formData.append("upload_preset", "fitVerse")
    setLoading(true)
    try {
      const {data: imageData} = await axios.post(`https://api.cloudinary.com/v1_1/${cloudinaryApi}/image/upload`,
        formData
      )
      setImage(imageData?.url)
      setLoading(false)
      console.log(image)
      console.log(data)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-400/90 via-indigo-500/90 to-purple-500/90 flex items-center justify-center p-4" style={{backgroundImage: `url(${bgImage})`}}>
      <div className="w-full max-w-lg">
        <div className="flex justify-center mb-4">
          <div className="p-4 rounded-full bg-main/10 shadow-lg">
            <UserCircle2 className="w-12 h-12 text-main" />
          </div>
        </div>
        
        <Card className="border-0 shadow-2xl bg-white">
          <CardHeader className="space-y-1 text-center pb-5">
            <CardTitle className="text-3xl font-bold tracking-tight text-gray-900">
                Create account
            </CardTitle>
            <CardDescription className="text-base text-gray-500">
                Enter your details to get started
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
              <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</Label>
                  <div className="relative">
                    <UserCircle2 className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input 
                      id="name" {...register("name")}
                      placeholder="John Doe" 
                      className="pl-10 h-12 bg-white border-gray-200 focus:border-main transition-all duration-300 font-medium text-gray-700"
                    />
                  </div>
                  <p className="text-red-500 text-left w-full text-sm">{errors.name?.message}</p>
                </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email address</Label>
                <div className="relative">
                  <AtSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input 
                    id="email" {...register("email")}
                    type="email" 
                    placeholder="you@example.com" 
                    className="pl-10 h-12 bg-white border-gray-200 focus:border-main transition-all duration-300 font-medium text-gray-700"
                  />
                </div>
                <p className="text-red-500 text-left w-full text-sm">{errors.email?.message}</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="password" {...register("password")}
                    type={showPassword ? "text" : "password"}
                    className="pl-10 pr-10 h-12 bg-white border-gray-200 focus:border-main transition-all duration-300 font-medium text-gray-700"
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
                <p className="text-red-500 text-left w-full text-sm">{errors.password?.message}</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="photo" className="text-sm font-medium text-gray-700">Profile Photo URL</Label>
    
                  <div>
                    <div className="relative inline-flex items-center w-full gap-2 mb-2 text-sm border rounded border-slate-200 text-slate-500 font-medium ">
                    <input id="file-upload" {...register("image")} onChange={handleImageUpload}  name="file-upload" type="file" accept="image/*" className="peer order-2 [&::file-selector-button]:hidden" />
                    <label htmlFor="file-upload" className="inline-flex items-center justify-center h-12 gap-2 px-6 text-sm font-medium tracking-wide text-white transition duration-300 rounded cursor-pointer whitespace-nowrap bg-main hover:bg-emerald-600 focus:bg-emerald-700 focus-visible:outline-none peer-disabled:cursor-not-allowed peer-disabled:border-main peer-disabled:bg-main"> Upload a file </label>
                    </div>
                  </div>
                  <p className="text-red-500 text-left w-full text-sm">{errors.image?.message}</p>
              </div>
              <div className="flex items-center space-x-2 pb-2">
                  <Checkbox id="terms" />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-500"
                  >
                    Accept terms and conditions
                  </label>
              </div>
              <Button 
                className="w-full h-12 text-lg font-medium bg-main hover:bg-main-dark text-white transition-all duration-300" type="submit"
              >
                  Create account
              </Button>
              </form>

            <>
              <div className="relative my-6 py-3">
                <Separator className="bg-gray-200" />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-sm text-gray-500">
                  or continue with
                </span>
              </div>
              <GoogleLogin title={"Signup with google"}/>
            </>
      
          </CardContent>
          <CardFooter className="flex flex-col items-center pb-5">
          <Button
              variant="link"
              className="text-main hover:text-main-dark group duration-500 hover:no-underline"
            >
              Already have an account? <Link to={"/auth/login"} className='group-hover:underline duration-500 group-hover:text-blue-500 transition-all ease-in-out'>Log in</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default Register;