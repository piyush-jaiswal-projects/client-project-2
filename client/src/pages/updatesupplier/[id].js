// ** React Imports
import { useState, useEffect } from 'react'

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
import { axiosHelper } from 'src/axios/axios'
// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'
import { useRouter } from 'next/router'
import InputAdornment from '@mui/material/InputAdornment'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import Branch from 'mdi-material-ui/Tree'
import Supplier from 'mdi-material-ui/TruckDelivery'

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const RegisterPage = () => {
  const [supplierData, setSupplierData] = useState(null)
  const router = useRouter()
  const [values, setValues] = useState({
    name: '',
    branchname: '',
    number: ''
  })
  const { id } = router.query
  const getSupplierData = async () => {
    axiosHelper.get(`/supp?id=${id}`).then(res => {
      setSupplierData(res.data && res.data[0])
    })
  }
  useEffect(() => {
    getSupplierData()
    return () => {}
  }, [id])
  // ** States
  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }
  const handleSubmit = async () => {
    const formData = new FormData()
    formData.append('id', id)
    formData.append('name', values.name ? values.name : supplierData.coop)
    formData.append('branchname', values.branchname ? values.branchname : supplierData.coop_branch)
    formData.append('number', values.number ? values.number : supplierData.supp_no)
    await axios
      .put('http://137.184.215.16:8000/api/v1.0/supp', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(res => {
        console.log(res.data)
        if (res.data.status == 'error') {
          toast.error('Something went wrong! Please Check All The Fields!')
        } else {
          toast.success('Supplier Updated Successfully!')
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
                <TextField
                  fullWidth
                  label='Name'
                  placeholder={supplierData && supplierData.coop}
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
                  label='Branch Name'
                  placeholder={supplierData && supplierData.coop_branch}
                  onChange={handleChange('branchname')}
                  sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <Branch />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type='Number'
                  label='Supplier Number'
                  placeholder={supplierData && supplierData.supp_no}
                  onChange={handleChange('number')}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <Supplier />
                      </InputAdornment>
                    )
                  }}
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
