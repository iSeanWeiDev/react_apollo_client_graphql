import { makeStyles } from '@material-ui/core/styles';
import { lightBlue } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1
  },
  toolbar: {
    width: '100%',
    height: 100,
    background: theme.palette.blueGrey['900'],
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(3)
  },
  title: {
    fontWeight: 700,
    color: theme.palette.common.white
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
    display: 'flex'
  },
  elements: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  elementsOnView: {
    width: 300,
    maxHeight: 'calc(100vh - 200px)',
    overflow: 'auto'
  },
  card: {
    width: 250,
    margin: theme.spacing(1)
  },
  cardContent: {
    minHeight: 110,
    padding: '8px 16px 8px 16px'
  },
  cardAction: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 16px 0 16px'
  },
  listItem: {
    cursor: 'pointer',
    padding: '4px 8px 4px 8px'
  },
  listItemSelected: {
    width: 270,
    margin: '4px 8px 4px 8px',
    background: theme.palette.blueGrey['100']
  },
  preview: {
    margin: theme.spacing(2),
    width: 'calc(100% - 300px)',
    minHeight: 'calc(100vh - 200px)',
    borderRadius: '20px 20px 0 0'
  },
  appbar: {
    padding: '8px 8px 0 8px',
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.blueGrey['800'],
    borderRadius: '20px 20px 0 0'
  },
  indicator: {
    backgroundColor: theme.palette.blueGrey['700']
  },
  detailRoot: {
    flexGrow: 1
  },
  dialogTitle: {
    color: theme.palette.blueGrey['700'],
    paddingBottom: theme.spacing(0)
  },
  detailAppbar: {
    padding: '8px 8px 0 8px',
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.blueGrey['800'],
    borderRadius: '20px 20px 0 0'
  },
  steperRoot: {
    width: '100%'
  },
  steperButton: {
    marginRight: theme.spacing(1)
  },
  backButton: {
    marginRight: theme.spacing(1)
  },
  completed: {
    display: 'inline-block'
  },
  conatiner: {
    marginLeft: 270,
    width: 'calc(100vw - 490px)'
  }
}));

export default useStyles;
