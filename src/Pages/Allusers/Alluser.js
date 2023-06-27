import Layout from "../../components/Layout"
import TransactionTable from "../../components/TransactionTable"
import UsersTable from "../../components/UsersTable"
import { useGetAnalyticsQuery } from "../../features/api/apiSlice"
const Allusers = () =>{
    const {data:analytics, isLoading:loadanalytics } = useGetAnalyticsQuery({}, { refetchOnMountOrArgChange: true })
    
    return(
        <Layout
        child={
            <UsersTable
            showAll={false}
            data={analytics?.allTransaction}
            />
        }>

        </Layout>
    )
   
}

export default Allusers