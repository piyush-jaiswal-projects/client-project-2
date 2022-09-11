// ** React Imports
import { useState } from 'react'

// ** MUI Components
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import axios from 'axios'
import toast from 'react-hot-toast'
// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const RegisterPage = () => {
  // ** States
  const user = useSelector(state => state.auth)
  const router = useRouter()
  const [values, setValues] = useState({
    name: '',
    branchname: '',
    number: ''
  })
  if (user.user.user === null) {
    router.push('/login')
  }
  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }
  const handleSubmit = async () => {
    const formData = new FormData()
    formData.append('name', values.name)
    formData.append('branchname', values.branchname)
    formData.append('number', values.number)
    await axios
      .post('http://137.184.215.16:8000/api/v1.0/supp', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(res => {
        if (res.data.status == 'error') {
          toast.error('Something went wrong! Please Check All The Fields!')
        } else {
          toast.success('Supplier Added Successfully!')
          router.push('/suppliers')
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
          <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
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
                <Typography variant='h5'>Create/Update Supplier</Typography>
              </Grid>
            </Box>

            <Grid container spacing={5}>
              <Grid item xs={12}>
                <TextField fullWidth label='Name' placeholder='Store ABC' onChange={handleChange('name')} />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  minRows={3}
                  label='Branch Name'
                  placeholder='Branch name of e main shop'
                  onChange={handleChange('branchname')}
                  sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type='Number'
                  label='Supplier Number'
                  placeholder='9999999'
                  onChange={handleChange('number')}
                />
              </Grid>

              <CardActions>
                <Button size='large' type='submit' sx={{ mr: 35 }} variant='contained' onClick={handleSubmit}>
                  Submit
                </Button>
                <Button size='large' variant='contained' onClick={()=> router.push("/suppliers")}>
                  Cancel
                </Button>
              </CardActions>
            </Grid>
          </CardContent>
        </Card>
        <FooterIllustrationsV1 />
      </Box>
    </Grid>
  )
}

export default RegisterPage
