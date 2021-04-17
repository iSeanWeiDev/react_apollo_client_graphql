import { makeStyles } from '@material-ui/core/styles';
import { lightBlue } from '@material-ui/core/colors';
import imgDemo3 from '@app/assets/imgs/demo-3.png';
import { shadows } from '@material-ui/system';
const useStyles = makeStyles((theme) => ({
  hero: {
    backgroundImage: `url(${imgDemo3})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% auto',
    backgroundPosition: 'center',
    minHeight: '175px'
  },
  userInfo: {
    position: 'relative',
    marginLeft: '40px'
  },
  avatar: {
    width: 150,
    height: 150,
    float: 'left',
    marginTop: '-90px',
    border: '2px solid white'
  },
  inputArea: {
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  indicator: {
    backgroundColor: theme.palette.blueGrey['700']
  },
  appbar: {
    padding: '8px 8px 0 8px',
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.blueGrey['800'],
    borderRadius: '20px 20px 0 0',
    boxShadow: 'none'
  },
  saveSecBtn: {
    height: 40,
    borderRadius: 40,
    background: lightBlue['300'],
    color: theme.palette.blueGrey['900'],
    fontWeight: 500,
    fontSize: '.75rem',
    '&:hover': {
      background: lightBlue['400']
    },
    float: 'right'
  },
  linkListContainer: {},
  tabPanel: {
    background: theme.palette.common.white
  }
}));

export default useStyles;
