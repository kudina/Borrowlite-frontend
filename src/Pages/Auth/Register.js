import React, { useState } from "react";
import Header from "../../components/Header";
import { useSignupMutation } from "../../features/api/apiSlice";
import { Link, useNavigate } from "react-router-dom";
import { InputSelect } from "../../components/Inputs";

const Register = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [vendorCode, setVendorCode] = useState("");
  const [feedBack, setFeedBack] = useState("");
  const [userType, setUserType] = useState(null);
  const [userTypeDisplay, setUserTypeDisplay] = useState(null);
  const [openUserType, setOpenUserType] = useState(false);
  const [Signup, { isLoading, isError }] = useSignupMutation();
  const [successFeedback, setSuccessFeedback] = useState("");

  const handlesubmit = async (e) => {
    const passwordPattern = /^(?=.*[a-zA-Z]){6,10}$/;
    const emailPattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    const phonePattern =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    setFeedBack("");
    if (!fullName) {
      return setFeedBack("Full name is required");
    }

    if (!emailPattern.test(email)) {
      setFeedBack("wrong email pattern");
      return;
    }
    if (!phonePattern.test(phoneNumber)) {
      return setFeedBack(
        "Invalide phone number, enter phone number like this 08068077531"
      );
    }

    if (!userType) {
      return setFeedBack("Please select user type");
    }

    if (password.length < 6) {
      return setFeedBack("Password requires atleast 6 characters");
    }
    if (userType === "vendor") {
      if (!vendorCode) {
        return setFeedBack("Vendor code is required");
      }
    }

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

    if (data?.data?.msg === "Signup successful") {
      //set time out
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      setSuccessFeedback("Signup successful");
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
          <div
            className="mb-4 rounded-lg  px-6 py-2 text-base mt-3 text-center text-danger"
            role="alert"
          >
            {feedBack}
          </div>

          <div
            className="mb-4 rounded-lg  px-6 py-2 text-base mt-3 text-center text-success"
            role="alert"
          >
            {successFeedback}
          </div>

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

          <InputSelect
            width="100%"
            pOnclick={() => setOpenUserType(!openUserType)}
            cOnclick={(type) => {
              setUserType(type.value);
              setUserTypeDisplay(type.name);
              setOpenUserType(false);
            }}
            open={openUserType}
            value={userType}
            fValue="Select your user type"
            dValue={userTypeDisplay}
            cList={[
              { value: "Customer", name: "Customer" },
              { value: "Vendor", name: "Vandor" },
            ]}
          />

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
