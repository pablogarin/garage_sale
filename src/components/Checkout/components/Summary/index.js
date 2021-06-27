import React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { asPrice } from '../../../../utils/productUtils';

const Summary = ({ cart }) => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography variant="subtitle1">Resumen</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography>Editar Carro</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>
                <Typography variant="subtitle2">{cart?.products.length} Items</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart && cart.products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <img
                  src={product.image}
                  onError={(e) => e.target.src = '/img/no-image-icon.png'}
                  height={40}
                  alt={product.name}
                />
              </TableCell>
              <TableCell>
                <Typography variant="body2">{product.quantity} &times; {product.name}</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="body2" noWrap>{asPrice(product.price)}</Typography>
              </TableCell>
            </TableRow>
            ))}
            <TableRow>
              <TableCell>
                <Typography variant="h5">Total</Typography>
              </TableCell>
              <TableCell align="right" colSpan={2}>
                <Typography variant="h5" noWrap>{asPrice(cart?.total)}</Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default Summary;
