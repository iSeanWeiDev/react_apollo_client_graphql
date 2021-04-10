import React, { useState, useEffect } from 'react';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button
} from '@material-ui/core';
import { useGroupingQuery } from '@app/utils/hooks/apollo';
import { LoadingCard } from '@app/components/Cards';
import noLogo from '@app/assets/imgs/no-logo.jpg';
import useStyles from './style';

const GalleryList = ({ type }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [loadedData, setLoadedData] = useState([]);
  const resourceData = useGroupingQuery({ schemaType: type });

  useEffect(() => {
    setLoading(true);
    if (resourceData) {
      setLoadedData(resourceData);
      setLoading(false);
    }
  }, [resourceData]);

  const handleCardAction = async (method, value) => {};

  return (
    <LoadingCard
      loading={loading}
      height={`calc(100vh - 350px)`}
      className={classes.listMain}
    >
      {loadedData.map((el) => (
        <Card className={classes.card} key={el['_id']}>
          <CardActionArea onClick={() => handleCardAction('body', el)}>
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              height="140"
              image={el.avatar?.url ? el.avatar?.url : noLogo}
              title="Contemplative Reptile"
            />
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="h6" component="h2">
                {el.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {!el.desc || !el.desc?.long ? (
                  <em>No description</em>
                ) : (
                  <React.Fragment>
                    {el.desc.long.length > 150
                      ? `${el.desc.long.substring(0, 150)}... ...`
                      : el.desc.long}
                  </React.Fragment>
                )}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions className={classes.cardAction}>
            <Button
              size="small"
              color="secondary"
              onClick={() => handleCardAction('delete', el)}
            >
              delete
            </Button>
            <Button
              size="small"
              color="primary"
              onClick={() => handleCardAction('view', el)}
            >
              view
            </Button>
          </CardActions>
        </Card>
      ))}
    </LoadingCard>
  );
};

export default GalleryList;
