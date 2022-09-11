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
import FormControl from '@mui/material/FormControl'
import axios from 'axios'
import toast from 'react-hot-toast'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Modal from '@mui/material/Modal'
import ReactSelect from 'react-select'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import TableBasic from 'src/views/tables/TableBasic'
import ProductTable from 'src/views/tables/productTable'
import { addProduct, resetData } from 'src/redux/features/selectedProduct'

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const RegisterPage = () => {
  // ** States
  const supplierData = useSelector(state => state.suppliers.suppliers)
  const userData = useSelector(state => state.users.users)
  const productsData = useSelector(state => state.products.products)
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const router = useRouter()
  const user = useSelector(state => state.auth)
  const selectedProducts = useSelector(state => state.selectedProduct.selectedProducts)
  const dispatch = useDispatch()
  const totalPrice = useSelector(state => state.selectedProduct.totalPrice)
  const [values, setValues] = useState({
    purchase_order_no: 0,
    supp_id: 0,
    number: 0,
    createdby_id: 0
  })
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70vw',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
  }
  if (user.user.user === null) {
    router.push('/login')
  }
  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }
  const handleSubmit = async () => {
    const products = []
    selectedProducts.map(item => {
      products.push({
        product_id: parseInt(item.id),
        qnt: parseInt(item.quantity),
        free_qnt: 0,
        total_p: item.price * item.quantity
      })
    })
    const formData = new FormData()
    formData.append('supp_id', values.supp_id)
    formData.append('createdby_id', values.createdby_id)
    formData.append('purchase_order_no', values.purchase_order_no)
    formData.append('products', JSON.stringify(products))

    await axios
      .post('http://137.184.215.16:8000/api/v1.0/order', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(res => {
        console.log(res.data)
        if (res.data.data.status == 'error') {
          toast.error('Something went wrong! Please Check All The Fields!')
        } else {
          toast.success('Order Added Successfully!')
          dispatch(resetData())
          router.push('/Order')
        }
      })
  }
  const handleAddProduct = item => {
    dispatch(addProduct(item))
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
                <Typography variant='h5'>Create/Update Order</Typography>
              </Grid>
            </Box>

            <Grid container spacing={5}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Purchase Order'
                  placeholder='1586'
                  onChange={handleChange('purchase_order_no')}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='form-layouts-separator-select-label'>Select Supplier</InputLabel>
                  <Select
                    label='Supplier'
                    defaultValue=''
                    onChange={handleChange('supp_id')}
                    id='form-layouts-separator-select'
                    labelId='form-layouts-separator-select-label'
                    required
                  >
                    {supplierData &&
                      supplierData.map((item, index) => {
                        return (
                          <MenuItem value={item.id} key={index}>
                            {item.coop}
                          </MenuItem>
                        )
                      })}
                  </Select>
                </FormControl>
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
              <Grid container>
                <Grid item container direction='row'>
                  <Grid item xs={12} sm={6}>
                    <Button size='large' variant='contained' sx={{ marginTop: 5, marginLeft: 5 }} onClick={handleOpen}>
                      <Typography variant='p' color='common.white'>
                        Add Product
                      </Typography>
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth sx={{ marginTop: 4 }}>
                      <InputLabel id='form-layouts-separator-select-label'>Assignee</InputLabel>
                      <Select
                        label='Assignee'
                        defaultValue=''
                        onChange={handleChange('createdby_id')}
                        id='form-layouts-separator-select'
                        labelId='form-layouts-separator-select-label'
                        required
                      >
                        {userData &&
                          userData.map((item, index) => {
                            return (
                              <MenuItem value={item.id} key={index}>
                                {item.fname}
                              </MenuItem>
                            )
                          })}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby='modal-modal-title'
                  aria-describedby='modal-modal-description'
                >
                  <Box sx={style}>
                    <Grid item>
                      <FormControl fullWidth sx={{ marginTop: 4 }}>
                        {/* <Select
                          label='Product'
                          id='form-layouts-separator-select'
                          labelId='form-layouts-separator-select-label'
                          required
                        >
                          {productsData &&
                            productsData.map((item, index) => {
                              return (
                                <MenuItem value={item.id} key={index} onClick={() => handleAddProduct(item)}>
                                  {item.name}
                                </MenuItem>
                              )
                            })}
                        </Select> */}
                        <ReactSelect
                          onChange={e => handleAddProduct(e.value)}
                          options={
                            productsData &&
                            productsData.map(product => ({
                              value: product,
                              label: product.name
                            }))
                          }
                        />
                      </FormControl>
                    </Grid>
                    <Grid item>
                      {/* <TextField
                        fullWidth
                        type='text'
                        label='Search for Products'
                        placeholder='Water Bottle'
                        onChange={handleChange('number')}
                        sx={{ marginTop: 5, marginBottom: 4 }}
                      /> */}
                    </Grid>
                    <Grid>{selectedProducts.length > 0 && <ProductTable rows={selectedProducts} />}</Grid>
                    <Grid container spacing={0} direction='column' alignItems='center' justifyContent='center'>
                      <CardActions>
                        <Button size='large' type='submit' sx={{ mr: 35 }} variant='contained' onClick={handleClose}>
                          Submit
                        </Button>
                        <Button size='large' variant='contained' onClick={handleClose}>
                          Cancel
                        </Button>
                      </CardActions>
                    </Grid>
                  </Box>
                </Modal>
              </Grid>

              <Grid container>
                <Typography variant='span' sx={{ paddingLeft: 5 }}>
                  Product Summary
                </Typography>
                {selectedProducts.length > 0 && <TableBasic rows={selectedProducts} />}
              </Grid>

              <CardActions>
                <Button size='large' type='submit' sx={{ mr: 35 }} variant='contained' onClick={handleSubmit}>
                  Submit
                </Button>
                <Button size='large' variant='contained' onClick={() => router.push('/Order')}>
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
