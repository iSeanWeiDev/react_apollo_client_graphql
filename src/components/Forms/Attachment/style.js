import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1
  },
  title: {
    color: theme.palette.blueGrey['700']
  },
  icon: {
    marginRight: theme.spacing(2)
  },
  actionBtn: {
    marginLeft: theme.spacing(1)
  },
  separator: {
    height: 2
  },
  main: {
    minHeight: 350,
    maxHeight: 450
  },
  mainDrop: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    filter: 'blur(1px)',
    background: '#fff'
  }
}));

export default useStyles;
