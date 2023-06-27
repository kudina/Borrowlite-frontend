import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { usePaystackPayment } from "react-paystack";
import {
  useUpdateWalletMutation,
  useGetCurrentUserQuery,
  useBuyairtimeMutation,
  useAirtimestatusMutation
} from "../../features/api/apiSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Airtime = () => {
  const [amount, setAmount] = useState("");
  // const [phone, setPhone] = useState("07015533911")
  const [phone, setPhone] = useState('')
  const [product_code, setProduct_code] = useState("")
  const [paymentmode, setPaymentmode] = useState()
  const [disableBtn, setDisableBtn] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("")
  const [msg, setMsg] = useState('')
  const [duration, seetDuration] = useState('')
  const { data: userData } = useGetCurrentUserQuery();
  const email = userData?.email;
  const [UpdateWallet] = useUpdateWalletMutation();

  const[newData, setNewData] = useState('')

  const { data:result, isError } = useGetCurrentUserQuery({}, { refetchOnMountOrArgChange: true });
  const user = result
  const [Action, data] = useBuyairtimeMutation()
  const[Checkstatus, airtimedata = [],  isSuccess] = useAirtimestatusMutation()
  const [ref, setRef] = useState('')

  const payload ={
    phone,
    amount,
    product_code,
    paymentmode, 
    duration,
    transactionType:'airtime'

  }


  const config = {
    reference: new Date().getTime().toString(),
    email: email,
    amount: amount * 100,
    // pk_test_f03073e7ac32abe21bfe6b988f7820ac5d86bdc4
    // publicKey: 'pk_live_55702f338e11ec554999f75824b1764a65172075',
    publicKey: "pk_live_55702f338e11ec554999f75824b1764a65172075",
  };

  const onSuccess = (reference) => {
    Action(payload)
  };
  const onClose = () => {
  
  ;
  };

  const initializePayment = usePaystackPayment(config);

  


  const Validation = ()=>{
    if(!amount){
        return setError('Amount is required')
      }
      if(!product_code){
        return setError('Please select a your network')
      }
      if(!phone){
        return setError('Phone number is required')
      }
      if(!paymentmode){
        return setError('Select Payment Mode')
      }
      if(paymentmode === "wallet"){
        const requiredFunds = parseInt(amount);
        const balance = user?.balance
        if(balance < requiredFunds){
          return setError(`You do not have sufficient funds in your account. You need ₦${requiredFunds} in your wallet.`)
  
        }else{
          Action(payload)

        }

      }

      if(paymentmode === "borrow"){
        if(amount > 1000){
          return setError("you can not borrow more than 1000 Naira at the moment")
        }


      }
     
  }


  const GetAirtime =()=>{
    Validation()
    //setDisableBtn(true)
    // if(paymentmode === "wallet"){
    //       Action(payload)
    //   }
      
      if(paymentmode === "card"){
        initializePayment(onSuccess, onClose);
      }

      // if(paymentmode === "borrow"){
      //   Action(payload)
      // }
     
  } 

useEffect(()=>{
    if(data?.data?.data?.recharge_id){
        setRef(data?.data?.data?.recharge_id)
        navigate("/confirm", {
          state: {
            ref: data?.data?.data?.recharge_id,
            phone,
            amount,
            product_code,
            paymentmode
          },
        });
    }
   

    

},[data, ref])


  

  return (
    <Layout
      child={
        <div className="flex items-center justify-around lg:mt-[15%] mt-[20%]">
          <div className="w-full ">
            <h1 className="font-text text-center text-deepGrey font-semibold">
              Airtime with Borrowlite
            </h1>

            <div className="mt-4 flex justify-center ">
            {
                msg? <p className=" font-text text-green flex justify-center mt-5 text-center lg:w-[25%] w-[100%]">
                {msg}
            </p> : null
            }
                  <p className=" font-text text-red-500 flex justify-center mt-5 text-center lg:w-[25%] w-[100%]">
                      {error}
                  </p>
                  </div>

            <div className="mt-4 flex justify-center">
              <input
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                placeholder="080680..."
                type="text"
                className="lg:w-[25%] w-[100%] ml-5 mr-5 mt-2 p-3 border border-gray-300 rounded-[5px]  h-[55px] focus:outline-none focus:border-gray-400 focus:ring-0"
              />
            </div>
            <div className="mt-4 flex justify-center">
              <input
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
                placeholder="Amount"
                type="text"
                className="lg:w-[25%] w-[100%] ml-5 mr-5 mt-2 p-3 border border-gray-300 rounded-[5px]  h-[55px] focus:outline-none focus:border-gray-400 focus:ring-0"
              />
            </div>

            <div className="mt-4 flex justify-center">
                <select
                  value={product_code}
                  name="product_code"
                  onChange={(e) => setProduct_code(e.target.value)}
                  className="lg:w-[25%] w-[100%] ml-5 mr-5 mt-2 p-3 border border-gray-300 rounded-[5px]  h-[55px] focus:outline-none focus:border-gray-400 focus:ring-0"
                >
                  <option disabled selected>
                    Select your network
                  </option>
                  <option value="9mobile_custom">9mobile NG</option>
                  <option value="glo_custom">Glo NG</option>
                  <option value="mtn_custom">Mtn NG</option>
                  <option value="airtel_custom">Airtel NG</option>
                
               
                 
                </select>
              </div>
              <div className="mt-4 flex justify-center">
                <select
                  value={paymentmode}
                  name="paymentmode"
                  onChange={(e) => setPaymentmode(e.target.value)}
                  className="lg:w-[25%] w-[100%] ml-5 mr-5 mt-2 p-3 border border-gray-300 rounded-[5px]  h-[55px] focus:outline-none focus:border-gray-400 focus:ring-0"
                >
                  <option disabled selected>
                    Select your payment method
                  </option>
                  <option value="wallet">Wallet</option>
                  <option value="card">Card</option>
                  {/* <option value="borrow">Borrow</option> */}
                </select>
              </div>

            <div className="mt-4 flex justify-center">
              <button
                disabled={disableBtn}
                onClick={() => {
                    GetAirtime()
                 // initializePayment(onSuccess, onClose);
                }}
                className="lg:w-[25%] w-[100%] ml-5 mr-5 bg-accent text-white p-3 rounded-[5px] shadow h-[55px] "
              >
               {
                data?.isLoading ? <div
                className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
              >
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                  Loading...
                </span>
              </div> : <span> Checkout</span>
               }
              </button>
            </div>
          </div>
        </div>
      }
    ></Layout>
  );
};

export default Airtime;
