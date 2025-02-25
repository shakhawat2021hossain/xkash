import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";

const Login = () => {
  const axiosPublic = useAxiosPublic()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const loginInfo = data;
    console.log(loginInfo);
    try {
      const { data } = await axiosPublic.post('/login', loginInfo, { withCredentials: true });
      console.log(data);
      toast.success("logged in")
      navigate('/')

    }
    catch (err) {
      console.log(err);
    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-light">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-primary text-center">
          Login
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Mobile Number or Email */}
          <div className="mb-4">
            <label htmlFor="loginId" className="block text-sm font-medium text-gray-700">
              Mobile Number / Email
            </label>
            <input
              type="text"
              id="loginId"
              placeholder="xkash@mfs.com"
              {...register("loginId", { required: "Mobile Number or Email is required" })}
              className="mt-1 p-2 w-full border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
            />
            {errors.loginId && (
              <p className="text-error text-sm mt-1">{errors.loginId.message}</p>
            )}
          </div>

          {/* PIN */}
          <div className="mb-6">
            <label htmlFor="pin" className="block text-sm font-medium text-gray-700">
              PIN
            </label>
            <input
              type="password"
              id="pin"
              placeholder="Enter PIN"
              {...register("pin", { required: "PIN is required" })}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
            />
            {errors.pin && (
              <p className="text-error text-sm mt-1">{errors.pin.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-colors"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-text-muted">
          Don't have an account?{" "}
          <Link to="/register" className="text-secondary hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;