import React, { useState } from "react";
import Layout from "../components/Layout";
import { useLocation } from "react-router-dom";
import { usePaystackPayment } from "react-paystack";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  useBuyElectricityMutation,
  useUpdateWalletMutation,
  useInitializePaymentMutation,
  useCheckPaymentRefMutation,
  useGetCurrentUserQuery,
} from "../features/api/apiSlice";

const Modal = ({ visible, error }) => {
  const {
    data: result,
    isSuccess,
    isError,
    error,
  } = useGetCurrentUserQuery({}, { refetchOnMountOrArgChange: true });
  const [amount, setAmount] = useState();
  if (!visible) return null;
  const user = result;

  const config = {
    reference: new Date().getTime().toString(),
    email: user?.email,
    amount: amount * 100,
    // pk_test_f03073e7ac32abe21bfe6b988f7820ac5d86bdc4
    // publicKey: 'pk_live_55702f338e11ec554999f75824b1764a65172075',
    publicKey: "pk_test_f03073e7ac32abe21bfe6b988f7820ac5d86bdc4",
  };
  const onSuccess = (reference) => {};

  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };
  //     const initializePayment = usePaystackPayment(config);

  //   const Pay = ()=>{
  //     initializePayment(onSuccess, onClose)
  //   }

  useEffect(() => {
    if (isError && error?.status === 401) {
      navigate("/");
      console.log(error);
    }
  }, [isError, error]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white py-5 px-6  rounded w-[25%]">
        <p className="font-text text-red-500  mb-5 flex justify-center mt-5   text-center">
          {error}
        </p>

        <div className="flex flex-col">
          <div className="mb-5">
            <input
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
              }}
              placeholder="Enter Amount"
              type="text"
              className="w-full  p-3 border border-gray-300 rounded-[5px]  h-[55px] focus:outline-none focus:border-gray-400 focus:ring-0"
            />
          </div>
        </div>
        <div className="text-center">
          <button
            //disabled={disableBtn}
            onClick={() => {}}
            className="w-full  bg-accent text-white p-3 rounded-[5px] shadow h-[55px] "
          >
            Pay back
            {/* {
                          data.isLoading ?  <div className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                          </div>
                           : <span>Verify meter number</span>
                      }
             */}
            {/*   */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
