import Layout from "../../components/Layout"
import TransactionTable from "../../components/TransactionTable"
import { useGetAnalyticsQuery } from "../../features/api/apiSlice"
const Index = () =>{
    const {data:analytics, isLoading:loadanalytics } = useGetAnalyticsQuery({}, { refetchOnMountOrArgChange: true })
    
    return(
        <Layout
        child={
            <TransactionTable
            showAll={false}
            data={analytics?.allTransaction}
            />
        }>

        </Layout>
    )
   
}

export default Index