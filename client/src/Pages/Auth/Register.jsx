import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Register = () => {
  const axiosPublic = useAxiosPublic()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [accountType, setAccountType] = useState("user");

  const onSubmit = async (data) => {
    const accountInfo = { ...data, accountType }
    console.log(accountInfo);
    try {
      
      const result = await axiosPublic.post('/register', accountInfo)
      console.log(result);

    }
    catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-primary">
          {accountType === "user" ? "User Registration" : "Agent Registration"}
        </h2>

        {/* Toggle Buttons */}
        <div className="flex justify-center mb-4">
          <button
            className={`px-4 py-2 mx-2 rounded-md ${accountType === "user" ? "bg-primary text-white" : "bg-gray-200"
              }`}
            onClick={() => setAccountType("user")}
          >
            User
          </button>
          <button
            className={`px-4 py-2 mx-2 rounded-md ${accountType === "agent" ? "bg-primary text-white" : "bg-gray-200"
              }`}
            onClick={() => setAccountType("agent")}
          >
            Agent
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              placeholder="John Cena"
              {...register("name", { required: "Name is required" })}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="example@mail.com"
              {...register("email", { required: "Email is required" })}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* 5-Digit PIN */}
          <div className="mb-4">
            <label htmlFor="pin" className="block text-sm font-medium text-gray-700">
              5-Digit PIN
            </label>
            <input
              type="password"
              id="pin"
              placeholder="Ente 5 Digit PIN"
              {...register("pin", {
                required: "PIN is required",
                minLength: {
                  value: 5,
                  message: "PIN must be exactly 5 digits",
                },
                maxLength: {
                  value: 5,
                  message: "PIN must be exactly 5 digits",
                },
                pattern: {
                  value: /^\d{5}$/,
                  message: "PIN must be a 5-digit number",
                },
              })}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
            />
            {errors.pin && (
              <p className="text-error text-sm mt-1">{errors.pin.message}</p>
            )}
          </div>

          {/* Mobile Number */}
          <div className="mb-4">
            <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
              Mobile Number
            </label>
            <input
              type="text"
              id="mobile"
              placeholder="01234567890"
              {...register("mobile", {
                required: "Mobile Number is required",
                pattern: {
                  value: /^\d{11}$/,
                  message: "Mobile Number must be 11 digits",
                },
              })}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
            />
            {errors.mobile && (
              <p className="text-error text-sm mt-1">{errors.mobile.message}</p>
            )}
          </div>

          {/* NID */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">NID</label>
            <input
              type="text"
              placeholder="Enter your NID"
              {...register("nid", {
                required: "NID is required",
                pattern: {
                  value: /^\d{10}$/,
                  message: "NID must be 10 digits",
                },
              })}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
            {errors.nid && <p className="text-red-500 text-sm">{errors.nid.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-center">
          Already have an account? <Link to="/login" className="text-secondary hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
