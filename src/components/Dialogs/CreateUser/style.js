import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  dialog: {},
  dialogTitle: {
    color: theme.palette.blueGrey['700'],
    paddingBottom: theme.spacing(0)
  },
  createInput: {
    width: '100%',
    marginBottom: 5
  },
  dialogAddBtn: {
    color: theme.palette.blueGrey['700']
  }
}));

export default useStyles;
