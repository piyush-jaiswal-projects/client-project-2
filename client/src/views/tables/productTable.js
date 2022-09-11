// ** MUI Imports
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import CardActions from '@mui/material/CardActions'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useDispatch, useSelector } from 'react-redux'
import { setTotalPrice, setTotalQuantity, removeProduct, updateQuantity } from 'src/redux/features/selectedProduct'
import { useState, useEffect } from 'react'

const ProductTable = ({ rows }) => {
  const dispatch = useDispatch()
  const removeItem = id => {
    dispatch(removeProduct(id))
  }
  const handleQuantity = (data, id) => {
    const quantityData = { data, id }
    dispatch(updateQuantity(quantityData))
  }
  useEffect(() => {
    dispatch(setTotalPrice(rows))
    dispatch(setTotalQuantity(rows))
  }, [rows])
  const totalQuantity = useSelector(state => state.selectedProduct.totalQuantity)
  const totalPrice = useSelector(state => state.selectedProduct.totalPrice)
  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 100 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>#</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Free Quantity</TableCell>
              <TableCell>Total Per Q</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows &&
              rows.length > 0 &&
              rows.map(row => (
                <TableRow key={row.name}>
                  <TableCell component='th' scope='row'>
                    <Button size='small' type='submit' variant='contained' onClick={() => removeItem(row.id)}>
                      <Typography variant='p' color='common.white'>
                        Delete
                      </Typography>
                    </Button>
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    {row.id}
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    {row.name}
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    {row.price}
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    <TextField
                      type='number'
                      sx={{ width: 100 }}
                      defaultValue={row.quantity}
                      onChange={e => handleQuantity(e.target.value, row.id)}
                    />
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    <TextField type='text' sx={{ width: 100 }} />
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    {row.quantity * row.price}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Total</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>{totalQuantity}</TableCell>
              <TableCell>Free Quantity</TableCell>
              <TableCell>{totalPrice}</TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
      
    </>
  )
}

export default ProductTable
