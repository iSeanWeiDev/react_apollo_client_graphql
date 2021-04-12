import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import {
  Box,
  Paper,
  IconButton,
  Typography,
  FormControl,
  Input,
  InputAdornment,
  Divider
} from '@material-ui/core';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Search as SearchIcon,
  KeyboardReturn as KeyboardReturnIcon,
  Loop as LoopIcon
} from '@material-ui/icons';
import { LoadingCard } from '@app/components/Cards';

import { TreeView } from '@material-ui/lab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBookOpen,
  faChalkboardTeacher
} from '@fortawesome/free-solid-svg-icons';
import { useGroupingQuery } from '@app/utils/hooks/apollo';
import { genLessonTreeData } from '@app/utils/data-format';
import {
  MinusSquare,
  PlusSquare,
  CloseSquare,
  StyledTreeItem,
  RenderTreeViewEls
} from './utils';
import useStyles from './style';

const LessonTreeView = ({ open, preview, onChange }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [canRefresh, setCanRefresh] = useState(false);
  const [searchKey, setSearchKey] = useState('');
  const [loadedClassData, setLoadedClassData] = useState([]);
  const [treeData, setTreeData] = useState({});
  const [loadedTreeData, setLoadedTreeData] = useState({});
  const classData = useGroupingQuery({ schemaType: 'class' });
  const materialData = useGroupingQuery({ schemaType: 'material' });

  useEffect(() => {
    setLoading(true);
    if (materialData && classData) {
      const tmp = genLessonTreeData(classData, materialData);
      setTreeData(tmp);
      setLoadedClassData(classData);
      setLoadedTreeData(tmp);
      setLoading(false);
    }
  }, [materialData, classData]);

  const handleSubmit = () => {
    if (searchKey.length > 0) {
      const tmp = Object.values(treeData);
      const filteredData = tmp.filter((el) =>
        el.name.toLowerCase().includes(searchKey.toLowerCase())
      );

      var hist = {};
      const tmpClassData = [];
      filteredData.forEach((el) => {
        if (el.topology?.class) tmpClassData.push(el.topology.class);
      });

      // eslint-disable-next-line array-callback-return
      tmpClassData.map((a) => {
        if (a in hist) hist[a]++;
        else hist[a] = 1;
      });

      const filteredClassData = [];
      Object.keys(hist).forEach((el) => {
        const idx = classData.findIndex((cl) => cl['_id'] === el);
        if (idx > -1) filteredClassData.push(classData[idx]);
      });

      setLoadedClassData(filteredClassData);
    } else {
      setLoadedTreeData(treeData);
      setLoadedClassData(classData);
    }

    setOpenSearch(!openSearch);
    setCanRefresh(true);
  };

  const handleRefresh = () => {
    setLoadedTreeData(treeData);
    setLoadedClassData(classData);
    setCanRefresh(false);
  };

  return (
    <Box
      component={Paper}
      className={clsx(classes.root, {
        [classes.open]: open,
        [classes.close]: !open
      })}
    >
      {!preview && (
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
      )}

      {open && (
        <main className={classes.main}>
          <Box
            className={classes.toolbar}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box component={Typography} variant="h6">
              {preview ? (
                'Lesson Tree View'
              ) : (
                <React.Fragment>
                  <FontAwesomeIcon icon={faBookOpen} />
                  &nbsp; Lessons
                </React.Fragment>
              )}
            </Box>
            {!preview && (
              <Box>
                <IconButton
                  onClick={handleRefresh}
                  size="small"
                  className={classes.actionBtn}
                  disabled={!canRefresh}
                >
                  <LoopIcon />
                </IconButton>
                <IconButton
                  onClick={() => setOpenSearch(!openSearch)}
                  size="small"
                  className={classes.actionBtn}
                >
                  <SearchIcon />
                </IconButton>
              </Box>
            )}
          </Box>
          {preview && <Divider className={classes.separator} />}
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
          <LoadingCard
            loading={loading}
            height={`calc(100vh - 200px)`}
            className={classes.treeViewMain}
          >
            <TreeView
              className={classes.treeView}
              defaultExpanded={['1']}
              defaultCollapseIcon={<MinusSquare />}
              defaultExpandIcon={<PlusSquare />}
              defaultEndIcon={<CloseSquare />}
            >
              {loadedClassData.length > 0 &&
                loadedClassData.map((el) => (
                  <StyledTreeItem
                    key={el['_id']}
                    nodeId={el['_id']}
                    label={el.name}
                    labelIcon={faChalkboardTeacher}
                  >
                    <RenderTreeViewEls
                      id={el['_id']}
                      treeData={loadedTreeData}
                    />
                  </StyledTreeItem>
                ))}
            </TreeView>
          </LoadingCard>
        </main>
      )}
    </Box>
  );
};

export default LessonTreeView;
