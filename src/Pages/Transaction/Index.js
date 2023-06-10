import Layout from "../../components/Layout"
import TransactionTable from "../../components/TransactionTable"
const Index = () =>{
    
    return(
        <Layout
        child={
            <TransactionTable
            showAll={false}
            />
        }>

        </Layout>
    )
   
}

export default Index