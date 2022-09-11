// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import TableStickyHeader from 'src/views/tables/TableStickyHeader'
import { getOrders } from 'src/redux/features/orderSlice'
import { axiosHelper } from 'src/axios/axios'
import { useRouter } from 'next/router'

const MUITable = () => {
  const orders = useSelector(state => state.orders.orders)
  const user = useSelector(state => state.auth)
  const router = useRouter()
  const columns = orders.length > 0 ? Object.keys(orders[0]) : null
  const dispatch = useDispatch()
  const rows = []
  orders.map(item => {
    rows.push(item)
  })
  useEffect(() => {
    getSupplierData()
    return () => {}
  }, [orders])
  if (user.user.user === null) {
    router.push('/login')
  }
  const getSupplierData = async () => {
    await axiosHelper.get('/orders').then(res => {
      dispatch(getOrders(res.data))
    })
  }
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Orders' titleTypographyProps={{ variant: 'h6' }} />
          <TableStickyHeader rows={rows} columns={columns} route='updateorder' />
        </Card>
      </Grid>
    </Grid>
  )
}

export default MUITable
