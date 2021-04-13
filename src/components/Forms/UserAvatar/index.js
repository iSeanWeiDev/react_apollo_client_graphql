import React, { useState, useEffect } from 'react';
import { DropzoneArea } from 'material-ui-dropzone';
import { Box, LinearProgress, Button, Avatar } from '@material-ui/core';
import { Img } from 'react-image';
import { useSnackbar } from 'notistack';
import { getBase64 } from '@app/utils/file';
import { genSignedUrl, avatarUpload } from '@app/api';
import noUserFemale from '@app/assets/imgs/no-user-female.jpeg';
import useStyles from './style';
import './style.css';

const UserAvatar = ({ docId, resources, acceptedFiles, onChange }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [loadedData, setLoadedData] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (resources) {
      setLoadedData(resources);
    } else {
      setLoadedData('');
    }
  }, [resources]);

  const handleChange = async (files) => {
    try {
      if (files.length > 0) {
        setLoading(true);
        const base64string = await getBase64(files[0]);
        setLoadedData(base64string);
        const { signedUrl, fileUrl } = await genSignedUrl(files[0], docId);
        const { status } = await avatarUpload(signedUrl, files[0]);
        if (status === 200) {
          onChange(fileUrl);
        }
        setLoading(false);
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  const handleClose = () => {
    setLoadedData('');
    onChange('');
  };

  const avatarImage = () => {
    return (
      <Avatar alt="Remy Sharp" className={classes.avatar} src={noUserFemale} />
    );
  };

  return (
    <Box className={classes.root}>
      {loadedData ? (
        <Box position="relative">
          <Img
            src={loadedData}
            className={classes.media}
            loader={<LinearProgress />}
          />
          <Box display="flex" justifyContent="center">
            <Button className={classes.changeLogo} onClick={handleClose}>
              Edit Photo
            </Button>
          </Box>
        </Box>
      ) : (
        <DropzoneArea
          Icon={avatarImage}
          dropzoneText={''}
          dropzoneClass={classes.dropzone}
          dropzoneParagraphClass={classes.dropzoneParagraph}
          showPreviewsInDropzone={false}
          showPreviews={false}
          acceptedFiles={acceptedFiles ? acceptedFiles : ['image/*']}
          filesLimit={1}
          onChange={handleChange}
        />
      )}
    </Box>
  );
};

export default UserAvatar;
