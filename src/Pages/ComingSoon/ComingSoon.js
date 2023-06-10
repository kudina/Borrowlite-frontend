import React,{useState} from "react";
import Layout from "../../components/Layout";




const ComingSoon = ()=>{
    
   



    return(
        <Layout
        child={ 
            
               <>
                <div className="flex items-center justify-around lg:mt-[15%] mt-[20%] flex-col">
                <div className="w-full " >
                  <h1 className="font-text text-center text-[60px] text-deepGrey font-semibold">Coming Soon</h1>
                  <div className="font-text text-center text-[16px] text-deepGrey font-semibold mt-7">this functionality is under development</div>
                
                </div>
              </div>
               </>
                
          }
        ></Layout>

    )


   




   



    



   
}

export default ComingSoon