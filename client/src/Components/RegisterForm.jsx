import React from 'react';

const RegisterForm = () => {
    return (
        <div>
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
        </div>
    );
};

export default RegisterForm;