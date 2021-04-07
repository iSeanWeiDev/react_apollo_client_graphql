import React, { useState, createRef } from 'react';
import clsx from 'clsx';
import {
  Box,
  Typography,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
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

const AttachmentForm = () => {
  const classes = useStyles();
  const refUploader = createRef(null);
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [isDropping, setIsDropping] = useState(false);
  const [canDelete, setCanDelete] = useState(false);
  const [selectedFile, setSelectedFile] = useState({});
  const [file, setFile] = useState();

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
    // const fileName = event.dataTransfer.files[0].name;
    // setOpenCreate(true);
    // setFileInfo({
    //   name: fileName,
    //   url: '',
    //   type: '',
    //   altText: ''
    // });
  };

  const handleFormAction = (type) => {
    if (type === 'upload') {
      refUploader.current.click();
    }

    if (type === 'download') {
      const elDom = document.createElement('a');
      elDom.setAttribute('href', selectedFile.url);
      elDom.setAttribute('download', '');
      elDom.setAttribute('rel', 'noopener noreferrer');
      elDom.click();
    }
  };
  const handleFileUpload = () => {};

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
        {!isDropping && <Box></Box>}
      </main>
    </LoadingCard>
  );
};

export default AttachmentForm;
