import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory } from 'react-router-dom';
import {
  Box,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Tooltip,
  Typography,
  withStyles
} from '@material-ui/core';
import useStyles from './style';
import { useInput } from '@app/utils/hooks/form';
import { DefaultCard } from '@app/components/Cards';
import {
  Check,
  Visibility,
  VisibilityOff,
  ErrorOutline
} from '@material-ui/icons';
import { useSnackbar } from 'notistack';
import Config from '@app/Config';

const SubmitPassword = ({ email }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const history = useHistory();

  const { value: password, bind: bindPassword } = useInput('');
  const { value: confirm, bind: bindConfirm } = useInput('');

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);

      const validateResult = validatePassword();
      if (!validateResult.success) {
        enqueueSnackbar(validateResult.message, { variant: 'error' });
        setLoading(false);
        return;
      }
      const currentUser = await Auth.signIn(
        email,
        Config.aws.aws_user_pools_id
      );
      await Auth.changePassword(
        currentUser,
        Config.aws.aws_user_pools_id,
        password
      );
      await Auth.signOut();
      history.push('/');
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
      setLoading(false);
    }
  };

  const validatePassword = () => {
    if (password.length < 8) {
      return {
        success: false,
        msg: 'Password is greater than 8 characters.'
      };
    }
    if (password !== confirm) {
      return {
        success: false,
        msg: 'Password is not matching!'
      };
    }
    return {
      success: true,
      msg: 'Password reset correctly!'
    };
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirm = () => {
    setShowConfirm(!showConfirm);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 300,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9'
    }
  }))(Tooltip);

  return (
    <Box className={classes.root}>
      <DefaultCard>
        <Box className={classes.form}>
          <Typography className={classes.title} variant="h6">
            Submit New Password
          </Typography>
          <FormControl className={classes.textfield}>
            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
              error={password.length > 0 && password.length < 8}
              id="standard-adornment-password"
              type={showPassword ? 'text' : 'password'}
              {...bindPassword}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <Box className={classes.colorRed}>
              {password && password.length < 8
                ? 'Password must be greater than 8 characters.'
                : ''}
            </Box>
          </FormControl>
          <FormControl className={classes.textfield}>
            <InputLabel htmlFor="standard-adornment-password">
              Confirm
            </InputLabel>
            <Input
              error={confirm.length > 0 && password !== confirm}
              id="standard-adornment-password"
              type={showConfirm ? 'text' : 'password'}
              {...bindConfirm}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirm}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showConfirm ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <Box className={classes.colorRed}>
              {confirm && password !== confirm
                ? 'Password is not matching!'
                : ''}
            </Box>
          </FormControl>
          <HtmlTooltip
            title={
              <React.Fragment>
                <Box className={classes.passwordhint}>
                  <Box>
                    <Box>
                      <b> Password Must:</b>
                    </Box>
                    <Grid
                      container
                      direction="row"
                      justify="flex-start"
                      alignItems="center"
                    >
                      {password.length >= 8 ? (
                        <Check
                          className={classes.colorGreen}
                          fontSize="small"
                        />
                      ) : (
                        <ErrorOutline
                          className={classes.colorUnable}
                          fontSize="small"
                        />
                      )}

                      <Box
                        className={
                          password.length >= 8 ? '' : classes.colorUnable
                        }
                      >
                        &nbsp;&nbsp;&nbsp;More than 8 characters
                      </Box>
                    </Grid>
                    {confirm && password === confirm ? (
                      <Grid
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="center"
                      >
                        <Check
                          className={classes.colorGreen}
                          fontSize="small"
                        />
                        <Box component="span">
                          &nbsp;&nbsp;&nbsp;Be confirmed
                        </Box>
                      </Grid>
                    ) : (
                      <Grid
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="center"
                      >
                        <ErrorOutline
                          className={classes.colorUnable}
                          fontSize="small"
                        />
                        <Box component="span" className={classes.colorUnable}>
                          &nbsp;&nbsp;&nbsp;Be confirmed
                        </Box>
                      </Grid>
                    )}
                  </Box>
                </Box>
              </React.Fragment>
            }
            placement="right"
            arrow
          >
            <Button
              variant="contained"
              clsssName={classes.actionButton}
              size="large"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading && (
                <CircularProgress size={20} className={classes.mr20} />
              )}
              Submit
            </Button>
          </HtmlTooltip>
        </Box>
      </DefaultCard>
    </Box>
  );
};

export default SubmitPassword;
