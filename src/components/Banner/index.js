import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import LoyaltyTwoToneIcon from '@material-ui/icons/LoyaltyTwoTone';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 80,
    backgroundColor: theme.palette.secondary.main,
  },
  icon: {
    fontSize: 82,
    color: theme.palette.error.main
  }
}));

const Banner = () => {
  const classes = useStyles();
  return (
    <Paper variant="outlined" className={classes.root}>
      <Grid container direction="row" align="center" justify="center">
        <Grid item>
          <Box my={2} p={3}>
            <Typography variant="h2">
              Bienvenidos!
            </Typography>
            <LoyaltyTwoToneIcon className={classes.icon} />
            <Typography variant="h5" gutterBottom>
              Todo se va!
            </Typography>
            <Typography variant="body1" gutterBottom>
              Estamos vendiendo todas nuestras cosas debido a que se nos presentó la oportunidad de ir a trabajar al extranjero.
            </Typography>
            <Typography variant="body1" gutterBottom>
              Ya hay varios productos cargados y listos para ser vendidos (algunos ya se vendieron incluso!), y seguiremos cargando más a medida que tengamos tiempo. Si no encuentras algo que te interesa, vuelve más adelante a revisar!
            </Typography>
            <Typography variant="body1">
              Si tienen cualquier pregunta, por favor no duden en contactarnos (WhatsApp solamente). <strong>Gracias!</strong>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default Banner;
