import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    '& > *': {
      maxWidth: 500,
      margin: `${theme.spacing(10)}px auto`,
      padding: theme.spacing(2)
    }
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: '22px',
    fontWeight: 800
  },
  textfield: {
    margin: '10px 0'
  },
  mr20: {
    marginRight: 20
  },
  colorRed: {
    color: 'red'
  },
  passwordhint: {
    padding: '20px'
  },
  overflowVisible: {
    overflow: 'visible'
  },
  colorGreen: {
    color: 'forestgreen'
  },
  colorUnable: {
    color: 'lightsalmon'
  },
  actionButton: {
    backgroundColor: theme.palette.blueGrey['500'],
    color: theme.palette.common.white
  }
}));

export default useStyles;
