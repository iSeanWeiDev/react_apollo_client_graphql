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
  panelTitle: {
    color: theme.palette.blueGrey['500']
  },
  separator: {
    marginTop: 5,
    background: theme.palette.blueGrey['500'],
    height: 2
  },
  main: {
    padding: theme.spacing(1)
  }
}));

export default useStyles;
