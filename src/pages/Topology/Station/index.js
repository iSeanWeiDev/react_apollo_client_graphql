import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import {
  Box,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
  Divider
} from '@material-ui/core';
import { faBroadcastTower } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Add as AddIcon } from '@material-ui/icons';
import graphql from '@app/graphql';
import useStyles from './style';

const TStation = () => {
  const classes = useStyles();
  const [loadedData, setLoadedData] = useState([]);
  const [openCreate, setOpenCreate] = useState(false);
  const { loading, error, data } = useQuery(graphql.queries.grouping, {
    variables: { schemaType: 'station' }
  });

  useEffect(() => {
    if (!error && !loading) {
      setLoadedData(data.grouping);
    }
  }, [loading, data, error]);

  return (
    <Box className={classes.root}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" className={classes.panelTitle}>
          <FontAwesomeIcon
            icon={faBroadcastTower}
            className={classes.panelIcon}
          />
          Stations
        </Typography>
        <Button
          variant="contained"
          className={classes.addBtn}
          onClick={() => setOpenCreate(true)}
        >
          <AddIcon />
          New Station
        </Button>
      </Box>
      <Divider className={classes.separator} />
      <main className={classes.main}>
        <Grid
          container
          direction="row"
          spacing={2}
          justify="flex-start"
          alignItems="flex-start"
        >
          {loadedData.map((el) => (
            <Grid item key={el['_id']} xs={12} sm={12} md={6} lg={4}>
              <Card>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="140"
                    image="https://picsum.photos/200/300"
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="h2">
                      {el.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {!el.desc || !el.desc?.long ? (
                        <em>No information</em>
                      ) : (
                        <>{el.desc.long}</>
                      )}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions className={classes.cardAction}>
                  <Button size="small" color="secondary">
                    delete
                  </Button>
                  <Button size="small" color="primary">
                    Load more
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </main>
    </Box>
  );
};

export default TStation;
