// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import { useSelector } from 'react-redux'
import TableStickyHeader from 'src/views/tables/TableStickyHeader'
import { axiosHelper } from 'src/axios/axios'
import { useDispatch } from 'react-redux'
import { getSuppliers } from 'src/redux/features/supplierSlice'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const MUITable = () => {
  const getSuppliersData = async () => {
    await axiosHelper.get('/supps').then(res => {
      dispatch(getSuppliers(res.data))
    })
  }
  const suppliers = useSelector(state => state.suppliers.suppliers)
  const columns = suppliers.length > 0 ? Object.keys(suppliers[0]) : null
  const dispatch = useDispatch()
  const rows = []
  const user = useSelector(state => state.auth)
  const router = useRouter()
  suppliers.map(item => {
    rows.push(item)
  })
  if (user.user.user === null) {
    router.push('/login')
  }
  useEffect(() => {
    getSuppliersData()
    return () => {}
  }, [suppliers])
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Suppliers' titleTypographyProps={{ variant: 'h6' }} />
          <TableStickyHeader columns={columns} rows={rows} route='updatesupplier' />
        </Card>
      </Grid>
    </Grid>
  )
}

export default MUITable
