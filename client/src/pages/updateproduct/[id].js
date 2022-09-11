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
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import CardActions from '@mui/material/CardActions'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'
import { axiosHelper } from 'src/axios/axios'
import InputAdornment from '@mui/material/InputAdornment'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import Post from 'mdi-material-ui/Post'
import Dollar from 'mdi-material-ui/CurrencyUsd'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const RegisterPage = () => {
  const [productData, setProductData] = useState(null)
  // ** Hook
  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '',
    unit: '',
    unitSize: ''
  })
  const router = useRouter()
  const user = useSelector(state => state.auth)
  if (user.user.user === null) {
    router.push('/login')
  }
  const { id } = router.query
  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }
  useEffect(() => {
    getProductData()
    return () => {}
  }, [])

  const getProductData = async () => {
    axiosHelper.get(`/prod?id=${id}`).then(res => {
      setProductData(res.data[0])
    })
  }
  const handleSubmit = async () => {
    const formData = new FormData()
    formData.append('id', id)
    formData.append('name', values.name != '' ? values.name : productData.name)
    formData.append('description', values.description != '' ? values.description : productData.description)
    formData.append('price', values.price != '' ? values.price : productData.price)
    formData.append('unit', values.unit != '' ? values.unit : productData.unit)
    formData.append('unit_size', values.unitSize != '' ? values.unitSize : productData.unit_size)
    await axios
      .put('http://137.184.215.16:8000/api/v1.0/prod', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(res => {
        console.log(res.data)
        if (res.data.data.status == 'error') {
          toast.error('Something went wrong! Please Check All The Fields!')
        } else {
          toast.success('Product Updated Successfully!')
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
      <Toaster />
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
                <TextField
                  fullWidth
                  label='Name'
                  placeholder={productData && productData.name}
                  onChange={handleChange('name')}
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
                  multiline
                  minRows={3}
                  label='Description'
                  onChange={handleChange('description')}
                  placeholder={productData && productData.description}
                  sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <Post />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type='Price'
                  label='Price'
                  placeholder={productData && productData.price}
                  onChange={handleChange('price')}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <Dollar />
                      </InputAdornment>
                    )
                  }}
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
                  placeholder={productData && productData.unit_size}
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
