import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import { useSelector } from 'react-redux'

const TableBasic = ({ rows }) => {
  const totalQuantity = useSelector(state => state.selectedProduct.totalQuantity)
  const totalPrice = useSelector(state => state.selectedProduct.totalPrice)

  return (
    <TableContainer>
      <Table sx={{ minWidth: 100 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows &&
            rows.length > 0 &&
            rows.map(row => (
              <TableRow key={row.name}>
                <TableCell component='th' scope='row'>
                  {row.name}
                </TableCell>
                <TableCell component='th' scope='row'>
                  {row.quantity}
                </TableCell>
                <TableCell component='th' scope='row'>
                  {row.quantity * row.price}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
        <TableHead>
          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell>{totalQuantity}</TableCell>
            <TableCell>{totalPrice}</TableCell>
          </TableRow>
        </TableHead>
      </Table>
    </TableContainer>
  )
}

export default TableBasic
