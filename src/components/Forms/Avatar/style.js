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
    border: `2px dashed ${theme.palette.blueGrey['700']}`,
    borderRadius: `50% 50% 50% 50% / 50% 50% 50% 50%`,
    padding: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  dropzoneParagraph: {
    color: theme.palette.blueGrey['700'],
    fontSize: 22
  },
  media: {
    width: '100%',
    minHeight: 280,
    backgroundSize: 'contain',
    border: `2px dashed ${theme.palette.blueGrey['700']}`
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    top: -5
  },
  changeLogo: {
    color: theme.palette.blueGrey['700']
  }
}));

export default useStyles;
