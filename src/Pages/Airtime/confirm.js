import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { usePaystackPayment } from "react-paystack";
import {
  useUpdateWalletMutation,
  useGetCurrentUserQuery,
  useBuyairtimeMutation,
  useAirtimestatusMutation,
} from "../../features/api/apiSlice";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Reminder from "../../assets/img/reminder.png";

const Confirm = () => {
  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState("07015533911");
  const [product_code, setProduct_code] = useState("");
  const [paymentmode, setPaymentmode] = useState();
  const [disableBtn, setDisableBtn] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const { data: userData } = useGetCurrentUserQuery();
  const email = userData?.email;
  const [UpdateWallet] = useUpdateWalletMutation();

  const {
    data: result,
    isError,
    error: serverError,
  } = useGetCurrentUserQuery({}, { refetchOnMountOrArgChange: true });
  const user = result;

  const [Checkstatus, data = [], isSuccess] = useAirtimestatusMutation();
  const [ref, setRef] = useState("");

  const location = useLocation();
  const newdata = location.state;

  useEffect(() => {
    if (isError && serverError?.status === 401) {
      navigate("/");
      console.log(error);
    }
  }, [isError, serverError]);

  useEffect(() => {
    Checkstatus({
      orderId: newdata.ref,
      phone: newdata.phone,
      amount: newdata.amount,
      product_code: newdata.product_code,
      paymentmode: newdata.paymentmode,
    });
  }, []);

  return (
    <Layout
      child={
        <div className="flex  justify-around lg:mt-[15%] mt-[20%]">
          <div className="w-full ">
            <div className="mt-4 flex justify-center text-center">
              {data?.data?.data?.data?.status === "COMPLETED" ? (
                <div className="">
                  <div>
                    <img
                      src={Reminder}
                      className="w-[10%] h-[30%] ml-[45%] mb-5"
                    />
                  </div>
                  Your transactiion was Successful <br></br>
                  <Link to="/dashboard">
                    <div className="mt-3 text-black"> Return Home</div>
                  </Link>
                </div>
              ) : null}
              {data?.data?.data?.data?.status === "PENDING" ? (
                <div className="align-center ">
                  <div>
                    <img
                      src={Reminder}
                      className="w-[10%] h-[30%] ml-[45%] mb-5"
                    />
                  </div>
                  Your transaction is Pending <br></br>please check back later
                  <br></br>
                  <Link to="/dashboard">
                    <div className="mt-3 text-black"> Return Home</div>
                  </Link>
                </div>
              ) : null}
              {data?.data?.data?.data?.status === "FAILD" ? (
                <div className="align-center">
                  <div>
                    <img
                      src={Reminder}
                      className="w-[10%] h-[30%] ml-[45%] mb-5"
                    />
                  </div>
                  Your transaction was not Successful please try again <br></br>
                  <Link to="/dashboard">
                    <div className="mt-3 text-black"> Return Home</div>
                  </Link>
                </div>
              ) : null}

              {!data?.data?.data?.data?.status ? (
                <div className="justify-center ">
                  <div
                    className=" mt-5 mb-5 inline-block h-20 w-20 animate-spin
                  rounded-full border-4 border-solid border-current 
                  border-r-transparent align-[-0.125em]
                   motion-reduce:animate-[spin_1.5s_linear_infinite]  text-accent"
                    role="status"
                  ></div>
                  <div className="">Processing... Please wait</div>
                </div>
              ) : null}
            </div>

            <div className="mt-4 flex justify-center">
              {/* <button
                disabled={disableBtn}
                onClick={() => {}} className="lg:w-[25%] w-[100%] ml-5 mr-5 bg-accent text-white p-3 rounded-[5px] shadow h-[55px] ">
                <span> Checkout</span>
              </button> */}
            </div>
          </div>
        </div>
      }
    ></Layout>
  );
};

export default Confirm;
{
  /* <div className="justify-center ">
<div className="ml-9 mt-5 mb-5 inline-block h-20 w-20 animate-spin
 rounded-full border-4 border-solid border-current 
 border-r-transparent align-[-0.125em]
  motion-reduce:animate-[spin_1.5s_linear_infinite]  text-accent"
  role="status">
  

</div>
<div className="">Processing... Please wait</div>
</div> */
}
