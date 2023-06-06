import React, { useState } from "react";
import Header from "../../components/Header";
import { useSignupMutation } from "../../features/api/apiSlice";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [vendorCode, setVendorCode] = useState("");
  const [feedBack, setFeedBack] = useState("");
  const [userType, setUserType] = useState();
  const [Signup, { isLoading, isError }] = useSignupMutation();

  const handlesubmit = async () => {
    const payload = {
      firstName: fullName,
      email,
      phoneNumber,
      password,
      vendorCode,
      userType,
    };
    const data = await Signup(payload);
    console.log("this is data", data);

    if (data.status === "fulfilled") {
      navigate("/login");
    } else {
      setFeedBack(data?.error?.data?.msg);
    }
  };

  return (
    // full with page with input fields for phone number and password and a button to submit the form using tailwindcss, the form should be centered on the page and the button should be a primary button with a card around it  add form validation to the phone number field and the password field
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <Header />
      <div className="lg:w-1/3 bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl  font-body text-center text-gray-900">
          Create an account
        </h1>
        <h4 className="text-center text-cgray font-body">
          Sign up to get started with Borrowlite.
        </h4>
        <div className="mt-6">
          {isError ? (
            <div
              className="mb-4 rounded-lg  px-6 py-2 text-base mt-3 text-center text-danger"
              role="alert"
            >
              {feedBack}
            </div>
          ) : null}
          <div>
            <input
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
              }}
              placeholder="Full name"
              type="text"
              className="w-full mt-2 p-3 border border-gray-300 rounded-[5px]  h-[55px] focus:outline-none focus:border-gray-400 focus:ring-0"
            />
          </div>
          <div className="mt-2">
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Email address"
              type="email"
              className="w-full mt-2 p-3 border border-gray-300 rounded-[5px] h-[55px] focus:outline-none focus:border-gray-400 focus:ring-0"
            />
          </div>
          <div className="mt-2">
            <input
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
              placeholder="Phone number"
              type="number"
              className="w-full mt-2 p-3 border border-gray-300 rounded-[5px] h-[55px] focus:outline-none focus:border-gray-400 focus:ring-0"
            />
          </div>

          <div className="mt-2 flex justify-center">
            <select
              value={userType}
              name="userType"
              onChange={(e) => setUserType(e.target.value)}
              className="w-full mt-2 p-3 border border-gray-300 rounded-[5px] h-[55px] focus:outline-none focus:border-gray-400 focus:ring-0"
            >
              <option disabled selected>
                Select your user Type
              </option>
              <option value="user">Customer</option>
              <option value="vendor">Vendor</option>
            </select>
          </div>

          {userType === "vendor" ? (
            <div className="mt-2">
              <input
                value={vendorCode}
                onChange={(e) => {
                  setVendorCode(e.target.value);
                }}
                placeholder="Create Vendor Code"
                type="password"
                className="w-full mt-2 p-3 border border-gray-300 rounded-[5px] h-[55px] focus:outline-none focus:border-gray-400 focus:ring-0"
              />
            </div>
          ) : null}
          <div className="mt-2">
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Password"
              type="password"
              className="w-full mt-2 p-3 border border-gray-300 rounded-[5px] h-[55px] focus:outline-none focus:border-gray-400 focus:ring-0"
            />
          </div>
          <div className="mt-6">
            <button
              onClick={() => {
                handlesubmit();
              }}
              className="w-full bg-accent text-white p-3 rounded-[5px] shadow h-[55px] "
            >
              {isLoading ? (
                <div
                  className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status"
                >
                  <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Loading...
                  </span>
                </div>
              ) : (
                <span>Sign Up</span>
              )}
            </button>
          </div>
          {/* add a link to the forgot password page */}
          <div className="mt-4 text-center">
            <a
              href="#"
              className="text-xs text-center  text-gray-500  hover:underline"
            >
              Don't have an account?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
