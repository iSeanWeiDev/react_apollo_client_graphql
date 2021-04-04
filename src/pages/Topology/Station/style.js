import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    padding: theme.spacing(3)
  },
  cardAction: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
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
  }
}));

export default useStyles;
