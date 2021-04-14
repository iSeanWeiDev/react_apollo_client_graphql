import React, { useState, useEffect } from 'react';
import {
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  CircularProgress
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import config from '@app/Config';
import { genSignedUrl, userFileUpload, userBulkUpsert } from '@app/api';
import { useSnackbar } from 'notistack';
import UploadArea from './Upload';
import PreviewArea from './Preview';
import useStyles from './style';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UserUpload = ({ open, docId, schemaType, onChange }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState();

  useEffect(() => {
    setFile();
  }, [open]);

  const handleDownload = () => {
    const elDom = document.createElement('a');
    elDom.setAttribute('href', config.mockData.userFile);
    elDom.setAttribute('download', '');
    elDom.setAttribute('rel', 'noopener noreferrer');
    elDom.click();
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const { signedUrl, fileUrl } = await genSignedUrl(file, docId);
      await userFileUpload(signedUrl, file);
      const { status } = await userBulkUpsert(fileUrl, docId, schemaType);
      if (status === 200) {
        enqueueSnackbar('Successfully uploaded the users', {
          variant: 'success'
        });
        onChange('close');
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => onChange('close')}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle
        id="alert-dialog-slide-title"
        className={classes.dialogTitle}
      >
        Upload {schemaType === 'educator' ? 'Educators' : 'Students'}
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        {!file ? (
          <UploadArea onChange={(value) => setFile(value)} />
        ) : (
          <PreviewArea resources={file} onChange={() => setFile()} />
        )}
        <Typography variant="caption">
          Before uploading your document, please check the demo document &nbsp;{' '}
          <Link onClick={handleDownload}>here.</Link>
          <br />
          <br />
          Note: If you are using Excel to generate the data make sure column D
          (phone) <br /> is formatted for text and you include the + sign and
          country code +12223334444
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onChange('close')} color="secondary">
          cancel
        </Button>
        <Button
          color="primary"
          disabled={!file || loading}
          onClick={handleSubmit}
        >
          submit
          {loading && (
            <CircularProgress size={20} className={classes.buttonProgress} />
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserUpload;
