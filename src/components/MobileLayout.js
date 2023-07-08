import { useState } from "react";
import Logo from "../assets/img/logo.png";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faHouse, faPlugCircleBolt, faUser, faBitcoinSign, faChevronRight } from '@fortawesome/free-solid-svg-icons'

const NavCard = ({ head, subText, cOnClick }) => {
  return (
    <div
      className="flex justify-between items-center mb-[20px]"
      onClick={cOnClick}
    >
      <div>
        <p className="text-[#000] text-[1rem] font-[500]">{head}</p>
        <p className="text-[#B3B4B7] text-[0.63rem]">{subText}</p>
      </div>
      <FontAwesomeIcon icon={faChevronRight} />
      {/* <img src="/assets/images/arrowRight.png" className="w-[12px] h-[20px]" /> */}
    </div>
  );
};

export const MobileNavigation = () => {
  const [openUtilities, setOpenUtilities] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const navigate = useNavigate();
  return (
    <div>
      {/* util */}
      <div
        className={`lg:w-1/3 bg-white shadow-lg px-8 pt-6 rounded-t-[30px] absolute left-0 right-0 top-[20%] bottom-[5rem] transition-all ease-in-out duration-300 ${
          !openUtilities &&
          "transform translate-y-[100%] overflow-y-hidden relative opacity-0"
        }`}
      >
        <NavCard
          head="Borrow light"
          subText="Borrow light now pay back later"
          cOnClick={() => {
            navigate("/Borrowlight");
            setOpenUtilities(false);
          }}
        />

        <NavCard
          head="Buy light"
          subText="Buy light easily with Borrowlite"
          cOnClick={() => {
            navigate("/Buylight");
            setOpenUtilities(false);
          }}
        />

        <NavCard
          head="Airtime"
          subText="Recharge your phone"
          cOnClick={() => {
            navigate("/airtime");
            setOpenUtilities(false);
          }}
        />
        <NavCard
          head="Data"
          subText="Access Data easily with Borrowlite"
          cOnClick={() => {
            navigate("/comingSoon");
            setOpenUtilities(false);
          }}
        />
        <NavCard
          head="Cable"
          subText="Pay for DSTV GOTV STARTIMES"
          cOnClick={() => {
            navigate("/comingSoon");
            setOpenUtilities(false);
          }}
        />
      </div>


     {/* profile */}
      <div
        className={`lg:w-1/3 bg-white shadow-lg px-8 pt-6 rounded-t-[30px] absolute left-0 right-0 top-[20%] bottom-[5rem] transition-all ease-in-out duration-300 ${
          !openProfile &&
          "transform translate-y-[100%] overflow-y-hidden relative opacity-0"
        }`}
      >
        <NavCard
          head="Transaction"
          subText="See transaction history"
          cOnClick={() => {
            navigate("/Transaction");
            setOpenProfile(false);
          }}
        />

        <NavCard
          head="Fund Wallet"
          subText="Fund your Borrowlight wallet"
          cOnClick={() => {
            navigate("/Fundwallet");
            setOpenProfile(false);
          }}
        />

        <NavCard
          head="Settings"
          subText="Update default settings"
          cOnClick={() => {
            navigate("/comingSoon");
            setOpenProfile(false);
          }}
        />
        <NavCard
          head="Savings"
          subText="Easy savings with Borrowlight"
          cOnClick={() => {
            navigate("/comingSoon");
            setOpenProfile(false);
          }}
        />
      </div>


      <div className="bg-mobileBg flex justify-between items-center py-[18px] px-[27px] fixed bottom-0 left-0 right-0">
        <div className="flex flex-col"
         onClick={() => {
          navigate("/dashboard");
          setOpenProfile(false);
          setOpenUtilities(false);
        }}
        >
          <FontAwesomeIcon icon={faHouse} className="text-xl text-accent"/>
          <div className="text-[10px]">Dashboard</div>
        </div>

        <div className="flex flex-col"
          onClick={() => {
            setOpenUtilities(!openUtilities);
            setOpenProfile(false);
          }}
        >
        <FontAwesomeIcon icon={faPlugCircleBolt}  className="text-xl text-accent"/>
          <div className="text-[10px]">Utilities</div>
        </div>

        <div className="flex flex-col"
         onClick={() => {
          setOpenProfile(!openProfile);
          setOpenUtilities(false);
        }}
        >
        <FontAwesomeIcon icon={faUser}  className="text-xl text-accent"/>
          <div className="text-[10px]">Profile</div>
        </div>

        <div className="flex flex-col"
        onClick={() => {
          navigate("/comingSoon");
          setOpenProfile(false);
          setOpenUtilities(false);
        }}
        >
        <FontAwesomeIcon icon={faBitcoinSign}  className="text-xl text-accent"/>
          <div className="text-[10px]">Exchange</div>
        </div>
        
        {/* <img
          src="/assets/images/icon1.png"
          alt=""
          onClick={() => {
            navigate("/comingSoon");
            setOpenProfile(false);
            setOpenUtilities(false);
          }}
        /> */}
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
