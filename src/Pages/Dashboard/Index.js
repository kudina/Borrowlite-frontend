import Layout from "../../components/Layout";
import { useGetCurrentUserQuery } from "../../features/api/apiSlice";
import TransactionTable from "../../components/TransactionTable";
import { Link } from "react-router-dom";
import AdminPanel from "../AdminPanel/Index";

const Chart = () => {
  const { data: userData, isLoading } = useGetCurrentUserQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  const DoAnimate = () => {
    return (
      <div className="animate-pulse mt-5">
        <div className="h-4 bg-gray-200 rounded-md dark:bg-gray-700 w-20"></div>
        <p className="h-4 bg-gray-200 rounded-md dark:bg-gray-700  mt-3 w-[60%]"></p>
      </div>
    );
  };

  return (
    <>
      <div className="flex w-[100%] flex-col md:flex-row items-center px-10 gap-10">
        <div className="mt-10  grid grid-cols-1 md:grid-cols-2 gap-5 w-[100%] md:w-[50%]">
          <div className="h-[8rem] w-[100%] bg-white rounded-[10px] drop-shadow pl-[20px] pt-[10px]">
            {isLoading ? (
              <DoAnimate />
            ) : (
              <div>
                <p className="font-text font-bold text-[18px] text-textBlack mt-3">
                  N {userData?.balance}
                </p>
                <p className="font-text font-semibold text-[14px] text-deepGrey">
                  Wallet Balance
                </p>
                <img
                  src="/assets/images/cardSecurity.png"
                  alt=""
                  className="float-right h-[65px] w-[80px] mt-[-20px] mr-[0.5px]"
                />
              </div>
            )}
          </div>
          <div className="h-[8rem] w-[100%] bg-white rounded-[10px] drop-shadow pl-[20px] pt-[10px]">
            {isLoading ? (
              <DoAnimate />
            ) : (
              <div>
                <p className="font-text font-bold text-[18px] text-textBlack mt-3">
                  N {userData?.borrowedAmount}
                </p>
                <p className="font-text font-semibold text-[14px] text-deepGrey">
                  Total Borrowed <br></br>
                  Amount
                </p>
                {userData?.borrowedAmount === 0 ? null : (
                  <Link
                    to="/paybackamount"
                    className="text-xs justify-end flex mr-3 text-[blue]"
                  >
                    Pay back loan
                  </Link>
                )}
                <img
                  src="/assets/images/cardBox.png"
                  alt=""
                  className="float-right h-[65px] w-[75px] mt-[-50px] mr-[0.5px]"
                />
              </div>
            )}
          </div>

          <div className="h-[8rem] w-[100%] bg-white rounded-[10px] drop-shadow pl-[20px] pt-[10px]">
            {isLoading ? (
              <DoAnimate />
            ) : (
              <div>
                <p className="font-text font-bold text-[18px] text-textBlack mt-3">
                  N {userData?.claims}
                </p>
                <p className="font-text font-semibold text-[14px] text-deepGrey">
                  Total claims <br></br>
                </p>
                <img
                  src="/assets/images/cardBar.png"
                  alt=""
                  className="float-right h-[65px] w-[75px] mt-[-30px] mr-[0.5px]"
                />
              </div>
            )}
          </div>

          <div className="h-[8rem] w-[100%] bg-white rounded-[10px] drop-shadow pl-[20px] pt-[10px]">
            {isLoading ? (
              <DoAnimate />
            ) : (
              <div>
                <p className="font-text font-bold text-[18px] text-textBlack mt-3">
                  N {userData?.claims}
                </p>
                <p className="font-text font-semibold text-[14px] text-deepGrey">
                  Total Transaction<br></br>
                  Value
                </p>
                <img
                  src="/assets/images/cardBar.png"
                  alt=""
                  className="float-right h-[65px] w-[75px] mt-[-30px] mr-[0.5px]"
                />
              </div>
            )}
          </div>
        </div>

        <div className="w-[100%] md:w-[50%]">
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
        </div>
      </div>

      <div>
        <TransactionTable showAll={true} n={10} />
      </div>
    </>
  );
};

const Dashboard = () => {
  const { data: userData, isLoading } = useGetCurrentUserQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  return (
    <>
      {userData?.userType === "admin" ? (
        <AdminPanel />
      ) : (
        <Layout child={<Chart />} />
      )}
    </>

    //
  );
};

export default Dashboard;
