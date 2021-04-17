import { makeStyles } from '@material-ui/core/styles';
import { lightBlue } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  hero: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    minHeight: '250px'
  },
  userInfo: {
    position: 'relative',
    marginLeft: '20px'
  },
  avatar: {
    width: 150,
    height: 150,
    float: 'left',
    marginTop: '-100px'
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
    borderRadius: '20px 20px 0 0'
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
  linkListContainer: {}
}));

export default useStyles;
