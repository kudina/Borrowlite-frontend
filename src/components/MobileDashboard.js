import Logo from "../assets/img/logo.png";
import { MobileNavigation } from "./MobileLayout";
import TransactionTable from "./TransactionTable";

const Card = ({ text, amount, img }) => {
  return (
    <div className="h-[4.81rem] w-[45%] bg-[rgba(255,255,255,0.2)] rounded-[5px] flex items-center">
      <div className="p-[9px] bg-white rounded-[5px] mx-[13.4px] flex items-center justify-center">
        <img src={img} alt="" />
      </div>
      <div>
        <p className="text-white text-[0.63rem]">{text}</p>
        <p className="text-white text-[1rem]">N{amount}</p>
      </div>
    </div>
  );
};
const MobileDashboard = ({ userData }) => {
  return (
    <div className="w-screen h-screen md:hidden bg-gradient-to-r from-[#00C247] to-[#86878C] overflow-y-hidden">
      <div className="w-full pt-[28px] px-[19px] flex items-center justify-between ">
        <img src={Logo} alt="" className="w-[3.63rem] h-[1.75rem] "></img>

        <div className="text-white">Dashboard</div>
        <div className="flex items-center gap-x-[18px]">
          <img
            src="/assets/images/comment.png"
            alt=""
            className="w-[20px] h-[20px]"
          />{" "}
          <img
            src="assets/images/bell.png"
            alt=""
            className="w-[20px] h-[20px]"
          />{" "}
          <div className="flex items-center">
            <span className="text-blue bg-white p-[8px] flex items-center justify-center rounded-[5px]">
              UN
            </span>
            <img
              src="/assets/images/arrowDownWhite.png"
              alt=""
              className="ml-[6px]"
            />
          </div>
        </div>
      </div>
      <div className="w-full mb-[46px]">
        <div className="flex w-full gap-x-[19px] mt-[37px] justify-center">
          <Card
            text="Total BorrowedAmount"
            amount={userData?.borrowedAmount}
            img="/assets/images/dollarBlue.png"
          />
          <Card
            text="Wallet Balance"
            amount={userData?.balance}
            img="/assets/images/walletBlue.png"
          />
        </div>
        <div className="flex w-full gap-x-[19px] justify-center mt-[19px]">
          <Card
            text="Total Transaction Value"
            amount={userData?.claims}
            img="/assets/images/returnBlue.png"
          />
          <Card
            text="Total claims"
            amount={userData?.claims}
            img="/assets/images/boxBlue.png"
          />
        </div>
      </div>

      <div className="lg:w-1/3 bg-white rounded-lg shadow-lg p-8 rounded-t-[30px] h-full">
        <TransactionTable showAll={true} n={10} />
        <MobileNavigation />
      </div>
    </div>
  );
};

export default MobileDashboard;