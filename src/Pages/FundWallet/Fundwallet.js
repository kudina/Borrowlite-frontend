import React, { useState } from "react";
import Layout from "../../components/Layout";
import { usePaystackPayment } from "react-paystack";
import {
  useUpdateWalletMutation,
  useGetCurrentUserQuery,
} from "../../features/api/apiSlice";
import { useNavigate } from "react-router-dom";
import { MobileLayoutWithNav } from "../../components/MobileLayout";

const Fundwallet = () => {
  const [amount, setAmount] = useState("");
  const [disableBtn, setDisableBtn] = useState(false);
  const navigate = useNavigate();
  const { data: userData } = useGetCurrentUserQuery();
  const email = userData?.email;
  const [UpdateWallet] = useUpdateWalletMutation();

  const config = {
    reference: new Date().getTime().toString(),
    email: email,
    amount: amount * 100,
    // pk_test_f03073e7ac32abe21bfe6b988f7820ac5d86bdc4
    publicKey: "pk_live_55702f338e11ec554999f75824b1764a65172075",
    //publicKey: "pk_test_f03073e7ac32abe21bfe6b988f7820ac5d86bdc4",
  };

  const onSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    //Getpower()
    UpdateWallet({ amount });
    console.log(reference);
    navigate("/dashboard");
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };

  const initializePayment = usePaystackPayment(config);

  return (
    <>
      {/* Desktop View */}
      <Layout
        child={
          <div className="flex items-center justify-around lg:mt-[15%] mt-[20%]">
            <div className="w-full ">
              <h1 className="font-text text-center text-deepGrey font-semibold">
                Fund your wallet
              </h1>
              <div className="mt-4 flex justify-center">
                <input
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                  }}
                  placeholder="Enter Amount"
                  type="text"
                  className="lg:w-[25%] w-[100%]  mt-2 p-3 border border-gray-300 rounded-[5px]  h-[55px] focus:outline-none focus:border-gray-400 focus:ring-0"
                />
              </div>
              <div className="mt-4 flex justify-center">
                <button
                  disabled={disableBtn}
                  onClick={() => {
                    initializePayment(onSuccess, onClose);
                  }}
                  className="lg:w-[25%] w-[100%] ml-5 mr-5 bg-accent text-white p-3 rounded-[5px] shadow h-[55px] "
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        }
      ></Layout>
      {/* Mobile View */}

      <MobileLayoutWithNav
        child={
          <div className="flex items-center justify-around lg:mt-[15%] mt-[20%]">
            <div className="w-full ">
              <h1 className="font-text text-center text-deepGrey font-semibold">
                Fund your wallet
              </h1>
              <div className="mt-4 flex justify-center">
                <input
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                  }}
                  placeholder="Enter Amount"
                  type="text"
                  className="lg:w-[25%] w-[100%] mt-2 p-3 border border-gray-300 rounded-[5px]  h-[55px] focus:outline-none focus:border-gray-400 focus:ring-0"
                />
              </div>
              <div className="mt-4 flex justify-center">
                <button
                  disabled={disableBtn}
                  onClick={() => {
                    initializePayment(onSuccess, onClose);
                  }}
                  className="lg:w-[25%] w-[100%]  bg-accent text-white p-3 rounded-[5px] shadow h-[55px] "
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        }
      />
    </>
  );
};

export default Fundwallet;
