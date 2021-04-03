import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  mainOpen: {
    marginLeft: 270,
    width: 'calc(100vw - 510px)'
  },
  mainClose: {
    marginLeft: 30,
    width: 'calc(100vw - 270px)'
  }
}));

export default useStyles;
