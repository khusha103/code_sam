import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ForgotPasswordModal from './ForgotPasswordModal'; // Import your new ForgotPasswordModal component
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate for navigation

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const navigate = useNavigate(); // Initialize useNavigate

  const onSubmit = (data) => {
    console.log("Login Data: ", data);
    // Handle login logic here (e.g., API call)
    
    // Assuming login is successful, navigate to home page
    navigate("/home"); // Change "/home" to your actual home route
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 flex items-center justify-center bg-white p-6">
        <div className="max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email Field */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email format" },
                })}
                placeholder="Enter your email"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
              />
              {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                })}
                placeholder="Enter your password"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
              />
              {errors.password && (
                <p className="text-red-500 text-xs">{errors.password.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Login
            </button>

            {/* Links for Sign Up and Forgot Password */}
            <p className="mt-4 text-center">
              Don't have an account?{" "}
              <Link to="/" className="text-blue-500 hover:text-blue-700 font-semibold">
                Sign Up here
              </Link>
            </p>
            <p className="mt-2 text-center">
              <button 
                type="button" 
                onClick={() => setIsModalOpen(true)} 
                className="text-blue-500 hover:text-blue-700 font-semibold"
              >
                Forgot Password?
              </button>
            </p>
          </form>
        </div>
      </div>

      {/* Right Side - Image (optional) */}
      <div
        className="w-1/2 bg-cover bg-no-repeat bg-center"
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/29484238/pexels-photo-29484238/free-photo-of-minimalist-indoor-plant-decor-with-modern-furniture.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
        }}
      >
        {/* Additional content can go here if needed */}
      </div>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Login;