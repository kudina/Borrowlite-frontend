import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetAllTransactionsByUserQuery } from "../../src/features/api/apiSlice";
import moment from "moment";
import { useLocation, useNavigate } from "react-router-dom";

const UsersTable = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;
  console.log("all user", data);

  const [copied, setCopied] = useState(false);
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

  const newdata = data?.slice(0, props.n);

  return (
    <>
      <div className="flex  flex-row justify-between">
        <p className="font-text font-semibold text-[14px] text-deepGrey ml-[65px] mr-10 mt-10 ">
          {props.showAll ? (
            <span> Recent electricity Transactions</span>
          ) : (
            <span> Users</span>
          )}
        </p>
        {props.showAll ? (
          <Link to="/transaction">
            <p className="font-text font-semibold text-[12px] text-deepGrey ml-10 mr-10 mt-10">
              View all
            </p>
          </Link>
        ) : null}
      </div>

      <div className="ml-10   mr-10 mt-3 mb-20 overflow-x-auto shadow-md sm:rounded-lg bg-white ">
        <table className="w-full  text-sm text-left text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 ">
                Full Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3  ">
                Phone number
              </th>
              <th scope="col" className="px-6 py-3">
                Balance
              </th>
              <th scope="col" className="px-6 py-3">
                Amount Borrowed
              </th>
              <th scope="col" className="px-6 py-3">
                Claims
              </th>
              {/* <th scope="col" className="px-6 py-3">
                Reference
              </th> */}
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
                        {item.firstName}
                      </th>
                      <td className="px-6 py-4">{item.email}</td>
                      <td className="px-6 py-4 flex ">{item.phoneNumber} </td>
                      <td className="px-6 py-4">₦ {item.balance}</td>
                      <td className="px-6 py-4">₦ {item.borrowedAmount}</td>
                      <td className="px-6 py-4">{item.claims}</td>
                      {/* <td className="px-6 py-4">{item.reference}</td> */}
                      <td className="px-6 py-4">
                        {moment(item.createdAt).format("LLL")}
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
    </>
  );
};

export default UsersTable;
