import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  background: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    background: `linear-gradient(0, ${theme.palette.blueGrey['700']} 30%, ${theme.palette.blueGrey['300']} 90%)`
  }
}));

export default useStyles;
