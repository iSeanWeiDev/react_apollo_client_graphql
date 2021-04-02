import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { Auth } from 'aws-amplify';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useInput } from '@app/utils/hooks/form';
import { DefaultCard } from '@app/components/Cards';
import useStyles from './style';
import { useSnackbar } from 'notistack';
import { Box, Typography } from '@material-ui/core';

const SendVerification = ({ handle }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const { value: email, bind: bindEmail } = useInput('');

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);

      await Auth.forgotPassword(email);
      handle(email);
    } catch (error) {
      setLoading(false);
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  const validateEmail = () => {
    return new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(email);
  };

  return (
    <Box className={classes.root}>
      <DefaultCard>
        <Box className={classes.form}>
          <Typography className={classes.title} variant="h6">
            Reset your password
          </Typography>
          <TextField
            error={!validateEmail() && email.length > 0}
            className={classes.textfield}
            label="Email"
            {...bindEmail}
            type="email"
            helperText={
              validateEmail() || !email.length > 0
                ? ''
                : 'You must input correct email!'
            }
          />
          <Button
            variant="contained"
            className={classes.actionButton}
            size="large"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading && <CircularProgress size={20} className={classes.mr20} />}
            Send code
          </Button>
        </Box>
      </DefaultCard>
    </Box>
  );
};

export default SendVerification;
