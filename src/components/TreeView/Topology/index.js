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
  Divider,
  InputAdornment
} from '@material-ui/core';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Search as SearchIcon,
  KeyboardReturn as KeyboardReturnIcon
} from '@material-ui/icons';
import {
  faSitemap,
  faBroadcastTower,
  faSchool,
  faStoreAlt,
  faChalkboardTeacher
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LoadingCard } from '@app/components/Cards';
import { fade, withStyles } from '@material-ui/core/styles';
import { TreeView, TreeItem } from '@material-ui/lab';
import { useGroupingQuery } from '@app/utils/hooks/apollo';
import { genTopologyTreeData } from '@app/utils/data-format';
import {
  MinusSquare,
  PlusSquare,
  CloseSquare,
  TransitionComponent
} from './utils';
import useStyles from './style';

TransitionComponent.propTypes = {
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

const AppTreeView = ({ open, preview, onChange }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [searchKey, setSearchKey] = useState('');
  const [loadedData, setLoadedData] = useState([]);
  const stationData = useGroupingQuery({ schemaType: 'station' });
  const districtData = useGroupingQuery({ schemaType: 'district' });
  const schoolData = useGroupingQuery({ schemaType: 'school' });
  const classData = useGroupingQuery({ schemaType: 'class' });

  const handleSubmit = () => {
    setOpenSearch(!openSearch);
  };

  useEffect(() => {
    setLoading(true);
    if (stationData && districtData && schoolData && classData) {
      const tmp = genTopologyTreeData(
        stationData,
        districtData,
        schoolData,
        classData
      );

      setLoadedData(tmp);
      setLoading(false);
    }
  }, [stationData, districtData, schoolData, classData]);

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
              <FontAwesomeIcon icon={faSitemap} />
              &nbsp; Topologies
            </Box>
            {!preview && (
              <IconButton
                onClick={() => setOpenSearch(!openSearch)}
                size="small"
                className={classes.actionBtn}
              >
                <SearchIcon />
              </IconButton>
            )}
          </Box>
          {preview && <Divider className={classes.separator} />}
          {openSearch && (
            <FormControl fullWidth className={classes.searchBar}>
              <Input
                placeholder="Search topology..."
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
            >
              {loadedData.length > 0 &&
                loadedData.map((sd) => (
                  <StyledTreeItem
                    key={sd.parent['_id']}
                    nodeId={sd.parent['_id']}
                    label={sd.parent.name}
                    labelIcon={faBroadcastTower}
                  >
                    {sd.children.map((sdc) => (
                      <StyledTreeItem
                        key={sdc.parent['_id']}
                        nodeId={sdc.parent['_id']}
                        label={sdc.parent.name}
                        labelIcon={faSchool}
                      >
                        {sdc.children.map((sdcc) => (
                          <StyledTreeItem
                            key={sdcc.parent['_id']}
                            nodeId={sdcc.parent['_id']}
                            label={sdcc.parent?.name}
                            labelIcon={faStoreAlt}
                          >
                            {sdcc.children.map((sdccc) => (
                              <StyledTreeItem
                                key={sdccc['_id']}
                                nodeId={sdccc['_id']}
                                label={sdccc.name}
                                labelIcon={faChalkboardTeacher}
                              />
                            ))}
                          </StyledTreeItem>
                        ))}
                      </StyledTreeItem>
                    ))}
                  </StyledTreeItem>
                ))}
            </TreeView>
          </LoadingCard>
        </main>
      )}
    </Box>
  );
};

export default AppTreeView;
