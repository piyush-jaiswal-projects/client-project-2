// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { axiosHelper } from 'src/axios/axios'
import { useDispatch } from 'react-redux'
import { getUsers } from 'src/redux/features/usersSlice'
import toast, { Toaster } from 'react-hot-toast'
import TextField from '@mui/material/TextField'
import { useRouter } from 'next/router'
import axios from 'axios'
import { getSuppliers } from 'src/redux/features/supplierSlice'
import { getOrders } from 'src/redux/features/orderSlice'

const TableStickyHeader = ({ columns, rows, route }) => {
  // ** States
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [filterData, setFilterData] = useState(null)
  const dispatch = useDispatch()
  const router = useRouter()
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  const getUsersData = async () => {
    await axiosHelper.get('/users').then(res => {
      dispatch(getUsers(res.data))
    })
  }
  const getSuppliersData = async () => {
    await axiosHelper.get('/supps').then(res => {
      dispatch(getSuppliers(res.data))
    })
  }
  const getSupplierData = async () => {
    await axiosHelper.get('/orders').then(res => {
      dispatch(getOrders(res.data))
    })
  }
  const handleDelete = async id => {
    const formData = new FormData()
    formData.append('id', id)
    await axios
      .delete(
        `http://137.184.215.16:8000/api/v1.0/${
          route == 'updateproduct'
            ? 'prod'
            : route == 'updatesupplier'
            ? 'supp'
            : route == 'createuser'
            ? 'user'
            : route == 'updateorder'
            ? 'order'
            : ''
        }`,
        { data: formData },
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      .then(res => {
        if (res.data.data.status == 'error') {
          toast.error('Something went wrong!')
        } else {
          getUsersData()
          getSuppliersData()
          getSupplierData()
          toast.success(
            `${
              route == 'updateproduct'
                ? 'Product Deleted Successfully!'
                : route == 'updatesupplier'
                ? 'Supplier Deleted Successfully!'
                : route == 'createuser'
                ? 'User Deleted Successfully!'
                : route == 'updateorder'
                ? 'Order Deleted Successfully!'
                : ''
            }`
          )
        }
      })
  }
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }
  const handleSearch = prop => event => {
    let value = event.target.value.toLowerCase()
    let result = []
    console.log(value)
    result = rows.filter(data => {
      return route == 'createuser'
        ? data.id.search(value) != -1 || data.email.search(value) != -1 || data.fname.search(value) != -1
        : route == 'updateproduct'
        ? data.name.search(value) != -1
        : route == 'updateorder'
        ? data.status.search(value) != -1
        : route == 'updatesupplier'
        ? data.coop.search(value) != -1
        : data.id.search(value) != -1
    })
    setFilterData(result)
  }
  const handleEdit = id => {
    router.push(`/${route}/${id}`)
  }
  getUsersData()
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Toaster />
      <TableContainer sx={{ maxHeight: 440 }}>
        <Grid container>
          <Grid item container direction='row'>
            <Grid item xs={12} sm={6}></Grid>
            <Grid item xs={12} sm={6}>
              <Button
                size='large'
                variant='contained'
                sx={{ float: 'right', marginRight: 6, marginTop: 1 }}
                onClick={() => router.push(`/${route}`)}
              >
                <Typography variant='p' color='common.white'>
                  Add
                </Typography>
              </Button>
              <TextField
                autoFocus
                id='email'
                type='text'
                onChange={handleSearch()}
                sx={{ marginBottom: 4, float: 'right', marginRight: 5 }}
                placeholder='Searching for something?'
              />
            </Grid>
          </Grid>
        </Grid>

        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns?.map(column => (
                <TableCell key={column}>{column}</TableCell>
              ))}
              <TableCell>{'Actions'}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filterData != null
              ? filterData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                  return (
                    <TableRow hover role='checkbox' tabIndex={-1} key={index}>
                      {columns &&
                        columns.map(column => {
                          return (
                            <>
                              <TableCell key={column}>{row[column]}</TableCell>
                            </>
                          )
                        })}
                      <TableCell>
                        <Grid container>
                          <Grid item container direction='row'>
                            <Grid item xs={12} sm={6}>
                              <Button fullWidth size='small' variant='contained' onClick={() => handleEdit(row['id'])}>
                                <Typography variant='p' color='common.white'>
                                  Edit
                                </Typography>
                              </Button>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                              <Button
                                fullWidth
                                size='small'
                                variant='contained'
                                sx={{ marginLeft: 5 }}
                                onClick={() => handleDelete(row['id'])}
                              >
                                <Typography variant='p' color='common.white'>
                                  Delete
                                </Typography>
                              </Button>
                            </Grid>
                          </Grid>
                        </Grid>
                      </TableCell>
                    </TableRow>
                  )
                })
              : rows &&
                rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                  return (
                    <TableRow hover role='checkbox' tabIndex={-1} key={index}>
                      {columns != null &&
                        columns.map(column => {
                          return (
                            <>
                              <TableCell key={column}>{row[column]}</TableCell>
                            </>
                          )
                        })}
                      <TableCell>
                        <Grid container>
                          <Grid item container direction='row'>
                            <Grid item xs={12} sm={6}>
                              <Button fullWidth size='small' variant='contained' onClick={() => handleEdit(row['id'])}>
                                <Typography variant='p' color='common.white'>
                                  Edit
                                </Typography>
                              </Button>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                              <Button
                                fullWidth
                                size='small'
                                variant='contained'
                                sx={{ marginLeft: 5 }}
                                onClick={() => handleDelete(row['id'])}
                              >
                                <Typography variant='p' color='common.white'>
                                  Delete
                                </Typography>
                              </Button>
                            </Grid>
                          </Grid>
                        </Grid>
                      </TableCell>
                    </TableRow>
                  )
                })}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default TableStickyHeader
