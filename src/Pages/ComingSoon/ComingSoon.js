import React, { useState } from "react";
import Layout from "../../components/Layout";
import { MobileLayoutWithNav } from "../../components/MobileLayout";

const ComingSoon = () => {
  return (
    <>
      {/* Desktop View */}
      <Layout
        child={
          <>
            <div className="flex items-center justify-around lg:mt-[15%] mt-[20%] flex-col">
              <div className="w-full ">
                <h1 className="font-text text-center lg:text-[60px] text-[30px] text-deepGrey font-semibold ">
                  Coming Soon
                </h1>
                <div className="font-text text-center text-[16px] text-deepGrey font-semibold mt-7">
                  this functionality is under development
                </div>
              </div>
            </div>
          </>
        }
      ></Layout>

      {/* Mobile View */}
      <MobileLayoutWithNav
        child={
          <>
            <div className="flex items-center justify-around lg:mt-[15%] mt-[20%] flex-col">
              <div className="w-full ">
                <h1 className="font-text text-center lg:text-[60px] text-[30px] text-deepGrey font-semibold ">
                  Coming Soon
                </h1>
                <div className="font-text text-center text-[16px] text-deepGrey font-semibold mt-7">
                  this functionality is under development
                </div>
              </div>
            </div>
          </>
        }
      />
    </>
  );
};

export default ComingSoon;
