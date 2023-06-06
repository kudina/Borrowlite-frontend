import React, {useState} from 'react'
import Header from '../../components/Header'
import { Link, useNavigate } from 'react-router-dom'; 


import {useSendOtpMutation } from '../../features/api/apiSlice';
import { useDispatch} from 'react-redux';

const RecoverPassword = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [phoneNumber, setPhoneNumber] = useState('')
  const [disableBtn, setDisableBtn] = useState(false)
  const [SendOtp, data, status] = useSendOtpMutation()
  

  const handleSubmit  = (e)=>{
    e.preventDefault()
    const payload = {
        phoneNumber, 
    }
   SendOtp(payload)
    if(data.isLoading) {
      setDisableBtn(true)
     }
     if(!data.isLoading) {
      setDisableBtn(false)
     }     
}

if(data.status === "fulfilled"){ 
  navigate('/verifycode')
} 





console.log("all good data", data.status)
  


  return (
    // full with page with input fields for phone number and password and a button to submit the form using tailwindcss, the form should be centered on the page and the button should be a primary button with a card around it  add form validation to the phone number field and the password field
    <div className="flex flex-col items-center justify-center h-screen bg-white">
        <Header/>
        <div className="lg:w-1/3 bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-2xl  font-body text-center text-gray-900">Recover your password</h1>
            <h4 className='text-center text-cgray font-body '>A password reset code will be sent to your phone number.</h4>
            {
            data.isError? ( <div className="mb-4 rounded-lg  px-6 py-2 text-base mt-3 text-center text-danger" role="alert">
            {data.error.data.msg}
        </div>):null
           }
            <form className="mt-6">
               
                <div className="mt-2">
                    <input
                    value={phoneNumber}
                    onChange={(e)=>{setPhoneNumber(e.target.value)}}
                     placeholder='Phone number' type="number" className="w-full mt-2 p-3 border border-gray-300 rounded-[5px] h-[55px] focus:outline-none focus:border-gray-400 focus:ring-0" />
                </div>
                
                <div className="mt-6">
                    <button 
                    disabled={disableBtn}  onClick={handleSubmit} 
                    className="w-full bg-accent text-white p-3 rounded-[5px] shadow h-[55px] ">Send password reset</button>
                </div>
              {/* add a link to the forgot password page */}
                <div className="mt-4 text-center">
                    <Link to="/login" href="#" className="text-sm text-center  text-gray-500  hover:underline">Know your password? Click to login.</Link>
                </div>
            </form>
        </div>
    </div>
    

  )
}



export default RecoverPassword