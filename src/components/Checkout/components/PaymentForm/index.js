import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const PaymentForm = () => {
  return (
    <>
      <Grid container align="center" justify="center">
        <Typography variant="h5" gutterBottom>Pago</Typography>
      </Grid>
      <Grid container justify="center" align="center">
        <Grid item xs={10}>
          <Typography variant="body1">Para realizar el pago, por favor deposite el total de la compra a la siguiente cuenta bancaria*:</Typography>
          <Box my={3}>
            <Grid container justify="center" spacing={2}>
              <Grid item xs align="right"><Typography variant="subtitle2">Banco:</Typography></Grid>
              <Grid item xs align="left"><Typography>Falabella</Typography></Grid>
            </Grid>
            <Grid container justify="center" spacing={2}>
              <Grid item xs align="right"><Typography variant="subtitle2">Cuenta:</Typography></Grid>
              <Grid item xs align="left"><Typography>Vista N&deg; 5-502-007556-0</Typography></Grid>
            </Grid>
            <Grid container justify="center" spacing={2}>
              <Grid item xs align="right"><Typography variant="subtitle2">Nombre:</Typography></Grid>
              <Grid item xs align="left"><Typography>Pablo Garín Cristi</Typography></Grid>
            </Grid>
            <Grid container justify="center" spacing={2}>
              <Grid item xs align="right"><Typography variant="subtitle2">RUT:</Typography></Grid>
              <Grid item xs align="left"><Typography>16.100.333-6</Typography></Grid>
            </Grid>
            <Grid container justify="center" spacing={2}>
              <Grid item xs align="right"><Typography variant="subtitle2">E-Mail:</Typography></Grid>
              <Grid item xs align="left"><Typography>pablo.garin@hotmail.com</Typography></Grid>
            </Grid>
          </Box>
          <Typography variant="body1">Una vez realizado el pago debe enviar el comprobante al correo <strong>pablo.garin@hotmail.com</strong>.</Typography>
          <Box mt={1}>
            <Typography variant="body2">*: La reserva del producto dura 24 horas. Si realiza su deposito después de esto es posible que el producto ya no posea stock. En caso de que esto suceda, por favor contactese con nosotros y el dinero será devuelto.</Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default PaymentForm;
