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
import useStyles from './style';

const ResourceTable = ({ dense, resources, onChange }) => {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const getColumns = (dense) => {
    if (dense) {
      return [
        { id: 'name', label: 'Name', minWidth: 200 },
        { id: 'createdAt', label: 'CreatedAt', minWidth: 200 }
      ];
    } else {
      return [
        { id: 'name', label: 'Name', minWidth: 200 },
        { id: 'createdAt', label: 'CreatedAt', minWidth: 200 },
        {
          id: 'version',
          label: 'Version',
          minWidth: 100,
          align: 'center'
        },
        {
          id: 'status',
          label: 'Status',
          minWidth: 100,
          align: 'center'
        }
      ];
    }
  };

  useEffect(() => {
    if (resources) {
      const tmp = resources.map((el) => ({
        id: el['_id'],
        name: el.name,
        createdAt: el.createdAt,
        updatedAt: el.updatedAt,
        version: el.version,
        schemaType: el.schemaType,
        status: el.status,
        childrenIdList: el.childrenIdList,
        parentId: el.parentId
      }));
      setRows(tmp);
      setPage(0);
    }
  }, [resources]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box className={classes.table}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {getColumns(dense).map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.id}
                  onClick={() => onChange(row)}
                >
                  {getColumns(dense).map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number'
                          ? column.format(value)
                          : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        className={classes.pagination}
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default ResourceTable;
