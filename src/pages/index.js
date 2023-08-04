// ** MUI Import
import Grid from '@mui/material/Grid'
import Statistics from 'src/views/dashboard/Statistics'
import InvoiceTable from 'src/views/dashboard/InvoiceTable'


// ** Custom Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

const Dashboard = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Statistics />
        </Grid>

        <Grid item xs={12}>
          <InvoiceTable />
        </Grid>
      </Grid>
    </ApexChartWrapper>


  )
}

export default Dashboard
