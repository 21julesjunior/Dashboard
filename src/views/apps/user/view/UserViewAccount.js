// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import { styled } from '@mui/material/styles'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineItem from '@mui/lab/TimelineItem'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import MuiTimeline from '@mui/lab/Timeline'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Demo Component Imports
import UsersInvoiceListTable from 'src/views/apps/user/view/UsersInvoiceListTable'
import UsersProjectListTable from 'src/views/apps/user/view/UsersProjectListTable'

// ** Custom Components Imports
import OptionsMenu from 'src/@core/components/option-menu'

// Styled Timeline component
const Timeline = styled(MuiTimeline)({
  '& .MuiTimelineItem-root:before': {
    display: 'none'
  }
})

const UserViewAccount = ({ invoiceData }) => {
  return (
    <Grid container spacing={6}>

      <Grid item xs={12}>
        <UsersInvoiceListTable invoiceData={invoiceData} />
      </Grid>
    </Grid>
  )
}

export default UserViewAccount
