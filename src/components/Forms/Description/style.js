import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1
  },
  inputArea: {
    width: '100%',
    marginBottom: theme.spacing(2)
  }
}));

export default useStyles;
