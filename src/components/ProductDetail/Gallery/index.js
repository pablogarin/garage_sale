import React from 'react'
import { Slide } from 'react-slideshow-image';
import { makeStyles } from '@material-ui/core/styles';
import 'react-slideshow-image/dist/styles.css'

const useStyles = makeStyles(() => ({
  slide: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 350,
    overflow: 'hidden',
  },
  image: {
    height: '100%',
  }
}))

const Gallery = ({ images }) => {
  const classes = useStyles();
  return (
    <div>
      <Slide easing="ease">
        {images && images.map(image => (
        <div>
          <div className={classes.slide}>
            <img
             src={image}
             alt={image}
             className={classes.image}
            />
          </div>
        </div>
        ))}
      </Slide>
    </div>
  )
}

export default Gallery
