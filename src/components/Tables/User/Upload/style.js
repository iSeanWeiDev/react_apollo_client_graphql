import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1
  },
  dialogTitle: {
    paddingBottom: 0,
    color: theme.palette.blueGrey['700']
  },
  dialogContent: {},
  dropzone: {
    width: '100%',
    minHeight: 100,
    border: `2px dashed ${theme.palette.blueGrey['500']}`,
    borderRadius: 10,
    outline: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing(1)
  },
  dropzoneDragging: {
    filter: 'blur(0.5px)',
    '-webkit-filter': 'blur(0.5px)',
    background: theme.palette.blueGrey['50']
  },
  dropzoneParagraph: {
    fontSize: 16,
    color: theme.palette.blueGrey['700']
  },
  previewTitle: {
    fontSize: 16,
    fontWeight: 400
  },
  separator: {
    marginBottom: theme.spacing(2)
  },
  tableContainer: {
    marginBottom: theme.spacing(1)
  },
  table: {
    minWidth: 500
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  }
}));

export default useStyles;
