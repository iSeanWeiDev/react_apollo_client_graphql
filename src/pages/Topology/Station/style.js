import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    padding: theme.spacing(3)
  },
  addBtn: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.blueGrey['500'],
    '&:hover': {
      background: theme.palette.blueGrey['500'],
      color: theme.palette.blueGrey['50']
    }
  },
  panelIcon: {
    color: theme.palette.blueGrey['500'],
    marginRight: theme.spacing(1)
  },
  searchBar: {
    marginRight: theme.spacing(2)
  },
  panelTitle: {
    color: theme.palette.blueGrey['500']
  },
  separator: {
    marginTop: 5,
    background: theme.palette.blueGrey['500'],
    height: 2
  },
  main: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  card: {
    width: 300,
    margin: theme.spacing(1)
  },
  cardContent: {
    minHeight: 150
  },
  cardAction: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  inputArea: {
    width: '100%',
    marginBottom: theme.spacing(1)
  },
  textArea: {
    minWidth: '100%',
    maxWidth: '100%',
    fontFamily: 'Roboto',
    fontSize: 16,
    paddingTop: 9,
    paddingLeft: 12,
    outlineColor: theme.palette.primary.main,
    borderRadius: 5,
    borderColor: '#c1bdbd'
  },
  dialogTitle: {
    color: theme.palette.blueGrey['700'],
    paddingBottom: theme.spacing(0)
  },
  dialogPaper: {
    minHeight: '100vh',
    maxHeight: '100vh',
    position: 'absolute',
    right: 0,
    margin: 0,
    borderRadius: 0
  },
  buttonSuccess: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.blueGrey['500'],
    '&:hover': {
      background: theme.palette.blueGrey['500'],
      color: theme.palette.blueGrey['50']
    }
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  }
}));

export default useStyles;
