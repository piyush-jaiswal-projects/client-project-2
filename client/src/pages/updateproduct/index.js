// ** React Imports
import { useState } from 'react'

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
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import CardActions from '@mui/material/CardActions'
import toast from 'react-hot-toast'
import axios from 'axios'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const RegisterPage = () => {
  // ** Hook
  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '',
    unit: '',
    unitSize: ''
  })
  const user = useSelector(state => state.auth)
  const router = useRouter()
  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }
  if (user.user.user === null) {
    router.push('/login')
  }
  const handleSubmit = async () => {
    const formData = new FormData()
    formData.append('name', values.name)
    formData.append('description', values.description)
    formData.append('price', values.price)
    formData.append('unit', values.unit)
    formData.append('unit_size', values.unitSize)
    await axios
      .post('http://137.184.215.16:8000/api/v1.0/prod', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(res => {
        console.log(res.data)
        if (res.data.status == 'error') {
          toast.error('Something went wrong! Please Check All The Fields!')
        } else {
          toast.success('Product Added Successfully!')
          router.push('/products')
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
                <Typography variant='h5'>Create/Update Product</Typography>
              </Grid>
            </Box>

            <Grid container spacing={5}>
              <Grid item xs={12}>
                <TextField fullWidth label='Name' placeholder='Drink 250ml' onChange={handleChange('name')} />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  minRows={3}
                  label='Description'
                  onChange={handleChange('description')}
                  placeholder='describe the product'
                  sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type='Price'
                  label='Price'
                  placeholder='9999999'
                  onChange={handleChange('price')}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <FormControl fullWidth>
                  <InputLabel id='form-layouts-separator-select-label'>Unit</InputLabel>
                  <Select
                    label='Country'
                    defaultValue=''
                    id='form-layouts-separator-select'
                    labelId='form-layouts-separator-select-label'
                    onChange={handleChange('unit')}
                  >
                    <MenuItem value='KG'>KG</MenuItem>
                    <MenuItem value='LB'>LB</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type='Unit Size'
                  label='Unit Size'
                  placeholder='25'
                  onChange={handleChange('unitSize')}
                />
              </Grid>
              <CardActions>
                <Button size='large' onClick={handleSubmit} type='submit' sx={{ mr: 35 }} variant='contained'>
                  Submit
                </Button>
                <Button size='large' variant='contained' onClick={()=> router.push("/products")}>
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
