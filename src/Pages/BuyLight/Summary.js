import React,{useState, useEffect} from 'react'
import Layout from "../../components/Layout"
import { useLocation} from "react-router-dom";
import { usePaystackPayment } from 'react-paystack';
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from 'react-router-dom'; 
import {  useCheckBuyRefMutation , useSaveTransactionMutation} from '../../features/api/apiSlice';


const Summary = () =>{
  
    const location = useLocation();
    const mdata = location.state;
    const orderId = mdata.data.recharge_id
    const [servicecharge, setServicecharge] = useState(100)

    const [Checkref, data] =  useCheckBuyRefMutation()

    const payload = {
        orderId,
        email: mdata.email,
        phoneNumber: mdata.phoneNumber,
        amount: parseInt(mdata.amount),
        servicecharge: mdata.servicecharge,
        paymentmode: mdata.paymentmode,
        meter_number: parseInt(mdata.meterNumber),
        authCode:mdata.authCode

    }

    console.log(payload)
 
    useEffect(()=>{
    Checkref(payload)  
    },[])
    const total = parseInt(mdata?.amount) + parseInt(servicecharge)

    const intrest = parseInt(mdata?.amount * 0.25);
    const paybackamount = parseInt(mdata?.amount * 0.25)  + total

   return(
    <Layout
    child={
       <>
       {/* {
        V ?  */}
        
        <div className="flex justify-center  lg:ml-[35%] lg:mr-[35%] ml-2 mr-2 mt-10 flex-col">
        <h1 className="font-text text-center text-deepGrey font-semibold">Thank you for using Borrowlite</h1>
       
        <div className="flex flex-row justify-between mt-10">
           <p className="text-black">Meter name</p>
            <div className="text-black">{data?.data?.data?.data?.customer_name}</div>
        </div>

         <div className="flex flex-row justify-between mt-3">
           <p className="text-black">Meter number</p>
            <div className="text-black">{data?.data?.data?.data?.meter_number}</div>
        </div>
        <div className="flex flex-row justify-between mt-3">
           <p className="text-black">Disco</p>
            <div className="text-black">{mdata?.product_code}</div>
        </div>
        <div className="flex flex-row justify-between mt-3">
           <p className="text-black">Meter address</p>
            <div className="text-black">{data?.data?.data?.data?.customer_address}</div>
        </div>
        <div className="flex flex-row justify-between mt-3">
           <p className="text-black">Payment method</p>
            <div className="text-black">{mdata?.paymentmode}</div>
        </div>
        <div className="flex flex-row justify-between mt-3">
           <p className="text-black">Amount</p>
            <div className="text-black">₦ {mdata?.amount}</div>
        </div>
        <div className="flex flex-row justify-between mt-3">
           <p className="text-black">Service charge
           </p>
            <div className="text-black">₦ {mdata?.servicecharge}</div>
        </div>
        {
                    mdata.paymentmode === "borrow" ? <div className="flex flex-row justify-between mt-3">
                    <p className="text-black">Intrest
                    </p>
                     <div className="text-black">₦ {intrest}</div>
                 </div> : null
                }
        <div className="flex flex-row justify-between mt-3">
           <p className="text-black">Token
           </p>
            <div className="text-black">{data?.data?.data?.data?.token}</div>
        </div>
        <div className="flex flex-row justify-between mt-3">
           <p className="text-black">Units
           </p>
            <div className="text-black">₦ {data?.data?.data?.data?.units}</div>
        </div>
        <div className="flex flex-row justify-between mt-3">
           <p className="text-black">Reference No
           </p>
            <div className="text-black"> {data?.data?.data?.data?.reference}</div>
        </div>
        <div className="flex flex-row justify-between mt-3">
                   <p className="text-black">Total
                   </p>
                    <div className="text-black"> {mdata?.paymentmode  === "borrow" ? <span>₦ {paybackamount}</span> :  <span>₦ {total}</span> }</div>
                </div>

        {/* <div className="flex flex-row justify-between mt-10">
        <button 
        // disabled={disableBtn} 
           onClick={() => {
            handleSubmit()
          }}
           className=" w-full bg-accent text-white p-3 rounded-[5px] shadow h-[55px] ">
    
              {
                  data.isLoading ?  <div className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                  <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                  </div>
                   : <span>Checkout ₦ {total}</span>
              }
             
    
                  </button>
        </div> */}
    </div> 
    
    {/* : <div>
    <div className="flex justify-center  lg:ml-[35%] lg:mr-[35%] ml-2 mr-2 mt-10 flex-col">
        <h1 className="font-text text-center text-deepGrey font-semibold">There was an Error with your Transaction, click reload, if error persist contact admin with reference code {data?.data?.data?.data?.reference}</h1>
        </div>

    </div>
       } */}
       
       </>
    
    }></Layout>
   )

}

export default Summary