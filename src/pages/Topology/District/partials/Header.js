import React from 'react';
import {
  Box,
  Paper,
  Button,
  IconButton,
  InputBase,
  Typography,
  CircularProgress
} from '@material-ui/core';
import {
  Search as SearchIcon,
  ArrowBack as BackIcon,
  DeleteOutline as DeleteIcon
} from '@material-ui/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBroadcastTower, faSchool } from '@fortawesome/free-solid-svg-icons';
import { Img } from 'react-image';
import noLogo from '@app/assets/imgs/no-logo.jpg';
import useStyles from '../style';

const DistrictHeader = ({ selectedData, stationData, onChange, ...rest }) => {
  const classes = useStyles();
  const handleSearchChange = () => {};
  return (
    <Box {...rest}>
      {!selectedData ? (
        <React.Fragment>
          <Box display="flex" justifyContent="flex-start" alignItems="center">
            <Box marginRight={1}>
              <IconButton
                color="inherit"
                style={{ color: 'white' }}
                // onClick={handleBack}
              >
                <BackIcon />
              </IconButton>
            </Box>
            <Box className={classes.title}>
              <Typography variant="h5" style={{ fontWeight: 700 }}>
                <FontAwesomeIcon icon={faSchool} />
                &nbsp; &nbsp; Districts
              </Typography>
              <Typography variant="caption">
                <FontAwesomeIcon icon={faBroadcastTower} />
                &nbsp; {stationData.name} /
              </Typography>
            </Box>
          </Box>
          <Box component={Paper} className={classes.search}>
            <InputBase
              className={classes.input}
              onChange={handleSearchChange}
              placeholder="Search districts... ... "
              inputProps={{ 'aria-label': 'search districts' }}
            />
            <IconButton
              type="submit"
              className={classes.iconButton}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>
          </Box>
          <Button
            variant="contained"
            className={classes.addButton}
            onClick={() => onChange('create', true)}
          >
            Add New District
          </Button>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Box display="flex" justifyContent="flex-start" alignItems="center">
            <Box marginRight={2}>
              <IconButton
                color="inherit"
                style={{ color: 'white' }}
                // onClick={handleBack}
              >
                <BackIcon />
              </IconButton>
            </Box>
            <Img
              src={selectedData.avatar?.url ? selectedData.avatar?.url : noLogo}
              width="40"
              height="40"
            />
            <Box marginLeft={2} className={classes.title}>
              <Typography variant="h6">{selectedData.name}</Typography>
              <Typography variant="caption">
                <FontAwesomeIcon icon={faBroadcastTower} />
                &nbsp; {stationData.name} / &nbsp;
                <FontAwesomeIcon icon={faSchool} />
                &nbsp; {selectedData.name}
              </Typography>
            </Box>
          </Box>
          <Box
            display="flex"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <IconButton
              variant="contained"
              className={classes.addButton}
              // onClick={handleDelete}
            >
              <DeleteIcon /> &nbsp; Remove
            </IconButton>
            &nbsp; &nbsp;
            <Box position="relative">
              <Button
                variant="contained"
                className={classes.saveButton}
                // onClick={handleSave}
                // disabled={!canUpdate || loadingSave}
              >
                Save
                {/* {loadingSave && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )} */}
              </Button>
            </Box>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
};

export default DistrictHeader;
