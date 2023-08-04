// ** MUI Imports

import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'

import MuiTimeline from '@mui/lab/Timeline'

// ** Icon Imports
import Icon from 'src/@core/components/icon'


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
       
      </Grid>
    </Grid>
  )
}

export default UserViewAccount
