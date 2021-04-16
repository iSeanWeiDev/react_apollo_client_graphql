import React from 'react';
import { withRouter } from 'react-router-dom';
import { Box, Typography } from '@material-ui/core';

const ArchiveContainer = ({ history }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height={`calc(100vh - 200px)`}
      component={Typography}
      variant="h3"
    >
      COMING SOON
    </Box>
  );
};

export default withRouter(ArchiveContainer);
