import Layout from "../../components/Layout";
import { MobileLayoutWithNav } from "../../components/MobileLayout";
import TransactionTable from "../../components/TransactionTable";
import { useGetAnalyticsQuery } from "../../features/api/apiSlice";
const Index = () => {
  const { data: analytics, isLoading: loadanalytics } = useGetAnalyticsQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  return (
    <>
      {/* Desktop View */}
      <Layout
        child={
          <TransactionTable showAll={false} data={analytics?.allTransaction} />
        }
      ></Layout>

      {/* Mobile View */}

      <MobileLayoutWithNav
        child={
          <TransactionTable showAll={false} data={analytics?.allTransaction} />
        }
      />
    </>
  );
};

export default Index;
