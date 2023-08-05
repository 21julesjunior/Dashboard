// ** React Imports
import { useState, useContext } from 'react'
import axios from 'axios'
import { useAuth } from 'src/hooks/useAuth'


import { AuthContext } from 'src/context/AuthContext'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Actions Imports
import { addUser } from 'src/store/apps/user'


const showErrors = (field, valueLen, min) => {
  if (valueLen === 0) {
    return `${field} field is required`
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`
  } else {
    return ''
  }
}

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}))

const schema = yup.object().shape({
  email: yup.string().email().required(),
  fullName: yup
    .string()
    .min(3, obj => showErrors('First Name', obj.value.length, obj.min))
    .required(),
  username: yup
    .string()
    .min(3, obj => showErrors('Username', obj.value.length, obj.min))
    .required()
})

const defaultValues = {
  email: '',
  fullName: '',
  username: '',
}

const SidebarAddUser = props => {
  // ** Props
  const { open, toggle } = props

  // ** State
  const [role, setRole] = useState('subscriber')

  // ** Hooks
  const dispatch = useDispatch()
  const store = useSelector(state => state.user)

  const {
    reset,
    control,
    setValue,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const { logout, user } = useAuth()


  const { auth, token } = useContext(AuthContext)

  const onSubmit = async data => {
    if (store.allData.some(u => u.email === data.email || u.username === data.username)) {
      store.allData.forEach(u => {
        if (u.email === data.email) {
          setError('email', {
            message: 'Email already exists!'
          })
        }
        if (u.username === data.username) {
          setError('username', {
            message: 'Username already exists!'
          })
        }
      })
    } else {
      // Prepare data to be sent
      const requestData = {
        email: data.email,
        fullName: data.fullName,
        username: data.username,
        role: role
      };

      // Add API call here
      try {
        const response = await axios.post(
          `https://dyinvoice-backend-production.up.railway.app/v1/user/1/team`,
          requestData,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        console.log('Email sent:', response);
      } catch (error) {
        console.error('Failed to send email:', error);
      }

      dispatch(addUser(requestData))
      toggle()
      reset()
    }
  }



  const handleClose = () => {
    setRole('subscriber')
    setValue('contact', Number(''))
    toggle()
    reset()
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <Header>
        <Typography variant='h5'>Add Product</Typography>
        <IconButton
          size='small'
          onClick={handleClose}
          sx={{
            p: '0.438rem',
            borderRadius: 1,
            color: 'text.primary',
            backgroundColor: 'action.selected',
            '&:hover': {
              backgroundColor: theme => `rgba(${theme.palette.customColors.main}, 0.16)`
            }
          }}
        >
          <Icon icon='tabler:x' fontSize='1.125rem' />
        </IconButton>
      </Header>
      <Box sx={{ p: theme => theme.spacing(0, 6, 6) }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name='name'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                type='name'
                label='Name'
                value={value}
                sx={{ mb: 4 }}
                onChange={onChange}
              />
            )}
          />

          <Controller
            name='description'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                type='name'
                label='Description'
                value={value}
                sx={{ mb: 4 }}
                onChange={onChange}
              />
            )}
          />

          <Controller
            name='price'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                type='number'
                label='Price'
                value={value}
                sx={{ mb: 4 }}
                onChange={onChange}
              />
            )}
          />

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button type='submit' variant='contained' onClick={onSubmit} sx={{ mr: 3 }}>
              Submit
            </Button>
            <Button variant='tonal' color='secondary' onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  )
}

export default SidebarAddUser
