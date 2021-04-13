import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    minHeight: '92vh'
  },
  tabs: {
    width: 200,
    marginTop: 20,
    borderRight: `1px solid ${theme.palette.divider}`
  },
  indicator: {
    backgroundColor: theme.palette.blueGrey['700']
  },
  container: {},
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
  avatar: {
    margin: 'auto'
  },
  alert: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}));

export default useStyles;
