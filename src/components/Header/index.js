import React from 'react';
import {
  Link
} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    color: '#fff',
  },
  title: {
    flexGrow: 1,
  },
  cartButton: {
    color: '#fff',
  },
}))

const Header = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title}>Venta de Garage</Typography>
          <IconButton aria-label="Carro" className={classes.cartButton}>
            <ShoppingCartOutlinedIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
