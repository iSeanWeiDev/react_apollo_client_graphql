import React, { useState, createRef, useEffect } from 'react';
import clsx from 'clsx';
import {
  Box,
  Grid,
  Typography,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@material-ui/core';
import {
  faPaperclip,
  faImage,
  faFilm,
  faFilePdf
} from '@fortawesome/free-solid-svg-icons';
import { CloudUpload, Delete, GetApp } from '@material-ui/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LoadingCard } from '@app/components/Cards';
import { useSnackbar } from 'notistack';
import PreviewAttachment from './Preview';
import useStyles from './style';

const getIcon = (type) => {
  if (
    type === 'video/x-msvideo' ||
    type === 'video/mpeg' ||
    type === 'video/mp4'
  )
    return faFilm;
  if (type === 'image/png' || type === 'image/jpeg') return faImage;
  if (type === 'application/pdf') return faFilePdf;

  return faPaperclip;
};

const AttachmentForm = ({ resources }) => {
  const classes = useStyles();
  const refUploader = createRef(null);
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [isDropping, setIsDropping] = useState(false);
  const [canDelete, setCanDelete] = useState(false);
  const [loadedData, setLoadedData] = useState([]);
  const [selectedFile, setSelectedFile] = useState();
  const [file, setFile] = useState();

  useEffect(() => {
    if (resources) {
      setLoadedData(resources);
    }
  }, [resources]);

  const handleDrag = (type, event) => {
    event.preventDefault();
    event.stopPropagation();
    if (type === 'leave') setIsDropping(false);
    if (type === 'over') setIsDropping(true);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDropping(false);
    if (event.dataTransfer.files.length !== 1) {
      enqueueSnackbar('Invalide file count, it should be one file', {
        variant: 'warning'
      });
      return;
    }

    setFile(event.dataTransfer.files[0]);
  };

  const handleFormAction = (type) => {
    if (type === 'upload') {
      refUploader.current.click();
    }

    if (type === 'download') {
      const elDom = document.createElement('a');
      elDom.setAttribute('href', selectedFile?.url);
      elDom.setAttribute('download', '');
      elDom.setAttribute('rel', 'noopener noreferrer');
      elDom.click();
    }
  };
  const handleFileUpload = () => {};

  const handleElClick = (value) => {
    setSelectedFile(value);
    setCanDelete(true);
  };

  return (
    <LoadingCard loading={loading} height={`calc(100vh - 330px)`}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" className={classes.title}>
          <FontAwesomeIcon icon={faPaperclip} className={classes.icon} />
          Attachments
        </Typography>
        <Box display={isDropping ? 'none' : 'block'}>
          <IconButton
            className={classes.actionBtn}
            size="small"
            onClick={() => handleFormAction('upload')}
          >
            <CloudUpload />
          </IconButton>
          <IconButton
            className={classes.actionBtn}
            size="small"
            onClick={() => handleFormAction('download')}
            disabled={!canDelete}
          >
            <GetApp />
          </IconButton>
          <IconButton
            className={classes.actionBtn}
            size="small"
            onClick={() => handleFormAction('delete')}
            disabled={!canDelete}
          >
            <Delete />
          </IconButton>
        </Box>
      </Box>
      <Divider className={classes.separator} />
      <input
        type="file"
        id="file"
        ref={refUploader}
        onChange={handleFileUpload}
        style={{ display: 'none' }}
      />
      <main
        className={clsx(classes.main, {
          [classes.main]: !isDropping,
          [classes.mainDrop]: isDropping
        })}
        onDragOver={(e) => handleDrag('over', e)}
        onDragLeave={(e) => handleDrag('leave', e)}
        onDrop={handleDrop}
      >
        {isDropping && <FontAwesomeIcon icon={faPaperclip} size="6x" />}
        {!isDropping && (
          <Grid
            spacing={2}
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
          >
            <Grid item xs={12} sm={12} md={7} lg={7}>
              <List>
                {loadedData.map((el) => (
                  <ListItem
                    key={el.url}
                    onClick={() => handleElClick(el)}
                    className={clsx(classes.listItems, {
                      [classes.listItem]: selectedFile?.url !== el.url,
                      [classes.listItemSelected]: selectedFile?.url === el.url
                    })}
                  >
                    <ListItemIcon className={classes.listItemIcon}>
                      <FontAwesomeIcon icon={getIcon(el.type)} size="lg" />
                    </ListItemIcon>
                    <ListItemText className={classes.listItemText}>
                      <Typography variant="subtitle1">{el.name}</Typography>
                    </ListItemText>
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid item xs={12} sm={12} md={5} lg={5}>
              {selectedFile && <PreviewAttachment resources={selectedFile} />}
            </Grid>
          </Grid>
        )}
      </main>
    </LoadingCard>
  );
};

export default AttachmentForm;
