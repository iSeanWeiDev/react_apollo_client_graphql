import React from 'react';
import { Box, Typography } from '@material-ui/core';
import Carousel from 'react-material-ui-carousel';
import items from './items';
import useStyles from './style';

const HomeHeroImages = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Carousel
        autoPlay
        interval={24000}
        animation="fade"
        indicators={false}
        className={classes.image}
      >
        {items.map((el, index) => (
          <Box
            key={index}
            style={{
              width: '100%',
              backgroundImage: `url(${el.image})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'top',
              backgroundSize: '100% auto'
            }}
          >
            <div style={{ padding: '10.5vw' }}>
              <Typography variant="h3"> {el.title}</Typography>
              <Typography variant="h6"> {el.subtitle}</Typography>
              <Typography variant="body1"> {el.description}</Typography>
            </div>
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};

export default HomeHeroImages;
