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
  previewRoot: {
    width: 550
  },
  table: {
    minWidth: 750,
    width: '100%',
    padding: theme.spacing(1)
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
    maxHeight: `calc(100vh - 300px)`
  }
}));

export default useStyles;
