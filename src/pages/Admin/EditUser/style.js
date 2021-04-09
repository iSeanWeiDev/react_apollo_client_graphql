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
    marginBottom: theme.spacing(2),
    '&:hover + $buttonPos': {
      display: 'block'
    }
  },
  validError: {
    color: 'red',
    marginBottom: '16px'
  },
  containInputField: {
    position: 'relative'
  },
  buttonPos: {
    position: 'absolute',
    top: 0,
    right: '10px',
    display: 'none',
    '&:hover': {
      display: 'block'
    }
  }
}));

export default useStyles;
