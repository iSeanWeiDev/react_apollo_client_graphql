import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  dialogPaper: {
    minHeight: '100vh',
    maxHeight: '100vh',
    position: 'absolute',
    right: 0,
    margin: 0,
    borderRadius: 0
  },
  inputArea: {
    width: '100%',
    marginBottom: theme.spacing(2)
  }
}));

export default useStyles;
