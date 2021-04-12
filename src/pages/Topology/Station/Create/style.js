import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    padding: theme.spacing(3)
  },
  inputArea: {
    width: '100%',
    marginBottom: theme.spacing(1)
  },
  textArea: {
    minWidth: '100%',
    maxWidth: '100%',
    fontFamily: 'Roboto',
    fontSize: 16,
    paddingTop: 9,
    paddingLeft: 12,
    outlineColor: theme.palette.primary.main,
    borderRadius: 5,
    borderColor: '#c1bdbd'
  },
  title: {
    color: theme.palette.blueGrey['700'],
    paddingBottom: theme.spacing(0)
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  }
}));

export default useStyles;
