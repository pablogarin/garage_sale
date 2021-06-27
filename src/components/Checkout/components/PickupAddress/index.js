import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const PickupAddress = () => {
  return (
    <>
      <Grid container align="center" justify="center">
        <Typography variant="h5" gutterBottom>Retiro de la Compra</Typography>
      </Grid>
      <Grid container justify="center" align="center">
        <Grid item xs={10}>
          <Typography variant="body1">Los productos podrán ser retirados del 15 al 17 de Julio en la siguiente dirección*:</Typography>
          <Box my={2}>
            <Grid container justify="center" spacing={2}>
              <Grid item xs align="right"><Typography variant="subtitle2">Dirección:</Typography></Grid>
              <Grid item xs align="left"><Typography>Los Estanques 9565</Typography></Grid>
            </Grid>
            <Grid container justify="center" spacing={2}>
              <Grid item xs align="right"><Typography variant="subtitle2">Comuna:</Typography></Grid>
              <Grid item xs align="left"><Typography>Vitacura</Typography></Grid>
            </Grid>
            <Grid container justify="center" spacing={2}>
              <Grid item xs align="right"><Typography variant="subtitle2">Región:</Typography></Grid>
              <Grid item xs align="left"><Typography>Metropolitana</Typography></Grid>
            </Grid>
          </Box>
          <Typography variant="body1">Debido a la pandemia, antes de venir a retirar los productos se debe coordinar por correo la hora del retiro.</Typography>
          <Box mt={1}>
            <Typography variant="body2">*: El plazo para retirar los productos el limitado, y en caso de no retirar los productos en la fecha especificada, la compra deberá ser anulada y el dinero devuelto.</Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default PickupAddress;
