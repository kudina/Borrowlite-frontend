import { useEffect } from "react";
import Layout from "../../components/Layout";
import TransactionTable from "../../components/TransactionTable";
import UsersTable from "../../components/UsersTable";
import { useGetAnalyticsQuery } from "../../features/api/apiSlice";
import { useNavigate } from "react-router-dom";
const Allusers = () => {
  const navigate = useNavigate();
  const {
    data: analytics,
    isLoading: loadanalytics,
    isError,
    error,
  } = useGetAnalyticsQuery({}, { refetchOnMountOrArgChange: true });

  useEffect(() => {
    if (isError && error?.status === 401) {
      navigate("/");
      console.log(error);
    }
  }, [isError, error]);

  return (
    <Layout
      child={<UsersTable showAll={false} data={analytics?.allTransaction} />}
    ></Layout>
  );
};

export default Allusers;
