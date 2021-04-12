import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 270;

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    position: 'fixed',
    height: 'calc(100vh - 64px)'
  },
  open: {
    width: drawerWidth
  },
  close: {
    width: 30
  },
  collapseBtn: {
    color: theme.palette.blueGrey['200'],
    background: theme.palette.blueGrey['50'],
    border: `1px solid ${theme.palette.blueGrey['200']}`,
    position: 'absolute',
    bottom: 50,
    '&:hover': {
      color: theme.palette.common.white,
      background: theme.palette.blueGrey['300']
    }
  },
  openBtn: {
    left: 255
  },
  closeBtn: {
    left: 15
  },
  actionBtn: {
    color: theme.palette.blueGrey['500'],
    '& svg': {
      strokeWidth: '2em'
    }
  },
  main: {
    padding: theme.spacing(1)
  },
  toolbar: {
    color: theme.palette.blueGrey['500']
  },
  separator: {
    marginTop: 3,
    background: theme.palette.blueGrey['500'],
    height: 2
  },
  searchBar: {
    padding: theme.spacing(1)
  },
  treeView: {
    padding: theme.spacing(1),
    color: theme.palette.blueGrey['800']
  },
  listItem: {
    cursor: 'pointer',
    '&:hover': {
      background: theme.palette.blueGrey['50']
    }
  }
}));

export default useStyles;
