import React from 'react';
import { Auth } from 'aws-amplify';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Box, TextField, Typography } from '@material-ui/core';
import useStyles from './style';
import { DefaultCard } from '@app/components/Cards';
import { useInput } from '@app/utils/hooks/form';
import { useSnackbar } from 'notistack';
import Config from '@app/Config';

const VerificationCode = ({ email, handle }) => {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const { value: vcode, bind: bindVCode } = useInput('');

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);

      Auth.forgotPasswordSubmit(email, vcode, Config.aws.aws_user_pools_id)
        .then((data) => {
          handle(Config.aws.aws_user_pools_id);
        })
        .catch((error) => {
          // Toast('Error!!', error.message, 'danger');
          enqueueSnackbar(error.message, { variant: 'error' });
          setLoading(false);
        });
    } catch (error) {
      //Toast('Error!!', error.message, 'danger');
      enqueueSnackbar(error.message, { variant: 'error' });
      setLoading(false);
    }
  };

  return (
    <Box className={classes.root}>
      <DefaultCard>
        <Box className={classes.form}>
          <Typography className={classes.title} variant="h6">
            Verification Code Here
          </Typography>
          <TextField
            className={classes.textfield}
            label="Verification Code"
            type="text"
            {...bindVCode}
          />
          <Button
            variant="contained"
            className={classes.actionButton}
            size="large"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading && <CircularProgress size={20} className={classes.mr20} />}
            Submit
          </Button>
        </Box>
      </DefaultCard>
    </Box>
  );
};

export default VerificationCode;
