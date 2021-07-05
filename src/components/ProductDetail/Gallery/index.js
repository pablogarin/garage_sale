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
    cursor: 'pointer'
  },
  image: {
    height: '100%',
  }
}))

const Gallery = ({ images }) => {
  const classes = useStyles();

  const openImage = (url) => {
    window.open(url, '_blank')
  }

  return (
    <div>
      <Slide easing="ease">
        {images && images.map(image => (
        <div onClick={() => openImage(image)}>
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
