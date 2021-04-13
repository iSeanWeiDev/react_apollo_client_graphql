import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 750
  },
  pagination: {
    display: 'flex',
    position: 'absolute',
    bottom: 0,
    right: 10
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1
  },
  container: {
    width: '100%',
    maxHeight: `calc(100vh - 300px)`
  }
}));

export default useStyles;
