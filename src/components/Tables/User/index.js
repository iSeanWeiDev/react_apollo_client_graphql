import React, { useEffect, useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination
} from '@material-ui/core';
import { useGroupingQuery } from '@app/utils/hooks/apollo';
import useStyles from './style';

const UserTable = ({ dense, schemaType, docId, onChange }) => {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const users = useGroupingQuery({
    schemaType: schemaType,
    parentId: docId
  });
  console.log(users);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return <Box className={classes.root}>dsddd</Box>;
};

export default UserTable;
