import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: '10%',
  },
});

const ProductTile = (props) => {
  const {
    name,
    image,
    price,
    availableDate,
    showDetails
  } = props;
  const asPrice = (value) => {
    if (isNaN(value)) return '$ - '; 
    return `$ ${String(price).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}`
  }
  const classes = useStyles();
  return (
    <Card>
      <CardActionArea onClick={showDetails}>
        <CardHeader
          title={name}
        />
        <CardMedia
          component="img"
          alt={name}
          className={classes.media}
          image={image}
          title={name}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            Disponible desde el {availableDate}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            {asPrice(price)}
          </Typography>
        </CardContent>  
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Agregar al Carro
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProductTile;
