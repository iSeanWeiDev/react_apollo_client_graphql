import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: theme.palette.blueGrey['800'],
    color: theme.palette.common.white
  },
  toolbar: theme.mixins.toolbar,
  profile: {
    minHeight: 200,
    textAlign: 'center',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(1)
    // background: theme.palette.blueGrey['600']
  },
  avatar: {
    width: 120,
    height: 120,
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
  },
  userName: {
    marginTop: theme.spacing(1),
    color: theme.palette.common.white
  },
  userRole: {
    color: theme.palette.common.white
  },
  separator: {
    background: theme.palette.common.white,
    height: 2,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
  },
  actionSeparator: {
    background: theme.palette.common.white,
    height: 2,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(1)
  },
  menus: {
    width: '100%',
    marginTop: 3
  },
  actionList: {
    width: '100%',
    position: 'absolute',
    bottom: theme.spacing(2)
  },
  listItemIcons: {
    display: 'flex',
    justifyContent: 'center'
  },
  listItems: {
    color: theme.palette.common.white,
    paddingTop: 1,
    paddingBottom: 1
  },
  listItemIcon: {
    fontSize: '0.9rem',
    color: theme.palette.blueGrey['100']
  },
  listItemIconSelcted: {
    color: theme.palette.common.white
  },
  listItemText: {
    fontSize: '0.9rem',
    color: theme.palette.blueGrey['100']
  },
  listItemTextSelcted: {
    color: theme.palette.common.white
  }
}));

export default useStyles;
