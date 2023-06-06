import React,{useState, useEffect} from 'react'
import Layout from "../../components/Layout"
import { useLocation} from "react-router-dom";
import { usePaystackPayment } from 'react-paystack';
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useSearchParams } from 'react-router-dom'; 
import { useBuyElectricityMutation, useUpdateWalletMutation, useInitializePaymentMutation, useCheckPaymentRefMutation } from '../../features/api/apiSlice';
const DetailsPage = () =>{
    const [searchParams, setSearchParams] = useSearchParams();
    const ref = searchParams.get('reference')
   
    

    const [servicecharge, setServicecharge] = useState(100)
    const location = useLocation();
    const mmdata = location.state;
    const mdata = JSON.parse(localStorage.getItem("mdata"));
    const user = JSON.parse(localStorage.getItem("user"));
    
   
    const total = parseInt(mdata?.amount) + parseInt(servicecharge)
   // const user = useSelector(state => state.user.value);
    const [errormsg, setErrormsg] = useState()
    const navigate = useNavigate();

    const [BuyElectricity, data] = useBuyElectricityMutation()
    const [UpdateWallet] = useUpdateWalletMutation()
    const [InitializePayment, result] = useInitializePaymentMutation()
    const [GetRef, checkref] = useCheckPaymentRefMutation()





   

    const config = {
        reference: (new Date()).getTime().toString(),
        email: user?.email,
        amount: total*100,
       // pk_test_f03073e7ac32abe21bfe6b988f7820ac5d86bdc4
        // publicKey: 'pk_live_55702f338e11ec554999f75824b1764a65172075',
        publicKey: 'pk_test_f03073e7ac32abe21bfe6b988f7820ac5d86bdc4',
      };
      const payload = {
        amount:mdata?.amount,
        product_code: mdata?.product_code,
        meterNumber: mdata?.meterNumber,
        paymentmode: mdata?.paymentmode,
        total:total,
        
   
    }

      const onSuccess = (reference) => {
        // Implementation for whatever you want to do with reference and after success call.
        
        BuyElectricity(payload)
       //UpdateWallet({amount})
        console.log(reference);
       // navigate('/dashboard')

        };
        
        // you can call this function anything
        const onClose = () => {
        // implementation for  whatever you want to do when the Paystack dialog closed.
        console.log('closed')
        }
      const initializePayment = usePaystackPayment(config);

      const handleSubmit = () => {

        if(mdata.paymentmode === "card"){
            initializePayment(onSuccess, onClose)
        }

        if(mdata.paymentmode === "wallet"){
            BuyElectricity(payload)
        }
        if(mdata.paymentmode === "vendor"){
            BuyElectricity(payload)
        }
        if(mdata.paymentmode === "borrow"){

            InitializePayment({
                email: user?.email  
            })
           // BuyElectricity(payload)
        }

        console.log("this is result", result?.data?.data)
       if(result?.data?.data){
          window.open(`${result?.data?.data}/`, "_self");

       }

      
      
      }

      if(data.status === "fulfilled"){ 
        console.log(data.data)
         navigate('/summary',{
         state: {
             data: data.data.data,
             amount:mdata.amount,
             product_code: mdata.product_code,
             meterNumber: mdata.meterNumber,
             paymentmode: mdata.paymentmode,
             total:total,
             servicecharge,
             userType:"user",
             email:user?.email,
             phoneNumber:user?.phoneNumber,
             authCode:checkref?.data?.data?.authorization?.authorization_code
         }
        })
        
     }
     

    if(data.status === "rejected"){
        setTimeout(()=>{
            navigate('/dashboard')
        }, 6000)
    }

    

    useEffect(()=>{
        if(ref){
            const payload = {
                ref
            }
            GetRef(payload)   
             }
           

    },[ref])


    useEffect(()=>{
        if(checkref?.data?.data?.authorization?.authorization_code){
            const payload = {
                amount:mdata?.amount,
                product_code: mdata?.product_code,
                meterNumber: mdata?.meterNumber,
                paymentmode: mdata?.paymentmode,
                total:total,
            }
            BuyElectricity(payload)
    
        }
    },[checkref])

    console.log("check",checkref?.data?.data?.authorization?.authorization_code)

   






    return(
        <Layout
        child={ 
            <div className="flex justify-center  lg:ml-[35%] lg:mr-[35%] ml-2 mr-2 mt-10 flex-col">
                <h1 className="font-text text-center text-deepGrey font-semibold">Please Verify if this is your meter details</h1>
                {
            data.isError? ( <div className="mb-4 rounded-lg  px-6 py-2 text-base mt-3 text-center text-danger" role="alert">
            {data.error.data.msg}
        </div>):null
           }
                <div className="flex flex-row justify-between mt-10">
                   <p className="text-black">Meter name</p>
                    <div className="text-black">{mdata?.data?.name}</div>
                </div>
                <div className="flex flex-row justify-between mt-3">
                   <p className="text-black">Meter number</p>
                    <div className="text-black">{mdata?.data?.meterNumber}</div>
                </div>
                <div className="flex flex-row justify-between mt-3">
                   <p className="text-black">Disco</p>
                    <div className="text-black">{mdata?.product_code}</div>
                </div>
                <div className="flex flex-row justify-between mt-3">
                   <p className="text-black">Meter address</p>
                    <div className="text-black">{mdata?.data?.address}</div>
                </div>
                <div className="flex flex-row justify-between mt-3">
                   <p className="text-black">Email</p>
                    <div className="text-black">{user?.email}</div>
                </div>

                <div className="flex flex-row justify-between mt-3">
                   <p className="text-black">Phone number</p>
                    <div className="text-black">{user?.phoneNumber}</div>
                </div>
                <div className="flex flex-row justify-between mt-3">
                   <p className="text-black">Pay method</p>
                    <div className="text-black">{mdata?.paymentmode}</div>
                </div>
                <div className="flex flex-row justify-between mt-3">
                   <p className="text-black">Amount</p>
                    <div className="text-black">₦ {mdata?.amount}</div>
                </div>
                <div className="flex flex-row justify-between mt-3">
                   <p className="text-black">Service charge
                   </p>
                    <div className="text-black">₦ {servicecharge}</div>
                </div>
                <div className="flex flex-row justify-between mt-3">
                   <p className="text-black">Total
                   </p>
                    <div className="text-black">₦ {total}</div>
                </div>

                <div className="flex flex-row justify-between mt-10">
                <button 
                // disabled={disableBtn} 
                   onClick={() => {
                    handleSubmit()
                  }}
                   className=" w-full bg-accent text-white p-3 rounded-[5px] shadow h-[55px] ">
            
                      {
                          data.isLoading  || checkref.isLoading || result.isLoading ? <div className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                          </div>
                           : <span>Checkout ₦ {total}</span>
                      }
                     
            
                     
                    
                    
               
                  
                     
                       
                          </button>
                         
                </div>
              {
                mdata?.paymentmode === "borrow" ? <>
                 {
                user?.authCode ? null :  <p className="flex flex-row justify-between mt-5 text-sm text-center">50 Naira will be charged from your card for card verification but will be returned to your wallet upon verification,
                by clicking checkout you agree to Borrowlite's  T&C 
              </p>
               }
                </> : null
              }
            </div>
            
                
          }
        ></Layout>

    )
}

export default DetailsPage