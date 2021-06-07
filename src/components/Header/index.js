import React, { useState } from 'react';
import {
  useHistory
} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const history = useHistory();
  const classes = useStyles();
  const categories = [
    {
      id: 0,
      name: 'Home'
    },
    {
      id: 1,
      name: 'Electrodomesticos'
    }
  ]
  const toggleMenu = (state=null, event) => {
    if (event && (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift'))) {
      return;
    }
    if (typeof state === 'boolean') {
      setIsMenuOpen(state);
    } else {
      setIsMenuOpen(!isMenuOpen);
    }
  }
  const handleClick = (category) => {
    let url = `/category/${category.id}`
    if (category.id === 0) {
      url = '/';
    }
    history.push(url);
    toggleMenu(false);
  }
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={toggleMenu}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title}>Venta de Garage</Typography>
          <IconButton aria-label="Carro" className={classes.cartButton}>
            <ShoppingCartOutlinedIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={isMenuOpen}
        onClose={(event) => toggleMenu(false, event)}
      >
        <List>
          {categories.map(cat => (
          <ListItem button key={cat.id} onClick={() => handleClick(cat)}>
            <ListItemText primary={cat.name} />
          </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
}

export default Header;
