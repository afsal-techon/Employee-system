import React, { useEffect } from "react";
import bgImg from "../../assets/bg.jpg";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import axios from "../../services/axios";
import { useAuthStore } from "../../Store/authStore";

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
});



const Login = () => {

  const navigate = useNavigate();

  useEffect(()=>{
   const  token =  localStorage.getItem('token');
   if(token){
      navigate('/')
   }
  },[navigate])

  const {
  register,
  handleSubmit,
  formState: { errors, isSubmitting },
} = useForm({
  resolver: yupResolver(schema),
});

  const formSubmit = async (formData) => {
    try {
      const { data } = await axios.post("/auth/login", formData);
      localStorage.setItem('token',data.token)
       const { user } = data;
       useAuthStore.getState().setAuth(user)
      toast.success("Login successful");
      navigate("/");
      
    } catch (error) {
      toast.error(error?.response?.data?.message || "Internal Server Error");
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center relative bg-cover bg-center bg-no-repeat px-4"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      {/* Login Card */}
      <div className="relative bg-white/95 backdrop-blur-xl w-full max-w-[450px] rounded-md shadow-2xl border border-gray-300 p-6 md:p-8">
        <h1 className="text-center text-3xl font-semibold">Login</h1>

        <p className="text-center text-gray-600 mt-2 mb-6">
          Welcome to the Admin Panel
        </p>

        <form className="w-full space-y-5" onSubmit={handleSubmit(formSubmit)}>
          <div className="flex flex-col">
            <label className="text-lg">Email</label>
            <input
              {...register("email")}
              placeholder="Enter the Email"
              className="p-3 bg-gray-200 rounded-md w-full focus:outline-none"
              type="email"
            />
            {errors.email && (
              <span className="text-sm text-red-600">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-lg">Password</label>
            <input
              {...register("password")}
              placeholder="Enter the password"
              className="p-3 bg-gray-200 rounded-md w-full focus:outline-none"
              type="password"
            />
            {errors.password && (
              <span className="text-sm text-red-600">
                {errors.password.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="common-btn w-full py-3 flex items-center justify-center"
          >
            {isSubmitting ? <div className="loader"></div> : "Sign In"}
          </button>

          <p className="text-sm text-center">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-blue-700 hover:border-b hover:border-blue-700"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
