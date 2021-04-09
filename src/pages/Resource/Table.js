import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination
} from '@material-ui/core';
import { Img } from 'react-image';
import noImagePng from '@app/assets/imgs/no-image.png';
import useStyles from './style';

const columns = [
  { id: 'name', label: 'Name', minWidth: 200 },
  { id: 'title', label: 'Title', minWidth: 200 },
  { id: 'description', label: 'Description' },
  {
    id: 'version',
    label: 'Version',
    align: 'center'
  },
  {
    id: 'status',
    label: 'Status',
    align: 'center'
  }
];

const ResourceTable = ({ resources, onChange }) => {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    if (resources) {
      setRows(resources);
    }
  }, [resources]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRowClick = (value) => {
    onChange(value);
  };
  return (
    <TableContainer className={classes.container}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
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
        <TableBody className={classes.tableBody}>
          {rows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
              <TableRow
                key={row.id}
                className={classes.tableRow}
                onClick={() => handleRowClick(row)}
              >
                <TableCell
                  component="th"
                  scope="row"
                  width="200"
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center'
                  }}
                >
                  <Img
                    src={row.avatar?.url ? row.avatar.url : noImagePng}
                    width="40"
                  />
                  &nbsp; &nbsp;
                  {row.name}
                </TableCell>
                <TableCell align="left" width="200">
                  {row.desc?.title && row.desc?.title.length > 50
                    ? `${row.desc.title.substring(0, 50)}... ...`
                    : row.desc?.title}
                </TableCell>
                <TableCell align="left">
                  {row.desc?.long && row.desc?.long.length > 120
                    ? `${row.desc?.long.substring(0, 120)}... ...`
                    : row.desc?.long}
                </TableCell>
                <TableCell align="center">{row.version}</TableCell>
                <TableCell align="center">{row.status}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        className={classes.pagination}
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default ResourceTable;
