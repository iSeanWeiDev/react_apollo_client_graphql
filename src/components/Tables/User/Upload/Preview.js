import React, { useEffect, useState } from 'react';
import { Box, Typography, IconButton } from '@material-ui/core';
import { Clear as ClearIcon } from '@material-ui/icons';
import TableForm from './Table';
import useStyles from './style';

const UserPreview = ({ resources, onChange }) => {
  const classes = useStyles();
  const [headerData, setHeaderData] = useState([]);
  const [loadedData, setLoadedData] = useState([]);

  const convertFileToJSON = (file) => {
    const fileReader = new FileReader();
    fileReader.onload = (evt) => {
      const lines = evt.target.result.split('\n');
      const result = [];
      const headers = lines[0].split(',');
      for (let i = 1; i < lines.length; i++) {
        let obj = {};
        const currentline = lines[i].split(',');

        for (let j = 0; j < headers.length; j++) {
          obj[headers[j]] = currentline[j];
        }

        result.push(obj);
      }

      setHeaderData(headers);
      setLoadedData(result);
    };
    fileReader.readAsText(file);
  };

  useEffect(() => {
    if (resources) {
      convertFileToJSON(resources);
    }
  }, [resources]);

  return (
    <React.Fragment>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="subtitle1" className={classes.previewTitle}>
          Preview uploaded CSV file ( total rows: {loadedData.length} )
        </Typography>
        <IconButton>
          <ClearIcon onClick={() => onChange()} />
        </IconButton>
      </Box>
      <TableForm header={headerData} resources={loadedData.slice(0, 9)} />
    </React.Fragment>
  );
};

export default UserPreview;
