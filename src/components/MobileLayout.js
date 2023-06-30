import { useState } from "react";
import Logo from "../assets/img/logo.png";
import { useNavigate } from "react-router-dom";

export const MobileNavigation = () => {
  const [openUtilities, setOpenUtilities] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="bg-mobileBg flex justify-between items-center py-[24px] px-[27px] absolute bottom-0 left-0 right-0">
      <img
        src="/assets/images/dashboard.png"
        alt=""
        onClick={() => navigate("/dashboard")}
      />
      <img
        src="/assets/images/icon2.png"
        alt=""
        onClick={() => {
          setOpenUtilities(!openUtilities);
          setOpenProfile(false);
        }}
      />
      <img
        src="/assets/images/invoices.png"
        alt=""
        onClick={() => {
          setOpenProfile(!openProfile);
          setOpenUtilities(false);
        }}
      />
      <img
        src="/assets/images/icon1.png"
        alt=""
        onClick={() => navigate("/comingSoon")}
      />

      <div
        className={`bg-white flex justify-between items-center py-[24px] px-[27px] absolute bottom-[5rem] left-0 right-0 transition-all ease-in-out duration-300 ${
          !openUtilities && "transform translate-x-[-100%]"
        }`}
      >
        <img
          src="/assets/images/borrowLight.png"
          alt=""
          onClick={() => navigate("/Borrowlight")}
          className="w-[25px] h-[25px]"
        />
        <img
          src="/assets/images/buyLight.png"
          alt=""
          onClick={() => navigate("/Buylight")}
          className="w-[25px] h-[25px]"
        />
        <img
          src="/assets/images/call.png"
          alt=""
          onClick={() => navigate("/airtime")}
          className="w-[25px] h-[25px]"
        />
        <img
          src="/assets/images/data.png"
          alt=""
          onClick={() => navigate("/comingSoon")}
          className="w-[25px] h-[25px]"
        />
        <img
          src="/assets/images/cable.png"
          alt=""
          onClick={() => navigate("/comingSoon")}
          className="w-[25px] h-[25px]"
        />
      </div>

      <div
        className={`bg-white flex justify-between items-center py-[24px] px-[27px] absolute bottom-[5rem] left-0 right-0 transition-all ease-in-out duration-300 ${
          !openProfile && "transform translate-x-[-100%]"
        }`}
      >
        <img
          src="/assets/images/borrowLight.png"
          alt=""
          onClick={() => navigate("/Transaction")}
          className="w-[25px] h-[25px]"
        />
        <img
          src="/assets/images/buyLight.png"
          alt=""
          onClick={() => navigate("/Fundwallet")}
          className="w-[25px] h-[25px]"
        />
        <img
          src="/assets/images/settings.png"
          alt=""
          onClick={() => navigate("/comingSoon")}
          className="w-[25px] h-[25px]"
        />
        <img
          src="/assets/images/data.png"
          alt=""
          onClick={() => navigate("/comingSoon")}
          className="w-[25px] h-[25px]"
        />
      </div>
    </div>
  );
};

export const MobileLayoutWithNav = ({ child }) => {
  return (
    <div className="w-screen h-screen md:hidden bg-mobileBg overflow-y-hidden">
      <div className="w-full pt-[31px] flex justify-center items-center">
        <img src={Logo} alt="" className="w-[10.31rem] h-[4.56rem]"></img>
      </div>

      <div className="lg:w-1/3 bg-white rounded-lg shadow-lg p-8 rounded-t-[30px] mt-[43px] h-full">
        {child}
        <MobileNavigation />
      </div>
    </div>
  );
};

const MobileLayout = ({ child }) => {
  return (
    <div className="w-screen h-screen md:hidden bg-mobileBg overflow-y-hidden">
      <div className="w-full pt-[31px] flex justify-center items-center">
        <img src={Logo} alt="" className="w-[10.31rem] h-[4.56rem]"></img>
      </div>

      <div className="lg:w-1/3 bg-white rounded-lg shadow-lg p-8 rounded-t-[30px] mt-[43px] h-full">
        {child}
      </div>
    </div>
  );
};

export default MobileLayout;
