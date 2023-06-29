import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGetAllTransactionsByUserQuery } from "../../src/features/api/apiSlice";
import moment from "moment";

const TransactionTable = (props) => {
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();
  const copyToClipboard = (item) => {
    navigator.clipboard.writeText(item.token).then(
      () => {
        setCopied(true);
        // changing back to default state after 2 seconds.
        alert("Token Copied to clipboard");

        setTimeout(() => {
          setCopied(false);
        }, 2000);
      },
      (err) => {
        console.log("failed to copy", err.mesage);
      }
    );
  };
  const { isLoading, error, isError } = useGetAllTransactionsByUserQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    if (isError && error?.status === 401) {
      navigate("/");
      console.log(error);
    }
  }, [isError, error]);

  const DoAnimate = () => {
    return (
      <tr className="border-b  animate-pulse   border-gray-200 dark:border-gray-700">
        <th
          scope="row"
          className="font-medium text-gray-900 whitespace-nowrap  dark:text-white "
        >
          <div className="h-4 bg-gray-200 rounded-md dark:bg-gray-700 w-20 ml-5 mb-5"></div>
        </th>
        <td className="">
          <div className="h-4 bg-gray-200 rounded-md dark:bg-gray-700 w-20 ml-5 mb-5"></div>
        </td>
        <td className=" ">
          <div className="h-4 bg-gray-200 rounded-md dark:bg-gray-700 w-20 ml-5 mb-5"></div>
        </td>
        <td className="">
          <div className="h-4 bg-gray-200 rounded-md dark:bg-gray-700 w-20 ml-5 mb-5"></div>
        </td>
        <td className="">
          <div className="h-4 bg-gray-200 rounded-md dark:bg-gray-700 w-20 ml-5 mb-5"></div>
        </td>
        <td className="">
          <div className="h-4 bg-gray-200 rounded-md dark:bg-gray-700 w-20 ml-5 mb-5"></div>
        </td>
        <td className="">
          <div className="h-4 bg-gray-200 rounded-md dark:bg-gray-700 w-20 ml-5 mb-5"></div>
        </td>
        <td className="">
          <div className="h-4 bg-gray-200 rounded-md dark:bg-gray-700 w-20 ml-5 mb-5"></div>
        </td>
      </tr>
    );
  };

  const newdata = props?.data?.slice(0, props.n);

  return (
    <div className="w-full">
      <div className="flex  flex-row justify-between">
        <p className="font-text font-semibold text-[14px] text-deepGrey ml-[65px] mr-10 mt-10 ">
          {props.showAll ? (
            <span> Recent electricity Transactions</span>
          ) : (
            <span> All electricity Transactions</span>
          )}
        </p>
        {props.showAll ? (
          <Link to="/transaction">
            <p className="font-text font-semibold text-[12px] text-deepGrey ml-10 mr-10 mt-10 w-[3rem]">
              View all
            </p>
          </Link>
        ) : null}
      </div>

      <div className="mx-10 mt-3 mb-20 overflow-x-auto shadow-md sm:rounded-lg bg-white w-[calc(100% - 10)]">
        <table className="w-full  text-sm text-left text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 ">
                Meter Name
              </th>
              <th scope="col" className="px-6 py-3">
                Meter Number
              </th>
              <th scope="col" className="px-6 py-3  ">
                Token
              </th>
              <th scope="col" className="px-6 py-3">
                Units
              </th>
              <th scope="col" className="px-6 py-3">
                Amount
              </th>
              <th scope="col" className="px-6 py-3">
                Payment mode
              </th>
              <th scope="col" className="px-6 py-3">
                Reference
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <DoAnimate />
            ) : (
              <>
                {newdata?.reverse().map((item) => {
                  return (
                    <tr
                      key={item._id}
                      className="border-b  border-gray-200 dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap  dark:text-white "
                      >
                        {item.meter_name}
                      </th>
                      <td className="px-6 py-4">{item.meter_number}</td>
                      <td className="px-6 py-4 flex ">
                        {item.token}{" "}
                        <div
                          className="ml-5"
                          onClick={() => {
                            copyToClipboard(item);
                          }}
                        >
                          Copy token
                        </div>
                      </td>
                      <td className="px-6 py-4">{item.units}</td>
                      <td className="px-6 py-4">₦ {item.amount}</td>
                      <td className="px-6 py-4">{item.paymentmode}</td>
                      <td className="px-6 py-4">{item.reference}</td>
                      <td className="px-6 py-4">
                        {moment(item.date).format("LLL")}
                      </td>
                    </tr>
                  );
                })}
              </>
            )}
          </tbody>
        </table>
        {newdata?.length === 0 ? (
          <div className="flex justify-center mt-10 mb-10">No Data Found</div>
        ) : null}
      </div>
    </div>
  );
};

export default TransactionTable;
