import React, { useState } from "react";
import Payback from "./Payback";
import { useGetCurrentUserQuery } from "../../features/api/apiSlice";
import Layout from "../../components/Layout";
const Paybackamount = () => {
  const { data, isSuccess, isError } = useGetCurrentUserQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const user = data;
  return (
    <>
      {/* Desktop View */}
      <Layout child={<Payback email={user?.email} />}></Layout>

      {/* Mobile View */}

      <Payback email={user?.email} />
    </>
  );
};

export default Paybackamount;
