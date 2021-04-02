import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    marginBottom: theme.spacing(2)
  },
  content: {
    padding: theme.spacing(2)
  }
}));

export default useStyles;
