import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faHouse, faPlugCircleBolt, faUser, faBitcoinSign, faChevronRight } from '@fortawesome/free-solid-svg-icons'

const Utility = ()=>{
    const navigate = useNavigate();
    // const NavCard = ({ head, subText, cOnClick }) => {
    //     return (
    //       <div
    //         className="flex justify-between items-center mb-[20px]"
    //         onClick={cOnClick}
    //       >
    //         <div>
    //           <p className="text-[#000] text-[1rem] font-[500]">{head}</p>
    //           <p className="text-[#B3B4B7] text-[0.63rem]">{subText}</p>
    //         </div>
    //         <FontAwesomeIcon icon={faChevronRight} />
    //         {/* <img src="/assets/images/arrowRight.png" className="w-[12px] h-[20px]" /> */}
    //       </div>
    //     );
    //   };

    // return(
    //   <div
    //     className={`lg:w-1/3 bg-white shadow-lg px-8 pt-6 rounded-t-[30px] absolute left-0 right-0 top-[20%] bottom-[5rem] transition-all ease-in-out duration-300 ${
    //       "transform translate-y-[100%] overflow-y-hidden relative opacity-0"
    //     }`}
    //   >
    //     <NavCard
    //       head="Borrow light"
    //       subText="Borrow light now pay back later"
    //       cOnClick={() => {
    //         navigate("/Borrowlight");
    //        // setOpenUtilities(false);
    //       }}
    //     />

    //     <NavCard
    //       head="Buy light"
    //       subText="Buy light easily with Borrowlite"
    //       cOnClick={() => {
    //         navigate("/Buylight");
    //         //setOpenUtilities(false);
    //       }}
    //     />

    //     <NavCard
    //       head="Airtime"
    //       subText="Recharge your phone"
    //       cOnClick={() => {
    //         navigate("/airtime");
    //        // setOpenUtilities(false);
    //       }}
    //     />
    //     <NavCard
    //       head="Data"
    //       subText="Access Data easily with Borrowlite"
    //       cOnClick={() => {
    //         navigate("/comingSoon");
    //        // setOpenUtilities(false);
    //       }}
    //     />
    //     <NavCard
    //       head="Cable"
    //       subText="Pay for DSTV GOTV STARTIMES"
    //       cOnClick={() => {
    //         navigate("/comingSoon");
    //         //setOpenUtilities(false);
    //       }}
    //     />
    //   </div>  
    // )

    return(
        <div>this is working here</div>
    )


    
    
}

export default Utility