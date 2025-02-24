import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-light">
      <div className="bg-white p-8 rounded-lg shadow-lg w-lg">
        <h2 className="text-2xl font-bold mb-6 text-primary text-center">
          Registration
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="John Cena"
              {...register("name", { required: "Name is required" })}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
            />
            {errors.name && (
              <p className="text-error text-sm mt-1">{errors.name.message}</p>
            )}
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

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="xkash@mfs.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
            />
            {errors.email && (
              <p className="text-error text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Account Type*/}
          <div className="mb-4">
            <label htmlFor="accountType" className="block text-sm font-medium text-gray-700">
              Account Type
            </label>
            <select
              id="accountType"
              {...register("accountType", { required: "Account Type is required" })}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="">Select Account Type</option>
              <option value="agent">Agent</option>
              <option value="user">User</option>
            </select>
            {errors.accountType && (
              <p className="text-error text-sm mt-1">{errors.accountType.message}</p>
            )}
          </div>

          {/* NID */}
          <div className="mb-6">
            <label htmlFor="nid" className="block text-sm font-medium text-gray-700">
              NID
            </label>
            <input
              type="text"
              id="nid"
              placeholder="Enter you NID"
              {...register("nid", {
                required: "NID is required",
                pattern: {
                  value: /^\d{10}$/,
                  message: "NID must be 10 digits",
                },
              })}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
            />
            {errors.nid && (
              <p className="text-error text-sm mt-1">{errors.nid.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-colors"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-text-muted">
          Already have an account?{" "}
          <Link to="/login" className="text-secondary hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;