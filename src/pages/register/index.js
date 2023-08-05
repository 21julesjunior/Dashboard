// ** React Imports
import { useState, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from 'src/context/AuthContext'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';


// ** Next Import
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** MUI Components
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Styled Components
const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: `${theme.palette.primary.main} !important`
}))

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));


const Register = () => {

  // Renommez "setUser" en "updateUser" lors de la déstructuration
  const { setUser: updateUser, setLoading } = useContext(AuthContext)

  // ** State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    entreprise: '',
    country: ''
  })

  // ** Hooks
  const { settings } = useSettings()

  // ** Vars
  const { skin } = settings
  const imageSource = skin === 'bordered' ? 'auth-v2-register-illustration-bordered' : 'auth-v2-register-illustration'

  const router = useRouter()
  const theme = useTheme()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  const [alert, setAlert] = useState({ open: true, message: 'Test alert message', severity: 'success' });


  // ** Handle Form Submit
  // ** Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    // Validation
    const isValidEmail = (email) => {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
    const isValidPhoneNumber = (phoneNumber) => {
      const re = /^(\+?\d{1,4}?)?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?\d{3}\s?-?\s?\d{4}$/;
      return re.test(String(phoneNumber));
    }
    if (!isValidEmail(formData.email)) {
      console.error('Invalid email format')
      setAlert({ open: true, message: 'Le format de l\'email est invalide.', severity: 'error' });
      return
    }
    if (!isValidPhoneNumber(formData.phoneNumber)) {
      console.error('Invalid phone number format')
      setAlert({ open: true, message: 'Le format du numéro de téléphone est invalide.', severity: 'error' });
      return
    }

    try {
      const registerResponse = await axios.post('https://dyinvoice-backend-production.up.railway.app/v1/user/register', formData)
      console.log('User created:', registerResponse.data)

      // Verify if the account creation was successful
      if (registerResponse.status === 201) {
        // Automatically log the user in after successful registration
        try {
          const loginResponse = await axios.post('https://dyinvoice-backend-production.up.railway.app/v1/user/login', {
            email: formData.email,
            password: formData.password
          })

          const { accessToken } = loginResponse.data

          if (!accessToken) {
            console.error('Login API did not return a token')
            setAlert({ open: true, message: 'API de connexion n\'a pas renvoyé de token.', severity: 'error' });
            return
          }

          window.localStorage.setItem('token', accessToken)

          // Now make a request to the API to get the complete user info
          const userResponse = await axios.get('https://dyinvoice-backend-production.up.railway.app/v1/user', {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          })

          const userData = userResponse.data

          // Update the user in the auth context
          updateUser(userData)
          setLoading(false)

          // Redirect to the home page "/" after successful login
          router.push('/')
        } catch (error) {
          console.error('Registration failed:', error)
          setAlert({ open: true, message: 'Une erreur s\'est produite lors de l\'inscription. Veuillez réessayer.', severity: 'error' });
        }
      } else {
        console.error('Registration failed:', registerResponse.data)
        setAlert({ open: true, message: 'Inscription échouée. Veuillez réessayer.', severity: 'error' });
      }
    } catch (error) {
      console.error('Registration failed:', error)
      setAlert({ open: true, message: 'Une erreur s\'est produite lors de l\'inscription. Veuillez réessayer.', severity: 'error' });
    }
  }


  // ** Handle Form Change
  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    }))
  }

  const [passwordRules, setPasswordRules] = useState({
    minLength: false,
    containsSymbol: false,
    containsNumber: false,
  });
  

  return (
    <Box className='content-right' sx={{ backgroundColor: 'background.paper' }}>
      {!hidden ? (
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            position: 'relative',
            alignItems: 'center',
            borderRadius: '20px',
            justifyContent: 'center',
            backgroundColor: 'customColors.bodyBg',
            margin: theme => theme.spacing(8, 0, 8, 8)
          }}
        >
          <img src='/images/banners/login-banner.jpg' width="100%" height="100%" />

        </Box>
      ) : null}
      <RightWrapper>
        <Box
          sx={{
            p: [6, 12],
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Box sx={{ width: '100%', maxWidth: 400 }}>
            <svg width={34} viewBox='0 0 32 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
              {/* ... */}
            </svg>
            <Box sx={{ my: 6 }}>
              <Typography variant='h3' sx={{ mb: 1.5 }}>
                Create an account
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>Make your app management easy and fun!</Typography>
            </Box>
            <form noValidate autoComplete='off' onSubmit={handleSubmit}>
              <CustomTextField
                autoFocus
                fullWidth
                sx={{ mb: 4 }}
                label='Nom'
                placeholder=''
                name='firstName'
                value={formData.firstName}
                onChange={handleChange}
              />
              <CustomTextField
                autoFocus
                fullWidth
                sx={{ mb: 4 }}
                label='Prénom'
                placeholder=''
                name='lastName'
                value={formData.lastName}
                onChange={handleChange}
              />
              <CustomTextField
                fullWidth
                label='Email'
                sx={{ mb: 4 }}
                placeholder='user@email.com'
                name='email'
                value={formData.email}
                onChange={handleChange}
              />
              <CustomTextField
                autoFocus
                fullWidth
                sx={{ mb: 4 }}
                label='Phone'
                placeholder=''
                name='phoneNumber'
                value={formData.phoneNumber}
                onChange={handleChange}
              />
              <CustomTextField
                fullWidth
                label='Password'
                id='auth-login-v2-password'
                type='password'
                sx={{ mb: 4 }}
                placeholder='********'
                name='password'
                value={formData.password}
                onChange={handleChange}
              />
              {/* <BorderLinearProgress variant="determinate" value={50} /> */}
              <CustomTextField
                autoFocus
                fullWidth
                sx={{ mb: 4 }}
                label='Entreprise'
                placeholder=''
                name='entreprise'
                value={formData.entreprise.name}
                onChange={handleChange}
              />
              <CustomTextField
                autoFocus
                fullWidth
                sx={{ mb: 4 }}
                label='Country'
                placeholder=''
                name='country'
                value={formData.country}
                onChange={handleChange}
              />
              <Button fullWidth type='submit' variant='contained' sx={{ mb: 4 }}>
                Sign up
              </Button>
              <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Typography sx={{ color: 'text.secondary', mr: 2 }}>Already have an account?</Typography>
                <Typography component={LinkStyled} href='/login'>
                  Sign in instead
                </Typography>
              </Box>


              <Snackbar
                open={alert.open}
                autoHideDuration={6000}
                onClose={() => setAlert((prevState) => ({ ...prevState, open: false }))}
                style={{ zIndex: 1500 }}
              >
                <Alert onClose={() => setAlert((prevState) => ({ ...prevState, open: false }))} severity={alert.severity} variant="filled">
                  {alert.message}
                </Alert>
              </Snackbar>

            </form>
          </Box>
        </Box>
      </RightWrapper>
    </Box>
  )
}

const RightWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: 450
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 600
  },
  [theme.breakpoints.up('xl')]: {
    maxWidth: 750
  }
}))

Register.getLayout = (page) => <BlankLayout>{page}</BlankLayout>
Register.guestGuard = true

export default Register
