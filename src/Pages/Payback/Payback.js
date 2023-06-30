import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { useLocation } from "react-router-dom";
import { usePaystackPayment } from "react-paystack";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { usePaybackAmountMutation } from "../../features/api/apiSlice";
import { m } from "framer-motion";
import { MobileLayoutWithNav } from "../../components/MobileLayout";

const Payback = (props) => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [error, setError] = useState();
  const config = {
    reference: new Date().getTime().toString(),
    email: props?.email,
    amount: amount * 100,
    // pk_test_f03073e7ac32abe21bfe6b988f7820ac5d86bdc4
    publicKey: "pk_live_55702f338e11ec554999f75824b1764a65172075",
    //publicKey: "pk_test_f03073e7ac32abe21bfe6b988f7820ac5d86bdc4",
  };
  const [Dopayback, data] = usePaybackAmountMutation();
  console.log("paybackk data", data);
  const onSuccess = (reference) => {
    Dopayback({ amount });

    // Implementation for whatever you want to do with reference and after success call.
    //Getpower()
    //UpdateWallet({amount})
    console.log(reference);

    // navigate("/dashboard");
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };
  const initializePayment = usePaystackPayment(config);

  const Pay = () => {
    if (amount) {
      initializePayment(onSuccess, onClose);
    } else {
      setError("Please enter an amount");
    }
  };

  console.log("all", data?.data?.msg);
  if (data?.data?.msg === "Balance updated successfully") {
    navigate("/dashboard");
  }

  return (
    <>
      {/* Desktop View */}
      <div className="hidden md:block">
        <div className="mt-4 flex justify-center ">
          <p className=" font-text text-red-500 flex justify-center mt-5 text-center lg:w-[25%] w-[100%]">
            {props.merror}
            <br></br>
            {error}
          </p>
        </div>
        <div className="mt-4 flex justify-center">
          <input
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
            placeholder="Enter Amount"
            type="text"
            className="lg:w-[25%] w-[100%] ml-5 mr-5 mt-2 p-3 border border-gray-300 rounded-[5px]  h-[55px] focus:outline-none focus:border-gray-400 focus:ring-0"
          />
        </div>
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => {
              Pay();
            }}
            className=" lg:w-[25%] w-[100%] ml-5 mr-5 bg-accent text-white p-3 rounded-[5px] shadow h-[55px] "
          >
            <span>Pay back</span>
          </button>
        </div>
      </div>

      {/* Mobile View */}

      <MobileLayoutWithNav
        child={
          <div>
            <div className="mt-4 flex justify-center ">
              <p className=" font-text text-red-500 flex justify-center mt-5 text-center lg:w-[25%] w-[100%]">
                {props.merror}
                <br></br>
                {error}
              </p>
            </div>
            <div className="mt-4 flex justify-center">
              <input
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
                placeholder="Enter Amount"
                type="text"
                className="lg:w-[25%] w-[100%] ml-5 mr-5 mt-2 p-3 border border-gray-300 rounded-[5px]  h-[55px] focus:outline-none focus:border-gray-400 focus:ring-0"
              />
            </div>
            <div className="mt-4 flex justify-center">
              <button
                onClick={() => {
                  Pay();
                }}
                className=" lg:w-[25%] w-[100%] ml-5 mr-5 bg-accent text-white p-3 rounded-[5px] shadow h-[55px] "
              >
                <span>Pay back</span>
              </button>
            </div>
          </div>
        }
      />
    </>
  );
};

export default Payback;
