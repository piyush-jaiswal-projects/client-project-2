// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import { useSelector } from 'react-redux'
import TableStickyHeader from 'src/views/tables/TableStickyHeader'
import { axiosHelper } from 'src/axios/axios'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getProducts } from 'src/redux/features/productsSlice'
import { useRouter } from 'next/router'

const MUITable = () => {
  const products = useSelector(state => state.products.products)
  const dispatch = useDispatch()
  const columns = products.length > 0 ? Object.keys(products && products[0]) : null
  const user = useSelector(state => state.auth)
  const router = useRouter()
  const rows = []
  products &&
    products.map(item => {
      rows.push(item)
    })
  useEffect(() => {
    getProductsData()
    
    return () => {}
  }, [products])
  if (user.user.user === null) {
    router.push('/login')
  }
  const getProductsData = async () => {
    await axiosHelper.get('prods').then(res => dispatch(getProducts(res.data)))
  }
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Products' titleTypographyProps={{ variant: 'h6' }} />
          <TableStickyHeader columns={columns} rows={rows} route='updateproduct' />
        </Card>
      </Grid>
    </Grid>
  )
}

export default MUITable
