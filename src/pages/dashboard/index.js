// ** MUI Import
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useState, useEffect } from 'react';

import Statistics from 'src/views/dashboard/Statistics';
import InvoiceTable from 'src/views/dashboard/InvoiceTable';

// ** Custom Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts';

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState({ message: "", severity: "success" });

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    const justLoggedIn = window.localStorage.getItem('justLoggedIn');
    console.log("Just logged in: ", justLoggedIn);  // Add this line for debugging
    if (justLoggedIn) {
      setOpen(true);
      setAlert({ message: "Logged in successfully", severity: "success" });
      window.localStorage.removeItem('justLoggedIn');
    }
  }, []);


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
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <MuiAlert onClose={handleClose} severity={alert.severity} variant="filled">
          {alert.message}
        </MuiAlert>
      </Snackbar>
    </ApexChartWrapper>
  );
};

export default Dashboard;
