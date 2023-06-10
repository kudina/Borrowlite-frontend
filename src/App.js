import React from 'react';
import { Route, Routes, Redirect} from 'react-router-dom';

// import components
import Header from './components/Header';
import Hero from './components/Hero';
import Brands from './components/Brands';
import Home from './Pages/Home';
import AuthCodePage from './Pages/Auth/AuthCodePage';
import Login from './Pages/Auth/Login';
import Dashboard from './Pages/Dashboard/Index';
import Register from './Pages/Auth/Register';
import RecoverPassword from './Pages/Auth/RecoverPassword';
import VerifyCode from './Pages/Auth/VerifyCode';
import ChangePassword from './Pages/Auth/ChangePassword';
import { useSelector } from 'react-redux';
import Fundwallet from './Pages/FundWallet/Fundwallet'
import BuyLight from './Pages/BuyLight/BuyLight';
import DetailsPage from './Pages/BuyLight/DetailsPage';
import Summary from './Pages/BuyLight/Summary';
import BorrowLight from './Pages/Borrowlight/BorrowLight';
import { useGetCurrentUserQuery } from './features/api/apiSlice';
import Index from './Pages/Transaction/Index';
import ComingSoon from './Pages/ComingSoon/ComingSoon';
import Payback from './Pages/Payback/Payback';
import Paybackamount from './Pages/Payback/Paybackamount';


const App = () => {
  //const user = useSelector(state => state.user.value);
 

  const { data, isSuccess, isError } = useGetCurrentUserQuery({}, { refetchOnMountOrArgChange: true });
  console.log("me", data)

  //localStorage.setItem("user", JSON.stringify(data));
  

  
  

  

 
  return (
    <Routes> 
        
        <Route path='/' element={<Home/>} />
        <Route path='/AuthCodePage' element={<AuthCodePage/>} />
        <Route path='/Login' element={<Login/>} />
        <Route path='/Dashboard' element={ data ?  <Dashboard/> : <Home/>} /> 
        <Route path='/Register' element={<Register/>} />
        <Route path='/RecoverPassword' element={<RecoverPassword/>} />
        <Route path='/VerifyCode' element={<VerifyCode/>} />
        <Route path='/ChangePassword' element={<ChangePassword/>} />
        <Route path='/Fundwallet' element={<Fundwallet/>} />
        <Route path='/Buylight' element={<BuyLight/>} />
        <Route path='/DetailsPage' element={<DetailsPage/>} />
        <Route path='/Summary' element={<Summary/>} />
        <Route path='Borrowlight' element={<BorrowLight/>} />
        <Route path='/Transaction' element={<Index/>} />
        <Route path='/comingSoon' element={<ComingSoon/>} />
        <Route path='/Payback' element={<Payback/>} />
        <Route path='Paybackamount' element={<Paybackamount/>}/>
    </Routes>
  );
};

export default App;
