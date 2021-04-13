import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    maxWidth: 250,
    margin: theme.spacing(2)
  },
  dropzoneCard: {
    background: theme.palette.blueGrey['50'],
    flex: 1
  },
  dropzone: {
    width: '100%',
    maxWidth: 245,
    minHeight: 280,
    outline: 'none',
    padding: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: 'none'
  },
  dropzoneParagraph: {
    color: theme.palette.blueGrey['700'],
    fontSize: 22
  },
  media: {
    width: '100%',
    minHeight: 200,
    maxWidth: 200,
    backgroundSize: 'contain',
    borderRadius: '50%',
    border: `2px dashed ${theme.palette.blueGrey['700']}`
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    top: -5
  },
  avatar: {
    width: 200,
    height: 200,
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    margin: 'auto'
  },
  changeLogo: {
    color: theme.palette.blueGrey['700']
  }
}));

export default useStyles;
