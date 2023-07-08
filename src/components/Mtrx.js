import { useGetAllTransactionsByUserQuery } from "../../src/features/api/apiSlice";
import moment from "moment";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNairaSign,faChevronRight } from '@fortawesome/free-solid-svg-icons'

const Mtrx = ()=>{
    const { isLoading, error, isError, data } = useGetAllTransactionsByUserQuery(
        // {},
        // { refetchOnMountOrArgChange: true }
      );

      console.log("new data coming here", data?.data)

    return(

<div className="bg-slate-50 absolute w-full mb-10">
  {
    data?.data.map((item)=>{
      return(
        <div key={item.reference} className=" rounded-[5px] bg-zinc-200 flex flex-row mt-3 m-3 justify-between">
    <div className="rounded-[5px] m-3 bg-zinc-500 flex flex-col items-center py-2 px-4">
       <div className="text-white font-light font-text "> {moment(item.date).format("MMM")}</div>
       <div className="text-white font-medium text-[30px] font-text "> {moment(item.date).format("DD")}</div>
    </div>

    <div className="flex flex-col my-3 item-center justify-center mr-[40px]">
      <div className="flex flex-row">
       <div className="text-zinc-500 font-text font-bold text-[16px] mr-3"> Amount: <FontAwesomeIcon className="text-[16px]" icon={faNairaSign} />{item.amount}</div>
        <div  className="text-zinc-500 font-text font-bold text-[16px]">Ref: {item.reference}</div>
      </div>
      {
        item.status ? <div className="flex flex-row mt-1">
        <div className="text-zinc-500 font-text font-bold text-[16px] mr-3 lowercase"> Status: {item.status}</div>
        {
          item.status === "PENDING" ? <div className=" justify-between flex flex-row ">
          {/* <div  className="text-zinc-500 font-text font-bold text-[16px] mr-7">Retry</div> */}
          {/* <div  className="text-zinc-500 font-text font-bold text-[16px] ml-4"> <FontAwesomeIcon icon={faChevronRight} /></div> */}
       </div> : <div className=" justify-between flex flex-row ">
           {/* <div  className="text-zinc-500 font-text font-bold text-[16px] mr-7">View</div>
           <div  className="text-zinc-500 font-text font-bold text-[16px] ml-7"> <FontAwesomeIcon icon={faChevronRight} /></div> */}
        </div>
        }
       </div>: null
      }
    </div>
  </div>
      )
    })
  }


{/*   
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className=" px-1 py-1 font-medium text-[12px]">
                    Amount
                </th>
                <th scope="col" className=" px-1 py-1 font-medium text-[12px]">
                    Ref
                </th>
                <th scope="col" className=" px-1 py-1 font-medium text-[12px]">
                    Status
                </th>
                <th scope="col" className=" px-1 py-1 font-medium text-[12px]">
                    Date
                </th>
                <th scope="col" className=" px-1 py-1 font-medium text-[12px]">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            {
              data?.data.map((item)=>{
                return(
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-1 py-1 font-light text-[12px]">
                    N{item.amount}
                </td>
                <td className="px-1 py-1 font-light text-[12px]">
                    {item.reference}
                </td>
                <td className="px-1 py-1 font-light text-[12px]">
                {item.status}
                </td>
                <td className="px-1 py-1 font-light text-[12px]">
                {moment(item.date).format("LL")}
                </td>
                <td className="px-1 py-1 font-light text-[12px]">
                {
                    item.status === "PENDING" ? <div className="  text-center rounded-sm">
                    Retry
                   </div> : <div className="  text-center rounded-sm">
                   View
                  </div>
                  }
                </td>
            </tr>
                )
              })
            }
        </tbody>
    </table> */}
</div>


    )
    

}

export default Mtrx





