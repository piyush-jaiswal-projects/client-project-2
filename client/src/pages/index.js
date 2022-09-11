// ** MUI Imports
import Grid from '@mui/material/Grid'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { getUsers } from 'src/redux/features/usersSlice'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

import Trophy from 'src/views/dashboard/Trophy'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import SalesByCountries from 'src/views/dashboard/SalesByCountries'
import { axiosHelper } from 'src/axios/axios'
import { getOrders } from 'src/redux/features/orderSlice'
import { getProducts } from 'src/redux/features/productsSlice'
import { getSuppliers } from 'src/redux/features/supplierSlice'

const Dashboard = () => {
  const router = useRouter()
  const user = useSelector(state => state.auth)
  const users = useSelector(state => state.users.users)
  const orders = useSelector(state => state.orders.orders)
  const deliveredOrder = orders?.filter(item => item.status == 'delivered')
  console.log(deliveredOrder)
  const dispatch = useDispatch()
  if (user.user === null) {
    router.push('/login')
  }
  useEffect(() => {
    getUsersData()
    getUsersData()
    getOrderData()
    getProductsData()
    getSuppliersData()
  }, [user])

  const getUsersData = async () => {
    await axiosHelper
      .get('/users', {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        dispatch(getUsers(res.data))
      })
  }

  const getOrderData = async () => {
    await axiosHelper.get('/orders').then(res => {
      dispatch(getOrders(res.data))
    })
  }

  const getProductsData = async () => {
    await axiosHelper.get('prods').then(res => dispatch(getProducts(res.data)))
  }

  const getSuppliersData = async () => {
    await axiosHelper.get('/supps').then(res => {
      dispatch(getSuppliers(res.data))
    })
  }
  
return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <Trophy users={users} />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatisticsCard orders={deliveredOrder} />
        </Grid>
        <Grid item xs={12} md={4} >
          <SalesByCountries orders={orders}/>
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default Dashboard
