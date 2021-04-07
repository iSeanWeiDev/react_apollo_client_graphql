import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1
  },
  title: {
    color: theme.palette.blueGrey['700']
  },
  icon: {
    marginRight: theme.spacing(2)
  },
  actionBtn: {
    marginLeft: theme.spacing(1)
  },
  separator: {
    height: 2
  },
  main: {
    minHeight: 350,
    maxHeight: 450
  },
  mainDrop: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    filter: 'blur(1px)',
    background: '#fff'
  },
  listItems: {
    cursor: 'pointer',
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(0)
  },
  listItemIcon: {
    minWidth: 30
  },
  listItem: {
    color: theme.palette.blueGrey['900'],
    fontWeight: 700
  },
  listItemSelected: {
    color: theme.palette.common.black,
    fontWeight: 700,
    background: theme.palette.blueGrey['200']
  },
  preview: {
    padding: theme.spacing(2),
    maxHeight: 600,
    flex: 1
  },
  previewTitle: {
    color: theme.palette.blueGrey['700']
  },
  previewImg: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    width: 300,
    border: `2px dashed ${theme.palette.blueGrey['700']}`
  },
  previewPdf: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    border: `2px dashed ${theme.palette.blueGrey['700']}`,
    width: '100%',
    height: 260
  },
  previewVideo: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    width: '100%',
    border: `2px dashed ${theme.palette.blueGrey['700']}`
  },
  inputArea: {
    width: '100%',
    marginTop: theme.spacing(1),
    marginButtom: theme.spacing(1)
  },
  previewUrl: {
    color: theme.palette.blueGrey['500']
  },
  updateBtn: {
    color: theme.palette.blueGrey['800'],
    fontWeight: 600,
    '&:hover': {
      color: theme.palette.blueGrey['600']
    }
  }
}));

export default useStyles;
