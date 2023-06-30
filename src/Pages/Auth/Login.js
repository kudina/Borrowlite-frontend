import React, { useState } from "react";
import Header from "../../components/Header";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/img/logo.png";

import { useLoginMutation } from "../../features/api/apiSlice";
import MobileLayout from "../../components/MobileLayout";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [disableBtn, setDisableBtn] = useState(false);
  const [feedBack, setFeedBack] = useState("");
  const navigate = useNavigate();

  const [Login, { isLoading, isError }] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      phoneNumber,
      password,
    };
    const data = await Login(payload);

    if (isLoading) {
      setDisableBtn(true);
    }
    if (!isLoading) {
      setDisableBtn(false);
    }
    if (data?.data?.msg === "Login Successful") {
      localStorage.setItem("accessToken", data?.data?.accessToken);
      navigate("/dashboard");
    } else {
      setFeedBack(data?.error?.data?.msg);
    }
  };

  return (
    // full with page with input fields for phone number and password and a button to submit the form using tailwindcss, the form should be centered on the page and the button should be a primary button with a card around it  add form validation to the phone number field and the password field
    <>
      {/* Desktop view */}
      <div className="hidden md:flex flex-col items-center justify-center h-screen bg-white sm">
        <Header />
        <div className="lg:w-1/3 bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl  font-body text-center text-gray-900">
            Sign in to your account
          </h1>
          <h4 className="text-center text-cgray font-body ">
            Login to start borrowing or buying light.
          </h4>

          {isError ? (
            <div
              className="mb-4 rounded-lg  px-6 py-2 text-base mt-3 text-center text-danger"
              role="alert"
            >
              {feedBack}
            </div>
          ) : null}

          <form className="mt-6">
            <div>
              <input
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
                placeholder="Phone number or email"
                type="text"
                className="w-full mt-2 p-3 border border-gray-300 rounded-[5px]  h-[55px] focus:outline-none focus:border-gray-400 focus:ring-0"
              />
            </div>
            <div className="mt-4">
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
                disabled={disableBtn}
                onClick={handleSubmit}
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
                  <span>Login</span>
                )}
              </button>
            </div>
            {/* add a link to the forgot password page */}
            <div className="mt-4 flex items-center justify-between">
              <span className="border-b w-1/5 md:w-1/4"></span>
              <Link
                to="/RecoverPassword"
                className="text-xs text-gray-500 uppercase hover:underline"
              >
                Forgot Password?
              </Link>
              <span className="border-b w-1/5 md:w-1/4"></span>
            </div>
          </form>
        </div>
      </div>

      {/* Mobile View */}

      <MobileLayout
        child={
          <>
            <h1 className="text-2xl  font-body text-center text-gray-900">
              Sign in to your account
            </h1>
            <h4 className="text-center text-cgray font-body ">
              Login to start borrowing or buying light.
            </h4>

            {isError ? (
              <div
                className="mb-4 rounded-lg  px-6 py-2 text-base mt-3 text-center text-danger"
                role="alert"
              >
                {feedBack}
              </div>
            ) : null}

            <form className="mt-6">
              <div>
                <input
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                  }}
                  placeholder="Phone number or email"
                  type="text"
                  className="w-full mt-2 p-3 border border-gray-300 rounded-[5px]  h-[55px] focus:outline-none focus:border-gray-400 focus:ring-0"
                />
              </div>
              <div className="mt-4">
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
                  disabled={disableBtn}
                  onClick={handleSubmit}
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
                    <span>Login</span>
                  )}
                </button>
              </div>
              {/* add a link to the forgot password page */}
              <div className="mt-4 flex items-center justify-between">
                <span className="border-b w-1/5 md:w-1/4"></span>
                <Link
                  to="/RecoverPassword"
                  className="text-xs text-gray-500 uppercase hover:underline"
                >
                  Forgot Password?
                </Link>
                <span className="border-b w-1/5 md:w-1/4"></span>
              </div>
            </form>
          </>
        }
      />
    </>
  );
};

export default Login;
