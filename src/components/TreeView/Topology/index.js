import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import {
  Box,
  Paper,
  IconButton,
  Typography,
  FormControl,
  Input,
  Divider,
  InputAdornment,
  Popover,
  List,
  ListItem,
  ListItemText
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
import { TreeView } from '@material-ui/lab';
import { useGroupingQuery } from '@app/utils/hooks/apollo';
import { isEmptyObject } from '@app/utils/data-format';
import { genTopologyTreeData } from '@app/utils/data-format';
import { MinusSquare, PlusSquare, CloseSquare } from './utils';
import TreeItem from './TreeItem';
import useStyles from './style';

const AppTreeView = ({ open, preview, onChange }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [searchKey, setSearchKey] = useState('');
  const [loadedData, setLoadedData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedNode, setSelectedNode] = useState();
  const stationData = useGroupingQuery({ schemaType: 'station' });
  const districtData = useGroupingQuery({ schemaType: 'district' });
  const schoolData = useGroupingQuery({ schemaType: 'school' });
  const classData = useGroupingQuery({ schemaType: 'class' });

  const popOverData = [
    { label: 'Create', value: 'create' },
    { label: 'Edit', value: 'edit' },
    { label: 'Delete', value: 'delete' }
  ];
  const handleSubmit = () => {
    setOpenSearch(!openSearch);
  };

  useEffect(() => {
    setLoading(true);
    if (
      isEmptyObject(stationData) &&
      isEmptyObject(districtData) &&
      isEmptyObject(schoolData) &&
      isEmptyObject(classData)
    ) {
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

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleRightClick = (event) => {
    event.preventDefault();
    const strDom = event.target.outerHTML;
    const doc = new DOMParser().parseFromString(strDom, 'text/xml');
    const tmp = doc.firstChild.getAttribute('value');
    if (tmp) {
      setAnchorEl(event.target);
      setSelectedNode(tmp);
    }
  };

  const openPopover = Boolean(anchorEl);

  const handleActionClick = (value) => {
    onChange(value, selectedNode);
    setAnchorEl(null);
  };

  const handleNodeSelect = (event, value) => {
    setSelectedNode(value);
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
          onClick={() => onChange('close')}
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
          {!openSearch && <Divider className={classes.separator} />}
          <LoadingCard loading={loading} height={`calc(100vh - 200px)`}>
            <TreeView
              className={classes.treeView}
              defaultExpanded={['1']}
              defaultCollapseIcon={<MinusSquare />}
              defaultExpandIcon={<PlusSquare />}
              defaultEndIcon={<CloseSquare />}
              onContextMenu={handleRightClick}
              onNodeSelect={handleNodeSelect}
            >
              {loadedData.length > 0 &&
                loadedData.map((sd) => (
                  <TreeItem
                    key={sd.parent['_id']}
                    nodeId={`station-${sd.parent['_id']}`}
                    label={sd.parent.name}
                    labelIcon={faBroadcastTower}
                    resources={sd.parent}
                  >
                    {sd.children.map((sdc) => (
                      <TreeItem
                        key={sdc.parent['_id']}
                        nodeId={`district-${sdc.parent['_id']}`}
                        label={sdc.parent.name}
                        labelIcon={faSchool}
                        resources={sdc.parent}
                      >
                        {sdc.children.map((sdcc) => (
                          <TreeItem
                            key={sdcc.parent['_id']}
                            nodeId={`school-${sdcc.parent['_id']}`}
                            label={sdcc.parent?.name}
                            labelIcon={faStoreAlt}
                            resources={sdcc.parent}
                          >
                            {sdcc.children.map((sdccc) => (
                              <TreeItem
                                key={sdccc['_id']}
                                nodeId={`class-${sdccc['_id']}`}
                                label={sdccc.name}
                                labelIcon={faChalkboardTeacher}
                                resources={sdccc}
                              />
                            ))}
                          </TreeItem>
                        ))}
                      </TreeItem>
                    ))}
                  </TreeItem>
                ))}
            </TreeView>
            <Popover
              id={'popover-label'}
              style={{ pointerEvents: 'fill' }}
              open={openPopover}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              onClose={handlePopoverClose}
              disableRestoreFocus
            >
              <List dense className={classes.list}>
                {popOverData.map((el) => (
                  <ListItem
                    key={el.value}
                    className={classes.listItem}
                    onClick={() => handleActionClick(el.value)}
                  >
                    <ListItemText primary={el.label} />
                  </ListItem>
                ))}
              </List>
            </Popover>
          </LoadingCard>
        </main>
      )}
    </Box>
  );
};

export default AppTreeView;
