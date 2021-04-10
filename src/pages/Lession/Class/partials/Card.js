import React from 'react';
import {
  Card,
  Button,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
  CardMedia
} from '@material-ui/core';
import noLogo from '@app/assets/imgs/no-logo.jpg';
import useStyles from '../style';

const ClassCard = ({ data, onChange, ...rest }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card} {...rest}>
      <CardActionArea onClick={() => onChange('body', data)}>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={data.avatar?.url ? data.avatar?.url : noLogo}
          title="Contemplative Reptile"
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h6" component="h2">
            {data.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {!data.desc || !data.desc?.long ? (
              <em>No description</em>
            ) : (
              <React.Fragment>
                {data.desc.long.length > 55
                  ? `${data.desc.long.substring(0, 55)}... ...`
                  : data.desc.long}
              </React.Fragment>
            )}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardAction}>
        <Button
          size="small"
          color="secondary"
          onClick={() => onChange('delete', data)}
        >
          delete
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => onChange('view', data)}
        >
          load more
        </Button>
      </CardActions>
    </Card>
  );
};

export default ClassCard;
