import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/img/logo.png";
import { useGetCurrentUserQuery } from "../features/api/apiSlice";
import { MenuSub } from "./Inputs";

const Layout = ({ child }) => {
  const date = new Date();
  const year = date.getFullYear();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [subMenu, setSubMenu] = useState(false);
  const [openUtilities, setOpenUtilities] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const menuRef = useRef();

  const { data: userData, error, isError } = useGetCurrentUserQuery();

  const firstName = userData?.firstName;

  const logOutHandler = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
  };

  useEffect(() => {
    if (isError && error?.status === 401) {
      navigate("/");
      console.log(error);
    }
  }, [isError, error]);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (showMenu && menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [showMenu, menuRef]);

  return (
    <div
      className={
        showMenu
          ? " min-h-screen bg-grey hidden md:grid grid-cols-13 md:grid-cols-12 transition-all ease-in-out duration-300"
          : " min-h-screen bg-grey hidden md:grid grid-cols-13 transition-all ease-in-out duration-300"
      }
    >
      <div
        className={
          showMenu
            ? "w-[0] md:w-[100%] bg-white border-r-[0.2px] border-deepGrey border-opacity-5 relative "
            : "w-0 bg-white border-r-[0.2px] border-deepGrey border-opacity-5 relative invisible"
        }
      >
        <div
          ref={menuRef}
          className={`fixed  md:block bg-white z-20 h-full  md:transform-[none] transition-all ease-in-out duration-300 ${
            !showMenu && "transform translate-x-[-100%]"
          }`}
        >
          <div className="h-[3rem] w-[10rem] bg-grey flex items-center justify-center">
            <Link
              to={"/"}
              className="font-text text-2xl font-semibold text-orange"
            >
              <img src={Logo} alt="logo" className="h-10" />
            </Link>
          </div>
          <div className="pr-4 mt-10">
            <p className="ml-[25px] text-[0.8rem]">Main menu</p>
            <Link
              to={"/dashboard"}
              className=" group flex items-center text-[0.8rem] pl-[25px] mt-2 hover:bg-orange p-1 hover:text-white"
            >
              <svg
                className="w-[20px] h-[20px] mr-2 fill-current group-hover:fill-hover"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.024 32H5.16331C2.31625 32 0 29.6837 0 26.8367V21.8879C0 19.0408 2.31625 16.7245 5.16331 16.7245H10.024C12.8711 16.7245 15.1873 19.0409 15.1873 21.8879V26.8367C15.1873 29.6837 12.8711 32 10.024 32ZM5.16331 19.4745C3.83262 19.4745 2.75 20.5572 2.75 21.8879V26.8367C2.75 28.1674 3.83262 29.25 5.16331 29.25H10.024C11.3547 29.25 12.4373 28.1674 12.4373 26.8367V21.8879C12.4373 20.5572 11.3547 19.4745 10.024 19.4745H5.16331ZM10.024 15.2755H5.16331C2.31625 15.2755 0 12.9592 0 10.1121V5.1633C0 2.31623 2.31625 -1.52588e-05 5.16331 -1.52588e-05H10.024C12.8711 -1.52588e-05 15.1873 2.31623 15.1873 5.1633V10.1121C15.1873 12.9592 12.8711 15.2755 10.024 15.2755ZM5.16331 2.74998C3.83262 2.74998 2.75 3.83261 2.75 5.1633V10.1121C2.75 11.4429 3.83262 12.5254 5.16331 12.5254H10.024C11.3547 12.5254 12.4373 11.4428 12.4373 10.1121V5.1633C12.4373 3.83255 11.3547 2.74998 10.024 2.74998H5.16331ZM27.8743 30.625C27.8743 29.8656 27.2586 29.25 26.4993 29.25H22.4315C20.8496 29.25 19.5627 27.9495 19.5627 26.351V22.3734C19.5627 20.775 20.8496 19.4745 22.4315 19.4745H26.3811C27.9631 19.4745 29.2499 20.775 29.2499 22.3734V26.47C29.2499 27.2294 29.8656 27.845 30.6249 27.845C31.3843 27.845 31.9999 27.2294 31.9999 26.47V22.3734C31.9999 19.2586 29.4794 16.7245 26.3811 16.7245H22.4315C19.3333 16.7245 16.8127 19.2586 16.8127 22.3734V26.351C16.8127 29.4659 19.3333 32 22.4315 32H26.4993C27.2587 32 27.8743 31.3844 27.8743 30.625ZM26.8367 15.2755H21.976C19.1289 15.2755 16.8127 12.9592 16.8127 10.1122V5.1633C16.8127 2.31623 19.1289 -1.52588e-05 21.976 -1.52588e-05H26.8367C29.6837 -1.52588e-05 32 2.31623 32 5.1633V10.1121C32 12.9592 29.6837 15.2755 26.8367 15.2755ZM21.976 2.74998C20.6453 2.74998 19.5627 3.83261 19.5627 5.1633V10.1121C19.5627 11.4429 20.6453 12.5254 21.976 12.5254H26.8367C28.1674 12.5254 29.25 11.4428 29.25 10.1121V5.1633C29.25 3.83261 28.1674 2.74998 26.8367 2.74998H21.976Z" />
                <path d="M30.2771 31.5681C31.0365 31.5681 31.6521 30.9525 31.6521 30.1931C31.6521 29.4337 31.0365 28.8181 30.2771 28.8181C29.5177 28.8181 28.9021 29.4337 28.9021 30.1931C28.9021 30.9525 29.5177 31.5681 30.2771 31.5681Z" />
              </svg>
              Dashboard
            </Link>
            <MenuSub
              name="Utilities"
              pOnclick={() => setOpenUtilities(!openUtilities)}
              cOnclick={() => setOpenUtilities(false)}
              openChild={openUtilities}
              img={
                <svg
                  className="w-[20px] h-[20px] mr-2 fill-current group-hover:fill-hover"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_8_168)">
                    <path d="M18.2807 26.6742C18.2502 26.6742 18.2195 26.6732 18.1887 26.6712C17.6142 26.6342 17.1254 26.2566 16.9438 25.7091L14.0241 16.8806L11.5511 22.7184C11.3454 23.2043 10.8912 23.5319 10.3659 23.5732C9.84044 23.6141 9.3415 23.3619 9.06256 22.9144L6.38625 18.6321C5.98381 17.9881 6.17956 17.1399 6.82356 16.7375C7.4675 16.3351 8.31581 16.5307 8.71831 17.1748L10.0263 19.2677L12.8839 12.5221C13.1111 11.9856 13.6539 11.6411 14.2359 11.6642C14.8175 11.6877 15.3314 12.0756 15.5146 12.6293L18.512 21.6928L20.5996 17.368C20.8707 16.8289 21.4223 16.5002 22.0179 16.5191L25.0801 16.5589C25.8394 16.5688 26.4469 17.1923 26.4371 17.9516C26.4272 18.7109 25.8033 19.319 25.0443 19.3086L22.7307 19.2786L19.5456 25.8781C19.3091 26.3688 18.8193 26.6742 18.2807 26.6742ZM17.0693 24.682C17.0691 24.6825 17.0688 24.683 17.0686 24.6834L17.0693 24.682ZM11.3939 21.456L11.3955 21.4585C11.395 21.4576 11.3944 21.4568 11.3939 21.456ZM25.9468 30.625C25.9468 29.8656 25.3312 29.25 24.5718 29.25H7.42819C4.84863 29.25 2.75 27.1524 2.75 24.5741V13.701C2.75 11.1227 4.84863 9.02514 7.42819 9.02514H24.5718C27.1513 9.02514 29.25 11.1228 29.25 13.701V24.5741C29.25 25.154 29.1454 25.7193 28.9393 26.2543C28.6663 26.9629 29.0193 27.7586 29.7279 28.0317C30.4368 28.3049 31.2323 27.9517 31.5053 27.2431C31.8335 26.3914 31.9999 25.4934 31.9999 24.5741V13.701C31.9999 9.60633 28.6677 6.27514 24.5718 6.27514H7.42819C3.33225 6.27508 0 9.60633 0 13.701V24.5741C0 28.6688 3.33225 32 7.42819 32H24.5718C25.3312 32 25.9468 31.3844 25.9468 30.625Z" />
                    <path d="M28.5625 31.5278C29.3219 31.5278 29.9375 30.9122 29.9375 30.1528C29.9375 29.3934 29.3219 28.7778 28.5625 28.7778C27.8031 28.7778 27.1875 29.3934 27.1875 30.1528C27.1875 30.9122 27.8031 31.5278 28.5625 31.5278Z" />
                  </g>
                  <defs>
                    <clipPath id="clip0_8_168">
                      <path d="M0 4.99998C0 2.23856 2.23858 -1.52588e-05 5 -1.52588e-05H27C29.7614 -1.52588e-05 32 2.23856 32 4.99998V27C32 29.7614 29.7614 32 27 32H5C2.23858 32 0 29.7614 0 27V4.99998Z" />
                    </clipPath>
                  </defs>
                </svg>
              }
              childList={[
                { name: "Borrow Light", link: "/Borrowlight" },
                { name: "Buy Light", link: "/Buylight" },
                { name: "Airtime", link: "/airtime" },
                { name: "Data", link: "/comingSoon" },
                { name: "Cable", link: "/comingSoon" },
              ]}
            />

            <MenuSub
              name="Profile"
              pOnclick={() => setOpenProfile(!openProfile)}
              cOnclick={() => setOpenProfile(false)}
              openChild={openProfile}
              img={
                <svg
                  className="w-[20px] h-[20px] mr-2 fill-current group-hover:fill-hover"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.8743 25.7601L7.46634 29.0667C7.06234 29.3694 6.52234 29.4187 6.07034 29.1921C5.61834 28.9667 5.33301 28.5054 5.33301 28.0001V4.00005C5.33301 3.26405 5.93034 2.66672 6.66634 2.66672H25.333C26.069 2.66672 26.6663 3.26405 26.6663 4.00005V28.0001C26.6663 28.5054 26.381 28.9667 25.929 29.1921C25.477 29.4187 24.937 29.3694 24.533 29.0667L20.125 25.7601L16.9423 28.9427C16.4223 29.4641 15.577 29.4641 15.057 28.9427L11.8743 25.7601ZM23.9997 25.3334V5.33339H7.99967V25.3334L11.1997 22.9334C11.7303 22.5347 12.473 22.5881 12.9423 23.0574L15.9997 26.1147L19.057 23.0574C19.5263 22.5881 20.269 22.5347 20.7997 22.9334L23.9997 25.3334ZM14.6663 16.0001H17.333C18.069 16.0001 18.6663 15.4027 18.6663 14.6667C18.6663 13.9307 18.069 13.3334 17.333 13.3334H14.6663C13.9303 13.3334 13.333 13.9307 13.333 14.6667C13.333 15.4027 13.9303 16.0001 14.6663 16.0001ZM11.9997 10.6667H19.9997C20.7357 10.6667 21.333 10.0694 21.333 9.33339C21.333 8.59739 20.7357 8.00005 19.9997 8.00005H11.9997C11.2637 8.00005 10.6663 8.59739 10.6663 9.33339C10.6663 10.0694 11.2637 10.6667 11.9997 10.6667Z"
                  />
                </svg>
              }
              childList={[
                { name: "Transactions", link: "/comingSoon" },
                { name: "Fund Wallet", link: "/Fundwallet" },
                { name: "Settings", link: "/comingSoon" },
                { name: "Edit Profile", link: "/comingSoon" },
              ]}
            />
            <Link
              to={"/comingSoon"}
              className=" group flex items-center text-[0.8rem] pl-[25px] mt-2 hover:bg-orange p-1 hover:text-white"
            >
              <svg
                className="w-[20px] h-[20px] mr-2 fill-current group-hover:fill-hover"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_8_168)">
                  <path d="M18.2807 26.6742C18.2502 26.6742 18.2195 26.6732 18.1887 26.6712C17.6142 26.6342 17.1254 26.2566 16.9438 25.7091L14.0241 16.8806L11.5511 22.7184C11.3454 23.2043 10.8912 23.5319 10.3659 23.5732C9.84044 23.6141 9.3415 23.3619 9.06256 22.9144L6.38625 18.6321C5.98381 17.9881 6.17956 17.1399 6.82356 16.7375C7.4675 16.3351 8.31581 16.5307 8.71831 17.1748L10.0263 19.2677L12.8839 12.5221C13.1111 11.9856 13.6539 11.6411 14.2359 11.6642C14.8175 11.6877 15.3314 12.0756 15.5146 12.6293L18.512 21.6928L20.5996 17.368C20.8707 16.8289 21.4223 16.5002 22.0179 16.5191L25.0801 16.5589C25.8394 16.5688 26.4469 17.1923 26.4371 17.9516C26.4272 18.7109 25.8033 19.319 25.0443 19.3086L22.7307 19.2786L19.5456 25.8781C19.3091 26.3688 18.8193 26.6742 18.2807 26.6742ZM17.0693 24.682C17.0691 24.6825 17.0688 24.683 17.0686 24.6834L17.0693 24.682ZM11.3939 21.456L11.3955 21.4585C11.395 21.4576 11.3944 21.4568 11.3939 21.456ZM25.9468 30.625C25.9468 29.8656 25.3312 29.25 24.5718 29.25H7.42819C4.84863 29.25 2.75 27.1524 2.75 24.5741V13.701C2.75 11.1227 4.84863 9.02514 7.42819 9.02514H24.5718C27.1513 9.02514 29.25 11.1228 29.25 13.701V24.5741C29.25 25.154 29.1454 25.7193 28.9393 26.2543C28.6663 26.9629 29.0193 27.7586 29.7279 28.0317C30.4368 28.3049 31.2323 27.9517 31.5053 27.2431C31.8335 26.3914 31.9999 25.4934 31.9999 24.5741V13.701C31.9999 9.60633 28.6677 6.27514 24.5718 6.27514H7.42819C3.33225 6.27508 0 9.60633 0 13.701V24.5741C0 28.6688 3.33225 32 7.42819 32H24.5718C25.3312 32 25.9468 31.3844 25.9468 30.625Z" />
                  <path d="M28.5625 31.5278C29.3219 31.5278 29.9375 30.9122 29.9375 30.1528C29.9375 29.3934 29.3219 28.7778 28.5625 28.7778C27.8031 28.7778 27.1875 29.3934 27.1875 30.1528C27.1875 30.9122 27.8031 31.5278 28.5625 31.5278Z" />
                </g>
                <defs>
                  <clipPath id="clip0_8_168">
                    <path d="M0 4.99998C0 2.23856 2.23858 -1.52588e-05 5 -1.52588e-05H27C29.7614 -1.52588e-05 32 2.23856 32 4.99998V27C32 29.7614 29.7614 32 27 32H5C2.23858 32 0 29.7614 0 27V4.99998Z" />
                  </clipPath>
                </defs>
              </svg>
              Exchange
            </Link>
            <Link
              to={"/comingSoon"}
              className=" group flex items-center text-[0.8rem] pl-[25px] mt-2 hover:bg-orange p-1 hover:text-white"
            >
              <svg
                className="w-[20px] h-[20px] mr-2 fill-current group-hover:fill-hover"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.8743 25.7601L7.46634 29.0667C7.06234 29.3694 6.52234 29.4187 6.07034 29.1921C5.61834 28.9667 5.33301 28.5054 5.33301 28.0001V4.00005C5.33301 3.26405 5.93034 2.66672 6.66634 2.66672H25.333C26.069 2.66672 26.6663 3.26405 26.6663 4.00005V28.0001C26.6663 28.5054 26.381 28.9667 25.929 29.1921C25.477 29.4187 24.937 29.3694 24.533 29.0667L20.125 25.7601L16.9423 28.9427C16.4223 29.4641 15.577 29.4641 15.057 28.9427L11.8743 25.7601ZM23.9997 25.3334V5.33339H7.99967V25.3334L11.1997 22.9334C11.7303 22.5347 12.473 22.5881 12.9423 23.0574L15.9997 26.1147L19.057 23.0574C19.5263 22.5881 20.269 22.5347 20.7997 22.9334L23.9997 25.3334ZM14.6663 16.0001H17.333C18.069 16.0001 18.6663 15.4027 18.6663 14.6667C18.6663 13.9307 18.069 13.3334 17.333 13.3334H14.6663C13.9303 13.3334 13.333 13.9307 13.333 14.6667C13.333 15.4027 13.9303 16.0001 14.6663 16.0001ZM11.9997 10.6667H19.9997C20.7357 10.6667 21.333 10.0694 21.333 9.33339C21.333 8.59739 20.7357 8.00005 19.9997 8.00005H11.9997C11.2637 8.00005 10.6663 8.59739 10.6663 9.33339C10.6663 10.0694 11.2637 10.6667 11.9997 10.6667Z"
                />
              </svg>
              Savings
            </Link>
          </div>
          <div className="fixed bottom-2 ml-[20px]">
            <button
              className="text-blue font-semibold text-[12px] flex items-center"
              onClick={logOutHandler}
            >
              <img
                src="/assets/images/logout.png"
                alt=""
                className="h-[10px] w-[10px] mr-[2px] text-accent"
              />
              Logout
            </button>
            <p className="font-text text-[9px] font-bold text-textBlack mt-2 ">
              Borrowlite
            </p>
            <p className="font-text text-[9px] font-bold text-textGrey ">
              © {year} All Rights Reserved
            </p>
          </div>
        </div>
      </div>
      <div className="w-screen md:w-[100%]">
        <nav className="flex justify-between items-center bg-barGrey h-[3rem]">
          <div className="flex justify-between items-center">
            <img
              src="/assets/images/menu.png"
              alt=""
              className="ml-6 mr-4 h-[20px] w-[20px] cursor-pointer"
              onClick={() => setShowMenu(!showMenu)}
            />
            <div className="font-text font-bold">Dashboard</div>
          </div>
          <div className="flex justify-between items-center bg-barGrey mr-6">
            <div className="text-[10px] font-text font-bold mr-3">
              {firstName}
            </div>
            <div className="text-white text-[12px] capitalize text-bold w-[25px] h-[25px] bg-orange flex items-center justify-center rounded-[2px]">
              {firstName?.substring(0, 1)}
            </div>
          </div>
        </nav>
        {child}
      </div>
    </div>
  );
};

export default Layout;
