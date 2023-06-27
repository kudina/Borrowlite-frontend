import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { usePaystackPayment } from "react-paystack";
import { useSelector, useDispatch } from "react-redux";
import { useVerifyMeterMutation, useGetCurrentUserQuery } from "../../features/api/apiSlice";
import { Link, useNavigate } from "react-router-dom";

const BuyLight = () => {
  const [product_code, setProduct_code] = useState("");
  const [amount, setAmount] = useState("");
  const [meterNumber, setMeterNumber] = useState("");
  const [disableBtn, setDisableBtn] = useState(false);
  //const user = useSelector((state) => state.user.value);
  const [error, setError] = useState("");
  const [paymentmode, setPaymentmode] = useState();
  const [servicecharge, setServicecharge] = useState(100);
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [vendorCode, setVendorCode] = useState("");
  const [action, setAction] = useState('')

  const [Verifymeter, data=[]] = useVerifyMeterMutation();
  const { data:result, isSuccess, isError } = useGetCurrentUserQuery({}, { refetchOnMountOrArgChange: true });
  const user = result


  useEffect(()=>{
    if(data?.data?.data?.data?.text_status === "VERIFICATION SUCCESSFUL"){
      const mdata = {
            data: data.data.data.data,
            amount,
            meterNumber,
            paymentmode,
            product_code,
          };
          localStorage.setItem("mdata", JSON.stringify(mdata));
      
          navigate("/detailspage", {
            state: {
              data: data.data.data.data,
              amount,
              meterNumber,
              paymentmode,
              product_code,
            },
          });
    }else{
      if(data?.data?.data?.data?.text_status === "VERIFICATION FAILED"){
      setError('Verification failed, if you are sure your meter number is correct, then this could be a network issue, please try again later')
    }
  }
  },[data])



  

  // time interval

  const config = {
    reference: new Date().getTime().toString(),
    email: user?.email,
    amount: amount * 100,
    // pk_test_f03073e7ac32abe21bfe6b988f7820ac5d86bdc4
    publicKey: 'pk_live_55702f338e11ec554999f75824b1764a65172075',
    //publicKey: "pk_test_f03073e7ac32abe21bfe6b988f7820ac5d86bdc4",
  };

  const onSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    //Getpower()
    //UpdateWallet({amount})

    navigate("/dashboard");
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
  
  };
  const initializePayment = usePaystackPayment(config);
  const balanceerror = () => {
    if (amount > user?.balance) {
      return alert("here");
      setError(
        `"you do not sufficient funds in your account, you need ${
          amount + servicecharge
        } in your wallet `
      );
    }
  };

  const verifyMeter = () => {
    setError("");

    if (amount == "") {
      return setError("Please Enter Amount");
    }

    if (product_code == "") {
      return setError("Please Enter Product Code");
    }

    if (meterNumber == "") {
      return setError("meter number is required");
    }

    if (!paymentmode) {
      return setError("payment mode is required");
    }
    // if (paymentmode === "wallet" && parseInt(amount) > parseInt(user?.balance) + parseInt(servicecharge)) {
    //   const requiredFunds = parseInt(amount) + parseInt(servicecharge);
    //   return setError(
    //     `You do not have sufficient funds in your account. You need ₦${requiredFunds} in your wallet.`
    //   );
    // }

    if(paymentmode === "wallet"){
      const requiredFunds = parseInt(amount) + parseInt(servicecharge);
      const balance = user?.balance
      if(requiredFunds > balance){
        return setError(`You do not have sufficient funds in your account. You need ₦${requiredFunds} in your wallet.`)

      }
    }

    if (amount < 1000) {
      return setError("you can not buy light for less than ₦ 1000");
    }

    // if (paymentmode == "vendor" && vendorCode == !user?.vendorCode) {
    //   return setError("please enter a valid vendor code");
    // }

    if (
      paymentmode == "vendor" &&
      parseInt(amount) > parseInt(user?.balance) + servicecharge
    ) {
      return setError(
        `you do not have sufficient funds in your account, you need  ${
          parseInt(amount) + parseInt(servicecharge)
        } in your wallet `
      );
    }

    const payload = {
      meterNumber,
      product_code,
    };
    Verifymeter(payload);
  };

 // if (data?.status === "fulfilled") {
   // setAction(data?.data?.data?.data)
  //   if(data?.data?.data?.data?.text_status === "VERIFICATION SUCCESSFUL"){
  //   console.log("data here",data?.data?.data?.data)
  //   const mdata = {
  //     data: data.data.data.data,
  //     amount,
  //     meterNumber,
  //     paymentmode,
  //     product_code,
  //   };
  //   localStorage.setItem("mdata", JSON.stringify(mdata));

  //   navigate("/detailspage", {
  //     state: {
  //       data: data.data.data.data,
  //       amount,
  //       meterNumber,
  //       paymentmode,
  //       product_code,
  //     },
  //   });
  // }else{
  //   setError('Verification failed')
  // }
 // }

  const Details = () => {
    return <div>this is details</div>;
  };

  return (
    <Layout
      child={
        <>
          <div className="flex items-center justify-around lg:mt-[15%] mt-[20%] flex-col">
            <div className="w-full ">
              <h1 className="font-text text-center text-deepGrey font-semibold">
                Buy electricity from Borrowlite
              </h1>
              {/*show error */}
              <div className="mt-4 flex justify-center ">
                  <p className=" font-text text-red-500 flex justify-center mt-5 text-center lg:w-[25%] w-[100%]">
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
                <input
                  value={meterNumber}
                  onChange={(e) => {
                    setMeterNumber(e.target.value);
                  }}
                  placeholder="Enter your meter number"
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
                    Select your Disco
                  </option>
                  <option value="phed_prepaid_custom">PHED</option>
                  <option value="ibedc_prepaid_custom">IBEDC</option>
                  <option value="ikedc_prepaid_custom">IKEDC</option>
                  <option value="ekedc_prepaid_custom">EKEDC</option>
                  <option value="aedc_prepaid_custom">AEDC</option>
                  <option value="kedco_prepaid_custom">KEDCO</option>
                  <option value="kedc_prepaid_custom">KEDC</option>
                  {/* <option value="yedc_prepaid_custom">YEDC</option> */}
                  <option value="jedc_prepaid_custom">JEDC</option>
                  <option value="bedc_prepaid_custom">BEDC</option>
                  <option value="eedc_prepaid_custom">EEDC</option>
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
                  <option value="vendor">Vendor</option>
                </select>
              </div>
              {/* {paymentmode == "vendor" ? (
                <div className="mt-4 flex justify-center">
                  <input
                    value={vendorCode}
                    onChange={(e) => {
                      setVendorCode(e.target.value);
                    }}
                    placeholder="Enter Vendor Code"
                    type="password"
                    className="lg:w-[25%] w-[100%] ml-5 mr-5 mt-2 p-3 border border-gray-300 rounded-[5px]  h-[55px] focus:outline-none focus:border-gray-400 focus:ring-0"
                  />
                </div>
              ) : null} */}

              <div className="mt-4 flex justify-center">
                <button
                  disabled={disableBtn}
                  onClick={() => {
                    verifyMeter();
                  }}
                  className="lg:w-[25%] w-[100%] ml-5 mr-5 bg-accent text-white p-3 rounded-[5px] shadow h-[55px] "
                >
                  {data.isLoading ? (
                    <div
                      className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                      role="status"
                    >
                      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                        Loading...
                      </span>
                    </div>
                  ) : (
                    <span>Verify meter number</span>
                  )}

                  {/*   */}
                </button>
              </div>
            </div>
          </div>
        </>
      }
    ></Layout>
  );
};

export default BuyLight;
