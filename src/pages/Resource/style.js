import { makeStyles } from '@material-ui/core/styles';
import { lightBlue } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  header: {
    position: 'absolute',
    width: 'calc(100vw - 220px)',
    height: 200,
    background: theme.palette.blueGrey['900'],
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(5)
  },
  title: {
    fontWeight: 700
  },
  search: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
    height: 40,
    borderRadius: 40
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  addButton: {
    height: 40,
    borderRadius: 40,
    background: lightBlue['300'],
    color: theme.palette.blueGrey['900'],
    fontWeight: 500,
    fontSize: '.75rem',
    '&:hover': {
      background: lightBlue['400']
    }
  },
  main: {
    height: 'calc(100vh - 225px)',
    position: 'relative',
    top: 120,
    padding: theme.spacing(3),
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(5),
    borderRadius: 20
  }
}));

export default useStyles;
