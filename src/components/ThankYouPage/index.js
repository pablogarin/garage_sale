import React, { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';
import PrintOutlinedIcon from '@material-ui/icons/PrintOutlined';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, useParams } from 'react-router-dom';
import OrderClient from '../../api/OrderClient';
import { asPrice, formatDate } from '../../utils/productUtils';

const orderClient = new OrderClient(process.env.REACT_APP_API_URL);

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 32,
    paddingBottom: 32,
  },
  paper: {
    '@media print': {
      position: 'absolute',
      width: '100%',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    }
  },
  details: {
    marginTop: 48
  },
  icon: {
    fontSize: 100,
    color: '#6D9',
    marginBottom: 32
  },
  img: {
    '@media print': {
      display: 'none'
    }
  },
  button: {
    marginTop: 32
  },
  print: {
    '@media print': {
      border: 'none',
      boxShadow: 'none',
      display: 'block',
      fontSize: 12
    }
  }
}));

const ThankYouPage = () => {
  const [order, setOrder] = useState(null);
  const [client, setClient] = useState(null);
  const history = useHistory();
  const { orderId } = useParams();
  
  const classes = useStyles();
  
  useEffect(() => {
    orderClient.get(orderId, (order) => {
      setOrder(order);
      setClient(order.user);
    })
  }, [orderId]);

  const goToHome = () => {
    history.push("/");
  }

  const printOrder = () => {
    window.print();
  }

  return (
    <>
    <Grid container justify="center" align="center" className={classes.root}>
      <Grid item xs={12} md={8}>
        <Paper className={`${classes.print} ${classes.paper}`}>
          <Box p={4}>
            <Box displayPrint="none">
              <Grid container justify="center" align="center">
                <Typography variant="h3">¡Gracias por su compra!</Typography>
              </Grid>
              <Grid container justify="center" align="center">
                <CheckCircleOutlineRoundedIcon className={classes.icon} />
              </Grid>
            </Box>
            <Typography variant="h6" gutterBottom className={classes.print}>
              Su compra fue finalizada con éxito.
            </Typography>
            <Typography variant="body1" gutterBottom className={classes.print}>
              Recuerde que para que su compra quede confirmada, debe realizar el deposito por el total de la compra antes de 2 horas, o de lo contrario la compra se invalidará y los productos volverán a estar a la venta.
            </Typography>
            <Typography variant="body1" className={classes.print}>
              Una vez haya realizado el deposito, debe enviar un correo con el comprobante de pago al correo <strong>pablo.garin@hotmail.com</strong>, con el asunto <strong>&quot;Comprobante de pago de orden {order?.id}&quot;.</strong>
            </Typography>
            <Typography variant="h6" className={`${classes.details} ${classes.print}`}>Detalles de la Compra</Typography>
            <TableContainer>
              <Table aria-label="spanning table">
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      <Typography variant="h5" noWrap className={classes.print}>Orden {order?.id}</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={2}>
                      <Typography variant="h6" className={classes.print}>Fecha de Compra</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="h6" className={classes.print}>{order && formatDate(order.date)}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={3}>
                      <Typography variant="h6" className={classes.print}>Cliente</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography className={classes.print}>Nombre</Typography>
                    </TableCell>
                    <TableCell colSpan={2} align="right">
                      <Typography className={classes.print}>{client?.firstName} {client?.lastName}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography className={classes.print}>E-Mail</Typography>
                    </TableCell>
                    <TableCell colSpan={2} align="right">
                      <Typography className={classes.print}>{client?.email}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography className={classes.print}>Teléfono</Typography>
                    </TableCell>
                    <TableCell colSpan={2} align="right">
                      <Typography className={classes.print}>{client?.phone}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={3}>
                      <Typography variant="h6" className={classes.print}>Productos</Typography>
                    </TableCell>
                  </TableRow>
                  {order && order.products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell colSpan={2}>
                      <Grid container alingItems="center">
                        <Grid item xs>
                          <img
                            src={product.image}
                            onError={(e) => e.target.src = '/img/no-image-icon.png'}
                            height={40}
                            alt={product.name}
                          />
                        </Grid>
                        <Grid container item xs={10} alignItems="center">
                          <Typography variant="body2" className={classes.print}>{product.quantity} &times; {product.name}</Typography>
                        </Grid>
                      </Grid>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" noWrap className={classes.print}>{asPrice(product.price)}</Typography>
                    </TableCell>
                  </TableRow>
                  ))}
                  <TableRow>
                    <TableCell>
                      <Typography variant="h6" className={classes.print}>Total</Typography>
                    </TableCell>
                    <TableCell align="right" colSpan={2}>
                      <Typography variant="h6" noWrap className={classes.print}>{asPrice(order?.total)}</Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Box displayPrint="none">
              <Grid
                container
                justify="space-evenly"
                align="center"
                pt={4}
                className={classes.button}
                spacing={2}
              >
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => goToHome()}
                >
                  <HomeIcon />
                  &nbsp;Volver a la tienda
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => printOrder()}
                >
                  <PrintOutlinedIcon />
                  &nbsp;Imprimir
                </Button>
              </Grid>
            </Box>
          </Box>
        </Paper>
      </Grid>
    </Grid>
    </>
  )
}

export default ThankYouPage;
