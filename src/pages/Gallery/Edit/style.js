import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  dialogPaper: {
    minHeight: '100vh',
    maxHeight: '100vh',
    minWidth: '80vw',
    position: 'absolute',
    right: 0,
    margin: 0,
    borderRadius: 0,
    zIndex: 99999999
  },
  inputArea: {
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  info: {
    paddingTop: theme.spacing(5),
    paddingLeft: theme.spacing(3)
  },
  root: {
    flexGrow: 1
  },
  dialogContent: {
    width: '60vw'
  },
  dialogActions: {
    width: '60vw'
  },
  photo: {
    minHeight: 200,
    textAlign: 'center',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(1)
  }
}));

export default useStyles;
