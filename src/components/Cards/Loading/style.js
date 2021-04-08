import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1
  },
  loading: {
    height: 2
  },
  skeleton: {
    padding: theme.spacing(2)
  }
}));

export default useStyles;
