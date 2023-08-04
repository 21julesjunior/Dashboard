// ** React Imports
import { useState } from 'react'
import axios from 'axios'

// ** Next Import
import Link from 'next/link'

import { useRouter } from 'next/router';

// ** MUI Components
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'

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


const Register = () => {
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

  const router = useRouter();


  // ** Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://dyinvoice-backend-production.up.railway.app/v1/user/register', formData);
      console.log('User created:', response.data);

      // Vérifier si la création de compte a réussi
      if (response.status === 201) {
        // Rediriger vers la page "/" après une inscription réussie
        router.push('/');
      } else {
        // Afficher un message d'erreur ou effectuer d'autres actions en cas d'échec de l'inscription
        console.error('Registration failed:', response.data);
      }
    } catch (error) {
      console.error('Registration failed:', error);
      // Afficher un message d'erreur ou effectuer d'autres actions en cas d'échec de l'inscription
    }
  };



  // ** Handle Form Change
  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    }))
  }
  return (
    <Box className='content-right' sx={{ backgroundColor: 'background.paper' }}>
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
                label='country'
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
