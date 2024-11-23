import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import OtpModal from './OtpModal'; // Import your new OtpModal component
import { CheckIcon } from '@heroicons/react/24/solid'; // Updated import for Heroicons v2

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const password = watch("password");
  const email = watch("email");
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  // Validate email
  const isEmailValid = email && /\S+@\S+\.\S+/.test(email);

  // Enable button only when email is valid
  const isVerifyButtonDisabled = !isEmailValid;

  const onSubmit = (data) => {
    console.log("Form Data: ", data);
    // Open the OTP modal when email is submitted
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-6">
        <div className="max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* User Role Dropdown */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">User Role</label>
              <select
                {...register("role", { required: "User role is required" })}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
              >
                <option value="">Select a role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
              {errors.role && <p className="text-red-500 text-xs">{errors.role.message}</p>}
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Invalid email format",
                  },
                })}
                placeholder="Enter your email"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
              />
              {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
            </div>

            {/* Verify Email Button with Icon */}
            <button 
              type="button" 
              onClick={() => setIsModalOpen(true)} 
              disabled={isVerifyButtonDisabled} 
              className={`flex items-center justify-center space-x-1 w-auto py-1 px-2 text-sm font-bold text-white rounded transition duration-300 ${
                isVerifyButtonDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-700'
              }`}
            >
              <CheckIcon className="w-4 h-4" aria-hidden="true" /> {/* Icon */}
              <span>Verify Email</span>
            </button>

            {/* Password Field */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                  maxLength: {
                    value: 20,
                    message: "Password cannot exceed 20 characters",
                  },
                  pattern: {
                    value: /(?=.*[0-9])(?=.*[!@#$%^&*])/,
                    message: "Password must contain at least one number and one special character",
                  },
                })}
                placeholder="Enter your password"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
              />
              {errors.password && (
                <p className="text-red-500 text-xs">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                {...register("confirmPassword", {
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                placeholder="Confirm your password"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Sign Up
            </button>

            {/* Link to Login Page */}
            <p className="mt-4 text-center">
              Already signed up?{" "}
              <Link to="/login" className="text-blue-500 hover:text-blue-700 font-semibold">
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right Side - Image */}
      <div
        className="hidden md:block w-1/2 bg-cover bg-no-repeat bg-center"
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/29484238/pexels-photo-29484238/free-photo-of-minimalist-indoor-plant-decor-with-modern-furniture.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
        }}
      >
        {/* Additional content can go here if needed */}
      </div>

      {/* OTP Modal */}
      <OtpModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Register;