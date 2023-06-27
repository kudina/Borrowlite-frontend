import Layout from "../../components/Layout";
import { useGetCurrentUserQuery , useGetAnalyticsQuery} from "../../features/api/apiSlice";
import TransactionTable from "../../components/TransactionTable";
import { Link } from "react-router-dom";

const Chart = () => {
  const { data: userData , isLoading} = useGetCurrentUserQuery({}, { refetchOnMountOrArgChange: true });
  const {data:analytics, isLoading:loadanalytics } = useGetAnalyticsQuery({}, { refetchOnMountOrArgChange: true })


 


  const DoAnimate = ()=>{
    return(
      <div className="animate-pulse mt-5">
        <div className="h-4 bg-gray-200 rounded-md dark:bg-gray-700 w-20">
          
          </div>
          <p className="h-4 bg-gray-200 rounded-md dark:bg-gray-700  mt-3 w-[60%]">
          </p>
      </div>

    )
  }




  return (
<>
<div className="flex w-[100%] flex-col md:flex-row items-center px-10 gap-10">
      <div className="mt-10  grid grid-cols-1 md:grid-cols-4 gap-5 w-[100%]">
     
        <div className="h-[8rem] w-[100%] bg-white rounded-[10px] drop-shadow pl-[20px] pt-[10px]">
          {
            isLoading ? <DoAnimate/> : <div> 
                <p className="font-text font-bold text-[18px] text-textBlack mt-3">
            {analytics?.numberOfUsers}
          </p>
          <p className="font-text font-semibold text-[14px] text-deepGrey">
            Number of users 
          </p>
          <Link
          to="/allusers" state={analytics?.allUsers}
          
          >
          <p className="font-text font-semibold text-[14px] text-blue">
            View more 
          </p>
          </Link>
          <img
            src="/assets/images/cardSecurity.png"
            alt=""
            className="float-right h-[65px] w-[80px] mt-[-20px] mr-[0.5px]"
          />

            </div>
          }
        
        
        </div>
        <div className="h-[8rem] w-[100%] bg-white rounded-[10px] drop-shadow pl-[20px] pt-[10px]">
         {
          isLoading ? <DoAnimate/> : <div>
             <p className="font-text font-bold text-[18px] text-textBlack mt-3">
             {analytics?.numberOfVendors}
          </p>
          <p className="font-text font-semibold text-[14px] text-deepGrey">
            Number of Vendors 
          </p>
          <Link
          to="/allusers" state={analytics?.allVendors}
          
          >
          <p className="font-text font-semibold text-[14px] text-blue">
            View more 
          </p>
          </Link>
         {/* {
          userData?.borrowedAmount === 0 ? null :  <Link to='/paybackamount' className="text-xs justify-end flex mr-3 text-[blue]">Pay back loan</Link>
         } */}
          <img
            src="/assets/images/cardBox.png"
            alt=""
            className="float-right h-[65px] w-[75px] mt-[-50px] mr-[0.5px]"
          />
          </div>
         }
        </div>

        <div className="h-[8rem] w-[100%] bg-white rounded-[10px] drop-shadow pl-[20px] pt-[10px]">
         {
          isLoading ? <DoAnimate/> : <div>
             <p className="font-text font-bold text-[18px] text-textBlack mt-3">
             {analytics?.numberOfActiveBorrowers}
          </p>
          <p className="font-text font-semibold text-[14px] text-deepGrey">
            Active Borrowers
          </p>
          <Link
          to="/allusers" state={analytics?.borrowedUsers}
          
          >
          <p className="font-text font-semibold text-[14px] text-blue">
            View more 
          </p>
          </Link>
          <img
            src="/assets/images/cardBar.png"
            alt=""
            className="float-right h-[65px] w-[75px] mt-[-30px] mr-[0.5px]"
          />
          </div>
         }
        </div>

        <div className="h-[8rem] w-[100%] bg-white rounded-[10px] drop-shadow pl-[20px] pt-[10px]">
         {
          isLoading ? <DoAnimate/> : <div>
             <p className="font-text font-bold text-[18px] text-textBlack mt-3">
            N {analytics?.numberOfTransaction}
          </p>
          <p className="font-text font-semibold text-[14px] text-deepGrey">
            Number of 
            Transactions
          </p>
          <img
            src="/assets/images/cardBar.png"
            alt=""
            className="float-right h-[65px] w-[75px] mt-[-30px] mr-[0.5px]"
          />
          </div>
         }
        </div>

        <div className="h-[8rem] w-[100%] bg-white rounded-[10px] drop-shadow pl-[20px] pt-[10px]">
         {
          isLoading ? <DoAnimate/> : <div>
             <p className="font-text font-bold text-[18px] text-textBlack mt-3">
            N {analytics?.totalAmountBorrowed}
          </p>
          <p className="font-text font-semibold text-[14px] text-deepGrey">
          Total about borrowed
          </p>
          <img
            src="/assets/images/cardBar.png"
            alt=""
            className="float-right h-[65px] w-[75px] mt-[-30px] mr-[0.5px]"
          />
          </div>
         }
        </div>
        <div className="h-[8rem] w-[100%] bg-white rounded-[10px] drop-shadow pl-[20px] pt-[10px]">
         {
          isLoading ? <DoAnimate/> : <div>
             <p className="font-text font-bold text-[18px] text-textBlack mt-3">
            N {analytics?.amountInUsersWallet}
          </p>
          <p className="font-text font-semibold text-[14px] text-deepGrey">
            Total amounts<br></br>
            in users wallet
          </p>
          <img
            src="/assets/images/cardBar.png"
            alt=""
            className="float-right h-[65px] w-[75px] mt-[-30px] mr-[0.5px]"
          />
          </div>
         }
        </div>

        <div className="h-[8rem] w-[100%] bg-white rounded-[10px] drop-shadow pl-[20px] pt-[10px]">
         {
          isLoading ? <DoAnimate/> : <div>
             <p className="font-text font-bold text-[18px] text-textBlack mt-3">
            N {analytics?.totalAmountOfTranasation}
          </p>
          <p className="font-text font-semibold text-[14px] text-deepGrey">
            Total amounts<br></br>
            in Tranasaction
          </p>
          <img
            src="/assets/images/cardBar.png"
            alt=""
            className="float-right h-[65px] w-[75px] mt-[-30px] mr-[0.5px]"
          />
          </div>
         }
        </div>

        <div className="h-[8rem] w-[100%] bg-white rounded-[10px] drop-shadow pl-[20px] pt-[10px]">
         {
          isLoading ? <DoAnimate/> : <div>
             <p className="font-text font-bold text-[18px] text-textBlack mt-3">
            N {analytics?.totalAmountBought}
          </p>
          <p className="font-text font-semibold text-[14px] text-deepGrey">
            Total amounts<br></br>
            Bought
          </p>
          <img
            src="/assets/images/cardBar.png"
            alt=""
            className="float-right h-[65px] w-[75px] mt-[-30px] mr-[0.5px]"
          />
          </div>
         }
        </div>


      </div>

      {/* <div className="w-[100%] md:w-[50%]">
        <div className="h-[17rem] w-full bg-white rounded-[10px] drop-shadow mt-10 p-2">
          <div className="flex justify-between p-5">
            <div>
              <p className="font-text text-textBlack text-[10px] font-bold">
                Total revenue
              </p>
              <p className="font-text text-[16px] font-bold text-textBlack">
                N 27,446.77
              </p>
            </div>
            <div className="flex text-[8.5px] w-[9rem] justify-between">
              <p className="flex">
                <img
                  src="/assets/images/accept2.png "
                  alt=""
                  className="h-[10px] w-[10px] mr-[2px] font-semibold text-textGrey"
                />
                Life time
              </p>
              <p className="flex">
                <img
                  src="/assets/images/accept2.png"
                  alt=""
                  className="h-[10px] w-[10px] mr-[2px] font-semibold text-textGrey"
                />
                Monthly
              </p>
              <p className="flex">
                <img
                  src="/assets/images/accept1.png"
                  alt=""
                  className="h-[10px] w-[10px] mr-[2px] font-semibold text-textGrey"
                />
                Weekly
              </p>
            </div>
          </div>
          <img
            src="/assets/images/graph.svg"
            alt=""
            className="h-[10rem] w-full "
          />
        </div>
      </div> */}
      
    </div>

   <TransactionTable
   showAll={true}
   data={analytics?.allTransaction}
   n={10}
   />
   

</>

    
    
  );
};




const AdminPanel = () => {
  return <Layout child={<Chart />} />;
};

export default AdminPanel;
