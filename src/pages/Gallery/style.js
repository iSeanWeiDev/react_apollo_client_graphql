import { makeStyles } from '@material-ui/core/styles';
import { lightBlue } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100%'
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
  saveButton: {
    height: 40,
    borderRadius: 40,
    background: lightBlue['300'],
    color: theme.palette.blueGrey['900'],
    fontWeight: 500,
    fontSize: '.75rem',
    '&:hover': {
      background: lightBlue['400']
    },
    '&:disabled': {
      background: theme.palette.blueGrey['300'],
      color: theme.palette.common.light
    }
  },
  main: {
    width: '100%',
    height: 'calc(100vh - 215px)',
    position: 'relative',
    top: 120,
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(5),
    borderRadius: 20
  },
  appbar: {
    padding: '8px 8px 0 8px',
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.blueGrey['800'],
    borderRadius: '20px 20px 0 0'
  },
  indicator: {
    backgroundColor: theme.palette.blueGrey['700']
  }
}));

export default useStyles;
