// ** React Imports
import { useState, useContext, useEffect } from 'react'
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

  // Rename "setUser" to "updateUser" when destructuring
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

  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    symbol: false,
    number: false,
  })

  // Calculate password strength
  const passwordStrength = Object.values(passwordCriteria).filter(Boolean).length

  useEffect(() => {
    const checkPassword = (password) => {
      setPasswordCriteria({
        length: password.length >= 8,
        symbol: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(password),
        number: /\d/.test(password),
      })
    }

    checkPassword(formData.password)
  }, [formData.password])

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
      setAlert({ open: true, message: 'Invalid email format.', severity: 'error' });
      return
    }
    if (!isValidPhoneNumber(formData.phoneNumber)) {
      console.error('Invalid phone number format')
      setAlert({ open: true, message: 'Invalid phone number format.', severity: 'error' });
      return
    }

    if (!passwordCriteria.length || !passwordCriteria.symbol || !passwordCriteria.number) {
      console.error('Password does not meet criteria')
      setAlert({ open: true, message: 'Password does not meet criteria.', severity: 'error' });
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
        setAlert({ open: true, message: 'Une erreur s\'est produite lors de l\'inscription. Veuillez réessayer.', severity: 'error' });
      }
    } catch (error) {
      console.error('Registration failed:', error)
      setAlert({ open: true, message: 'Une erreur s\'est produite lors de l\'inscription. Veuillez réessayer.', severity: 'error' });
    }
  }

  // ** Handle Input Change
  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prevState => ({ ...prevState, [name]: value }))
  }

  const handleClose = () => {
    setAlert({ ...alert, open: false });
  };

  return (
   
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: {
            xs: '50px 0',
            md: '0'
          },
          backgroundColor: theme.palette.mode === 'dark' ? '#000' : '#F2F2F2'
        }}
      >
        <Box
          sx={{
            backgroundColor: theme.palette.mode === 'dark' ? '#141414' : '#fff',
            borderRadius: '12px',
            width: {
              xs: '100%',
              sm: '80%',
              md: '60%',
              lg: '50%',
              xl: '40%'
            },
            p: '50px 30px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative'
          }}
        >
          <Box
            component="img"
            src={`/static/images/illustrations/${imageSource}.svg`}
            sx={{
              position: 'absolute',
              top: '-30px',
              right: '-30px',
              maxHeight: '270px',
              maxWidth: '237px',
              display: {
                xs: 'none',
                md: 'block'
              }
            }}
            alt="Auth illustration"
          />
          <Typography variant="h3" gutterBottom>
            Create Account
          </Typography>
          <Typography sx={{ color: 'text.secondary', pb: '32px' }} variant="body2">
            Already have an account?{' '}
            <LinkStyled href="/pages/authentication/login-v2">
              <a>Sign in</a>
            </LinkStyled>
          </Typography>
          <form onSubmit={handleSubmit}>
            <CustomTextField
              fullWidth
              label='First Name'
              id='auth-register-v2-first-name'
              sx={{ mb: 3 }}
              placeholder='John'
              name='firstName'
              value={formData.firstName}
              onChange={handleChange}
            />
            <CustomTextField
              fullWidth
              label='Last Name'
              id='auth-register-v2-last-name'
              sx={{ mb: 3 }}
              placeholder='Doe'
              name='lastName'
              value={formData.lastName}
              onChange={handleChange}
            />
            <CustomTextField
              fullWidth
              label='Email'
              id='auth-register-v2-email'
              sx={{ mb: 3 }}
              placeholder='john.doe@example.com'
              name='email'
              value={formData.email}
              onChange={handleChange}
            />
            <CustomTextField
              fullWidth
              label='Phone Number'
              id='auth-register-v2-phone-number'
              sx={{ mb: 3 }}
              placeholder='+1 202-555-0135'
              name='phoneNumber'
              value={formData.phoneNumber}
              onChange={handleChange}
            />
            <CustomTextField
              fullWidth
              label='Password'
              id='auth-register-v2-password'
              type='password'
              sx={{ mb: 3 }}
              placeholder='********'
              name='password'
              value={formData.password}
              onChange={handleChange}
            />
            <Typography variant="body2">
              Password must contain at least:
            </Typography>
            <Typography variant="body2" style={{ color: passwordCriteria.length ? 'green' : 'grey' }}>
              {passwordCriteria.length ? "✓" : "✘"} 8 characters
            </Typography>
            <Typography variant="body2" style={{ color: passwordCriteria.symbol ? 'green' : 'grey' }}>
              {passwordCriteria.symbol ? "✓" : "✘"} One symbol (@, $, !, %, *, ?, &, etc.)
            </Typography>
            <Typography variant="body2" style={{ color: passwordCriteria.number ? 'green' : 'grey' }}>
              {passwordCriteria.number ? "✓" : "✘"} One number
            </Typography>
            <BorderLinearProgress 
              variant="determinate" 
              value={passwordStrength * 33} 
              style={{
                backgroundColor: passwordStrength === 3 ? 'green' : 
                  passwordStrength === 2 ? 'orange' : 'red',
              }}
            />
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3 }}>
              Sign up
            </Button>
          </form>
          <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={alert.severity} sx={{ width: '100%' }}>
              {alert.message}
            </Alert>
          </Snackbar>
        </Box>
      </Box>
  )
}

export default Register
