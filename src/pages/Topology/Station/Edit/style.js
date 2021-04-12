import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.blueGrey['800'],
    borderRadius: '20px 20px 0 0'
  },
  title: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  separator: {
    background: theme.palette.blueGrey['600'],
    height: 2,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  main: {
    padding: theme.spacing(2)
  }
}));

export default useStyles;
