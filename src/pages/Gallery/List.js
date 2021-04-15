import React, { useState, useEffect, useCallback } from 'react';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box
} from '@material-ui/core';
import { useMutation } from '@apollo/client';
import { useGroupingQuery } from '@app/utils/hooks/apollo';
import graphql from '@app/graphql';
import { isEmptyObject } from '@app/utils/data-format';
import { LoadingCard } from '@app/components/Cards';
import CreateGalleryDialog from './Create';
import EditGalleryDialog from './Edit';
import noLogo from '@app/assets/imgs/no-logo.jpg';
import useStyles from './style';
import { useSnackbar } from 'notistack';

const GalleryList = ({
  type,
  isfiltered,
  dataByFilter,
  openCreate,
  setOpenCreate
}) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [loadedData, setLoadedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currMainWidth, setCurrMainWidth] = useState(null);
  const [title, setTitle] = useState('');
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedGallery, setSelectedGallery] = useState({});

  const resourceData = useGroupingQuery({ schemaType: type });
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    switch (type) {
      case 'stockImage':
        setTitle('Stock Image');
        break;
      case 'stockBanner':
        setTitle('Stock Banner');
        break;
      case 'stockLogo':
        setTitle('Stock Logo');
        break;
      case 'stockAvatar':
        setTitle('Stock Avatar');
        break;
      default:
        break;
    }
  }, [type]);

  const [createGrouping] = useMutation(graphql.mutations.createGrouping, {
    update(cache, { data: { createGrouping } }) {
      const existData = cache.readQuery({
        query: graphql.queries.grouping,
        variables: {
          schemaType: type
        }
      });
      const tmp = [...existData.grouping, createGrouping];
      cache.writeQuery({
        query: graphql.queries.grouping,
        variables: {
          schemaType: type
        },
        data: {
          grouping: tmp
        }
      });
    }
  });

  const [updateGrouping] = useMutation(graphql.mutations.updateGrouping, {
    update(cache, { data: { updateGrouping } }) {
      const existData = cache.readQuery({
        query: graphql.queries.grouping,
        variables: {
          schemaType: type
        }
      });
      let tmp = existData.grouping.slice();
      const idx = tmp.findIndex((el) => el['_id'] === updateGrouping['_id']);
      if (idx > -1) {
        tmp[idx] = updateGrouping;
      }

      cache.writeQuery({
        query: graphql.queries.grouping,
        variables: {
          schemaType: type
        },
        data: {
          grouping: tmp
        }
      });
    }
  });

  const [deleteDocument] = useMutation(graphql.mutations.deleteDocument, {
    update(cache) {
      const existData = cache.readQuery({
        query: graphql.queries.grouping,
        variables: {
          schemaType: type
        }
      });
      if (isEmptyObject(existData.grouping)) {
        const tmp = existData.grouping.filter(
          (el) => el['_id'] !== selectedGallery.idx
        );
        cache.writeQuery({
          query: graphql.queries.grouping,
          variables: {
            schemaType: type
          },
          data: {
            grouping: tmp
          }
        });
      }
    }
  });

  useEffect(() => {
    setLoading(true);
    if (resourceData) {
      const elPerRow = Math.floor(currMainWidth / 250);
      const countElLastRow = resourceData.length % elPerRow;
      const data = resourceData.map((el, index) => ({
        id: index + 1,
        idx: el['_id'],
        schemaVer: el.schemaVer,
        version: el.version,
        name: el.name,
        avatar: el.avatar
      }));
      const tmp = data.slice();
      for (let i = 0; i < elPerRow - countElLastRow + 1; i++) {
        tmp.push({ _id: i, name: '', status: 'fake_data' });
      }
      const tmp1 = dataByFilter.slice();
      for (let i = 0; i < elPerRow - countElLastRow + 1; i++) {
        tmp1.push({ _id: i, name: '', status: 'fake_data' });
      }
      setLoadedData(tmp);
      setFilteredData(tmp1);
      setLoading(false);
    }
  }, [resourceData, currMainWidth, dataByFilter]);

  const mainRef = useCallback((node) => {
    if (node !== null) {
      setCurrMainWidth(node.offsetWidth);
    }
  }, []);

  const handleCardAction = async (e, method, value) => {
    e.stopPropagation();
    if (method === 'body') {
      setSelectedGallery(value);
      setOpenEdit(true);
    } else if (method === 'delete') {
      try {
        const response = await deleteDocument({
          variables: {
            schemaType: type,
            id: value.idx
          }
        });

        const tmp = loadedData.filter((el) => el.idx !== value.idx);
        setLoadedData(tmp);
        const { data } = response;
        enqueueSnackbar(data.deleteDocument, { variant: 'success' });
      } catch (error) {
        console.log(error.message);
        enqueueSnackbar(error.message, { variant: 'error' });
      }
    }
  };

  const handleCreateDialogChange = async (flag, value) => {
    try {
      if (flag) {
        const response = await createGrouping({
          variables: {
            schemaType: type,
            schemaVer: 1,
            version: 1,
            name: value.name,
            avatar: {
              url: value.photo,
              type: value.galleryType,
              altText: value.altText
            }
          }
        });
        const { data } = response;
        const tmp = loadedData.slice();
        setLoadedData([
          {
            ...value,
            idx: data.createGrouping['_id'],
            id: tmp.length > 0 ? tmp[tmp.length - 1]['id'] + 1 : 1,
            avatar: {
              url: value.photo,
              type: value.galleryType,
              altText: value.altText
            }
          },
          ...tmp
        ]);
        enqueueSnackbar('Successfully added!', { variant: 'success' });
      }
      setOpenCreate(false);
    } catch (error) {
      console.log(error.message);
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  const handleEditDialogChange = async (flag, method, value) => {
    try {
      if (flag) {
        if (method === 'save') {
          const findedData = loadedData.find((el) => el.idx === value.idx);
          const response = await updateGrouping({
            variables: {
              id: value.idx,
              name: value.name ? value.name : findedData.name,
              schemaType: type,
              schemaVer: findedData.schemaVer,
              version: findedData.version,
              avatar: {
                url: value.avatar.url
                  ? value.avatar.url
                  : findedData.avatar?.url,
                type: value.avatar.type
                  ? value.avatar.type
                  : findedData.avatar?.type,
                altText: value.avatar.altText
                  ? value.avatar.altText
                  : findedData.avatar?.altText
              }
            }
          });
          const { data } = response;
          let tmp = loadedData.slice();
          const idx = tmp.findIndex((el) => el.idx === value.idx);
          tmp[idx] = {
            ...tmp[idx],
            name: data.updateGrouping.name,
            avatar: {
              url: data.updateGrouping.avatar?.url,
              type: data.updateGrouping.avatar?.type,
              altText: data.updateGrouping.avatar?.altText
            }
          };

          setLoadedData(tmp);
          enqueueSnackbar(
            `Successfully User ${data.updateGrouping.name} updated.`,
            { variant: 'success' }
          );
        }
        if (method === 'delete') {
          const response = await deleteDocument({
            variables: {
              schemaType: type,
              id: value.idx
            }
          });

          const tmp = loadedData.filter((el) => el.idx !== value.idx);
          setLoadedData(tmp);
          const { data } = response;
          enqueueSnackbar(data.deleteDocument, { variant: 'success' });
        }
      }
      setOpenEdit(false);
    } catch (error) {
      console.log(error.message);
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  return (
    <LoadingCard
      loading={loading}
      height={`calc(100vh - 350px)`}
      className={classes.listMain}
    >
      <Box className={classes.elements} ref={mainRef}>
        {isfiltered
          ? filteredData.map((el) =>
              el.status === 'fake_data' ? (
                <div key={el['_id']} style={{ width: 250, margin: 8 }}></div>
              ) : (
                <Card className={classes.card} key={el['_id']}>
                  <CardActionArea
                    onClick={(e) => handleCardAction(e, 'body', el)}
                  >
                    <CardMedia
                      component="img"
                      alt={el.avatar?.altText}
                      height={175}
                      image={el.avatar?.url ? el.avatar?.url : noLogo}
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="subtitle2">
                        {el.name.length > 19
                          ? `${el.name.length.substring(0, 19)}...`
                          : el.name}
                      </Typography>
                      <Typography gutterBottom variant="subtitle2">
                        {el.schemaType}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              )
            )
          : loadedData.map((el) =>
              el.status === 'fake_data' ? (
                <div key={el['_id']} style={{ width: 250, margin: 8 }}></div>
              ) : (
                <Card className={classes.card} key={el['_id']}>
                  <CardActionArea
                    onClick={(e) => handleCardAction(e, 'body', el)}
                  >
                    <CardMedia
                      component="img"
                      alt={el.avatar?.altText}
                      height={175}
                      image={el.avatar?.url ? el.avatar?.url : noLogo}
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="subtitle2">
                        {el.name.length > 19
                          ? `${el.name.length.substring(0, 19)}...`
                          : el.name}
                      </Typography>
                      <Button
                        size="small"
                        color="secondary"
                        onClick={(e) => handleCardAction(e, 'delete', el)}
                      >
                        Delete
                      </Button>
                    </CardContent>
                  </CardActionArea>
                </Card>
              )
            )}
      </Box>
      <EditGalleryDialog
        title={title}
        type={type}
        open={openEdit}
        resources={selectedGallery}
        onChange={handleEditDialogChange}
      />
      <CreateGalleryDialog
        title={title}
        type={type}
        open={openCreate}
        onChange={handleCreateDialogChange}
      />
    </LoadingCard>
  );
};

export default GalleryList;
