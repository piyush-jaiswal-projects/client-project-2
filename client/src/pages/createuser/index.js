// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Components
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import { styled } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Phone from 'mdi-material-ui/Phone'
import EmailOutline from 'mdi-material-ui/EmailOutline'
import AccountOutline from 'mdi-material-ui/AccountOutline'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'
import { axiosHelper } from 'src/axios/axios'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const RegisterPage = () => {
  const router = useRouter()
  const user = useSelector(state => state.auth)
  useEffect(() => {
    if (user.user.user === null) {
      router.push('/login')
    }
  }, [user])
  // ** States
  const [values, setValues] = useState({
    password: '',
    fname: '',
    lname: '',
    phone: '',
    email: '',
    role: '',
    showPassword: false
  })
  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleSubmit = async () => {
    console.log(values.phone)
    const formData = new FormData()
    formData.append('fname', values.fname)
    formData.append('lname', values.lname)
    formData.append('email', values.email)
    formData.append('phone', values.phone)
    formData.append('pass', values.password)
    formData.append('role', values.role)
    await axios
      .post('http://137.184.215.16:8000/api/v1.0/user', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(res => {
        console.log(res.data)
        if (res.data.data.status == 'error') {
          toast.error('Something went wrong! Please Check All The Fields!')
        } else {
          toast.success('Users Added Successfully!')
          router.push('/users')
        }
      })
  }

  return (
    <Grid
      container
      spacing={0}
      direction='column'
      alignItems='center'
      justifyContent='center'
      style={{ minHeight: '100vh' }}
    >
      <Box className='content-center'>
        <Card sx={{ zIndex: 1 }}>
          <CardContent sx={{ padding: theme => `${theme.spacing(12)} !important` }}>
            <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg
                width={35}
                height={29}
                version='1.1'
                viewBox='0 0 30 23'
                xmlns='http://www.w3.org/2000/svg'
                xmlnsXlink='http://www.w3.org/1999/xlink'
              ></svg>
              <Grid item xs={12}>
                <Typography variant='h5'>Create/Update User</Typography>
              </Grid>
            </Box>

            <Grid container spacing={5}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='First Name'
                  placeholder='First Name'
                  onChange={handleChange('fname')}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <AccountOutline />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Last Name'
                  placeholder='Last Name'
                  onChange={handleChange('lname')}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <AccountOutline />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type='email'
                  label='Email'
                  placeholder='Email'
                  onChange={handleChange('email')}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <EmailOutline />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Phone No.'
                  placeholder='Phone No'
                  type="number"
                  onChange={handleChange('phone')}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <Phone />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type='password'
                  required
                  label='Password'
                  placeholder='Password'
                  InputProps={{}}
                  onChange={handleChange('password')}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <FormControl fullWidth>
                  <InputLabel id='form-layouts-separator-select-label'>Role</InputLabel>
                  <Select
                    label='Role'
                    defaultValue=''
                    onChange={handleChange('role')}
                    id='form-layouts-separator-select'
                    labelId='form-layouts-separator-select-label'
                    required
                  >
                    <MenuItem value='Admin'>Admin</MenuItem>
                    <MenuItem value='User'>User</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Button type='submit' variant='contained' size='large' onClick={handleSubmit}>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <FooterIllustrationsV1 />
      </Box>
    </Grid>
  )
}

export default RegisterPage
