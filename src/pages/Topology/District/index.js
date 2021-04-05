import React, { useEffect, useState, useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
  Divider,
  FormControl,
  InputBase,
  InputAdornment,
  IconButton
} from '@material-ui/core';
import { Add as AddIcon, Search as SearchIcon } from '@material-ui/icons';
import { useSnackbar } from 'notistack';
import { useMutation } from '@apollo/client';
import { faBroadcastTower } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LoadingCard } from '@app/components/Cards';
import CreateDistrict from './Create';
import PreviewDistrict from './Preview';
import graphql from '@app/graphql';
import noLogo from '@app/assets/imgs/no-logo.jpg';
import useStyles from './style';

const TDistrict = ({ resources, stations }) => {
  const classes = useStyles();
  const history = useHistory();
  const params = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [loadingPage, setLoadingPage] = useState(false);
  const [stationName, setStationName] = useState('');
  const [loadedData, setLoadedData] = useState([]);
  const [openCreate, setOpenCreate] = useState(false);
  const [openPreview, setOpenPreview] = useState(false);
  const [selectedData, setSelectedData] = useState();
  const [currMainWidth, setCurrMainWidth] = useState(null);
  const [searchKey, setSearchKey] = useState('');

  const [createGrouping] = useMutation(graphql.mutations.createGrouping, {
    update(cache, { data: { createGrouping } }) {
      const existData = cache.readQuery({
        query: graphql.queries.grouping,
        variables: {
          schemaType: 'district'
        }
      });
      let data = existData ? existData.grouping.slice() : [];
      const idx = data.findIndex((el) => el['_id'] === createGrouping['_id']);
      if (idx > -1) {
        data[idx] = createGrouping;
      } else {
        data = [...data, createGrouping];
      }

      cache.writeQuery({
        query: graphql.queries.grouping,
        variables: {
          schemaType: 'district'
        },
        data: {
          grouping: data
        }
      });
    }
  });

  const [deleteDocument] = useMutation(graphql.mutations.deleteDocument, {
    update(cache, { data: { deleteDocument } }) {
      const idx = deleteDocument.split(' ')[1];
      const existData = cache.readQuery({
        query: graphql.queries.grouping,
        variables: {
          schemaType: 'district'
        }
      });

      const tmp = existData.grouping.filter((el) => el['_id'] !== idx);
      cache.writeQuery({
        query: graphql.queries.grouping,
        variables: {
          schemaType: 'district'
        },
        data: {
          grouping: tmp
        }
      });
    }
  });

  const mainRef = useCallback((node) => {
    if (node !== null) {
      setCurrMainWidth(node.offsetWidth);
      //fetch(...)   load data
    }
  }, []);

  useEffect(() => {
    setLoadingPage(true);
    if (resources && currMainWidth) {
      if (params.parentID) {
        const elPerRow = Math.floor(currMainWidth / 300);
        const countElLastRow = resources.length % elPerRow;
        let tmp = resources.slice();
        tmp = tmp.filter((el) => el.parentId === params.parentID);
        for (let i = 0; i < elPerRow - countElLastRow; i++) {
          tmp.push({ _id: i, name: '', status: 'fake_data' });
        }
        const station = stations.find((el) => el['_id'] === params.parentID);
        setStationName(station?.name);
        setLoadedData(tmp);
      }
      setLoadingPage(false);
    }
  }, [resources, currMainWidth]);

  const handleSearch = (e) => {
    let countElLastRow, tmp;
    setSearchKey(e.target.value);
    const elPerRow = Math.floor(currMainWidth / 300);

    if (e.target.value.length >= 3) {
      const filteredData = loadedData.filter((el) =>
        el.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      countElLastRow = filteredData.length % elPerRow;
      tmp = filteredData.slice();
    } else {
      countElLastRow = resources.length % elPerRow;
      tmp = resources.slice();
    }

    for (let i = 0; i < elPerRow - countElLastRow; i++) {
      tmp.push({ _id: i, name: '', status: 'fake_data' });
    }

    setLoadedData(tmp);
  };

  const handleCardAction = async (method, value) => {
    try {
      setSelectedData(value);
      if (method === 'delete') {
        const response = await deleteDocument({
          variables: {
            id: value['_id'],
            schemaType: 'district'
          }
        });
        const { data } = response;
        enqueueSnackbar(data.deleteDocument, { variant: 'success' });
      }

      if (method === 'view') {
        setOpenPreview(true);
      }

      if (method === 'body') {
        const id = value['_id'];

        history.push({ pathname: `/topologies/schools/null/${id}` });
      }
    } catch (error) {
      console.log(error.message);
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  const handleCreateDialogChange = async (flag, value) => {
    try {
      if (flag) {
        await createGrouping({
          variables: {
            schemaType: 'district',
            schemaVer: 1,
            version: 1,
            name: value.name,
            desc: {
              title: value.title,
              short: value.short,
              long: value.long
            }
          }
        });
        enqueueSnackbar('Successfully district created!', {
          variant: 'success'
        });
      }

      setOpenCreate(false);
    } catch (error) {
      console.log(error.message);
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  return (
    <Box className={classes.root}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" className={classes.panelTitle}>
          <FontAwesomeIcon
            icon={faBroadcastTower}
            className={classes.panelIcon}
          />
          Districts ({stationName})
        </Typography>
        <Box display="flex" alignItems="center">
          <FormControl className={classes.searchBar}>
            <InputBase
              placeholder="Search districts..."
              type="text"
              variant="outline"
              autoFocus
              value={searchKey}
              onChange={handleSearch}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton size="small">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Button
            variant="contained"
            className={classes.addBtn}
            onClick={() => setOpenCreate(true)}
          >
            <AddIcon />
            New district
          </Button>
        </Box>
      </Box>
      <Divider className={classes.separator} />
      <LoadingCard loading={loadingPage} height={`calc(100vh - 200px)`}>
        <main className={classes.main} ref={mainRef}>
          {loadedData.map((el) =>
            el.status === 'fake_data' ? (
              <div key={el['_id']} style={{ width: 300, margin: 8 }}></div>
            ) : (
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
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
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
            )
          )}
          <CreateDistrict
            open={openCreate}
            onChange={handleCreateDialogChange}
          />
          <PreviewDistrict
            open={openPreview}
            resources={selectedData}
            onChange={() => setOpenPreview(!openPreview)}
          />
        </main>
      </LoadingCard>
    </Box>
  );
};

export default TDistrict;
