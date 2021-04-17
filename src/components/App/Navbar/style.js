import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    }
  },
  appBarFull: {
    [theme.breakpoints.up('sm')]: {
      width: '100%'
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  toolbar: theme.mixins.toolbar,
  badge: {
    marginRight: theme.spacing(2),
    cursor: 'pointer'
  }
}));

export default useStyles;
