// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { DataGrid } from '@mui/x-data-grid'
import LinearProgress from '@mui/material/LinearProgress'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Third Party Imports
import axios from 'axios'

const Img = styled('img')(({ theme }) => ({
  width: 32,
  height: 32,
  borderRadius: '50%',
  marginRight: theme.spacing(2.5)
}))

const columns = [
  {
    flex: 0.35,
    minWidth: 250,
    field: 'projectTitle',
    headerName: 'Project',
    renderCell: ({ row }) => (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Img src={row.img} alt={`project-${row.projectTitle}`} />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>{row.projectTitle}</Typography>
          <Typography variant='body2' sx={{ color: 'text.disabled' }}>
            {row.projectType}
          </Typography>
        </Box>
      </Box>
    )
  },
  {
    flex: 0.2,
    minWidth: 126,
    field: 'totalTask',
    headerName: 'Total Tasks',
    renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.totalTask}</Typography>
  },
  {
    flex: 0.25,
    minWidth: 180,
    headerName: 'Progress',
    field: 'progressValue',
    renderCell: ({ row }) => (
      <Box sx={{ width: '100%' }}>
        <Typography sx={{ mb: 1.5, color: 'text.secondary' }}>{`${row.progressValue}%`}</Typography>
        <LinearProgress sx={{ height: 8 }} variant='determinate' value={row.progressValue} color={row.progressColor} />
      </Box>
    )
  },
  {
    flex: 0.2,
    minWidth: 110,
    field: 'hours',
    headerName: 'Hours',
    renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{`${row.hours}h`}</Typography>
  }
]

const InvoiceListTable = () => {
  // ** State
  const [value, setValue] = useState('')
  const [data, setData] = useState([])
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 })
  useEffect(() => {
    axios
      .get('/apps/users/project-list', {
        params: {
          q: value
        }
      })
      .then(res => setData(res.data))
  }, [value])

  return (
    <Card>
      <CardHeader title="User's Projects List" />
      
     
    </Card>
  )
}

export default InvoiceListTable