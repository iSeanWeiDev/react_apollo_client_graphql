import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Paper,
  IconButton,
  Typography,
  FormControl,
  Input,
  InputAdornment
} from '@material-ui/core';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Search as SearchIcon,
  KeyboardReturn as KeyboardReturnIcon
} from '@material-ui/icons';
import { LoadingCard } from '@app/components/Cards';
import { fade, withStyles } from '@material-ui/core/styles';
import { TreeView, TreeItem } from '@material-ui/lab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import {
  MinusSquare,
  PlusSquare,
  CloseSquare,
  TransitionComponent
} from './utils';
import useStyles from './style';

TransitionComponent.propTypes = {
  /**
   * Show the component; triggers the enter or exit states
   */
  in: PropTypes.bool
};

const StyledTreeItem = withStyles((theme) => ({
  iconContainer: {
    '& .close': {
      opacity: 0.3
    }
  },
  group: {
    marginLeft: 7,
    paddingLeft: 18,
    borderLeft: `1px dashed ${fade(theme.palette.text.primary, 0.4)}`
  }
}))(({ label, labelIcon, ...rest }) => (
  <TreeItem
    label={
      <React.Fragment>
        <FontAwesomeIcon icon={labelIcon} size="xs" />
        &nbsp; <Typography variant="caption">{label}</Typography>
      </React.Fragment>
    }
    {...rest}
    TransitionComponent={TransitionComponent}
  />
));

const LessonTreeView = ({ loading, open, resources, onChange }) => {
  const classes = useStyles();
  const [openSearch, setOpenSearch] = useState(false);
  const [searchKey, setSearchKey] = useState('');
  const [loadedData, setLoadedData] = useState([]);
  const handleSubmit = () => {
    setOpenSearch(!openSearch);
  };

  useEffect(() => {
    setLoadedData(resources);
  }, [resources]);

  return (
    <Box
      component={Paper}
      className={clsx(classes.root, {
        [classes.open]: open,
        [classes.close]: !open
      })}
    >
      <Box
        position="relative"
        component={IconButton}
        size="small"
        onClick={() => onChange()}
        className={clsx(classes.collapseBtn, {
          [classes.openBtn]: open,
          [classes.closeBtn]: !open
        })}
      >
        {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </Box>

      {open && (
        <main className={classes.main}>
          <Box
            className={classes.toolbar}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box component={Typography} variant="h6">
              <FontAwesomeIcon icon={faBookOpen} />
              &nbsp; Lessons
            </Box>
            <IconButton
              onClick={() => setOpenSearch(!openSearch)}
              size="small"
              className={classes.actionBtn}
            >
              <SearchIcon />
            </IconButton>
          </Box>
          {/* <Divider className={classes.separator} /> */}
          {openSearch && (
            <FormControl fullWidth className={classes.searchBar}>
              <Input
                placeholder="Search lessons..."
                type="text"
                size="small"
                variant="outline"
                autoFocus
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={handleSubmit}>
                      <KeyboardReturnIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          )}
          <LoadingCard loading={loading} height={`calc(100vh - 200px)`}>
            <TreeView
              className={classes.treeView}
              defaultExpanded={['1']}
              defaultCollapseIcon={<MinusSquare />}
              defaultExpandIcon={<PlusSquare />}
              defaultEndIcon={<CloseSquare />}
            ></TreeView>
          </LoadingCard>
        </main>
      )}
    </Box>
  );
};

export default LessonTreeView;
