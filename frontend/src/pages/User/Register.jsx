import React from "react";
import treeImg from "../../assets/trees.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import bgImg from "../../assets/bg.jpg";
import * as yup from "yup";
import axios from "../../services/axios";
import { toast } from "react-toastify";

const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
});

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const formSubmit = async (data) => {
    try {
      await axios.post("/auth/register", data);
      navigate("/login");
      toast.success("Reigsteration Succssfull, Now login");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div
      className="h-screen w-full flex items-center justify-center relative bg-cover bg-center bg-no-repeat px-4"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      {/* Register Card */}
      <div className="relative bg-white/95 backdrop-blur-xl grid grid-cols-1 md:grid-cols-2 w-full max-w-[900px] shadow-2xl rounded-lg overflow-hidden">
        {/* Left Image (hidden in mobile) */}
        <div className="hidden md:block">
          <img
            className="w-full h-full object-cover"
            src={treeImg}
            alt="Register"
          />
        </div>

        {/* Right Form */}
        <div className="px-6 py-8 flex flex-col justify-center">
          <form className="space-y-4" onSubmit={handleSubmit(formSubmit)}>
            <h2 className="text-3xl  font-semibold text-center  mb-4">
              Register
            </h2>

            <div className="flex flex-col">
              <label className="text-md">Name</label>
              <input
                {...register("name")}
                className="p-3 bg-gray-200 rounded-md w-full focus:outline-none"
                placeholder="Enter your name"
                type="text"
              />
              {errors.name && (
                <span className="text-sm text-red-600">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-md">Email</label>
              <input
                {...register("email")}
                className="p-3 bg-gray-200 rounded-md w-full focus:outline-none"
                placeholder="Enter your email"
                type="email"
              />
              {errors.email && (
                <span className="text-sm text-red-600">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-md">Password</label>
              <input
                {...register("password")}
                className="p-3 bg-gray-200 rounded-md w-full focus:outline-none"
                placeholder="Enter Password"
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
              {isSubmitting ? <div className="loader "></div> : "Sign Up"}
            </button>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link className="text-blue-700 hover:border-b" to="/login">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
