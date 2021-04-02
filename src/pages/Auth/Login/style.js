import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    background: `linear-gradient(0, ${theme.palette.blueGrey['700']} 30%, ${theme.palette.blueGrey['300']} 90%)`,
    '& > *': {
      maxWidth: 500,
      margin: `${theme.spacing(10)}px auto`,
      padding: theme.spacing(2),
      height: 'fit-content'
    },
    overflowY: 'scroll'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  rememberme: {
    margin: '15px 0 0 0',
    textAlign: 'top'
  },

  title: {
    fontSize: '22px',
    fontWeight: 800
  },
  card: {
    width: '500px',
    margin: '100px auto',
    padding: '40px'
  },
  textfield: {
    margin: '10px 0'
  },
  link: {
    margin: `${theme.spacing(2)}px 0`,
    textAlign: 'right',
    textDecoration: 'none'
  },
  linktextleft: {
    margin: `${theme.spacing(3)}px 0`,
    textAlign: 'left',
    textDecoration: 'none',
    color: '#37474f'
  },
  mr20: {
    marginRight: 20
  },
  googleLogin: {
    marginTop: theme.spacing(1)
  },
  poweredby: {
    margin: '0',
    textAlign: 'right',
    fontStyle: 'italic',
    display: 'flex',
    float: 'right',
    alignItems: 'center'
  },
  bottomlogo: {
    width: '200px',
    height: '80px'
  },
  loginButton: {
    backgroundColor: theme.palette.blueGrey['500'],
    color: theme.palette.common.white
  }
}));

export default useStyles;
