import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Checkbox,
  Paper,
  TablePagination,
  FormControlLabel,
  Switch
} from '@material-ui/core';
import { useGroupingQuery } from '@app/utils/hooks/apollo';
import { LoadingCard } from '@app/components/Cards';
import { getComparator, stableSort } from '@app/utils/data-format';
import EnhancedTableHead from './Header';
import EnhancedTableToolbar from './Toolbar';
import UserUpload from './Upload';
import useStyles from './style';

const UserTable = ({ schemaType, docId, onChange }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [openUpload, setOpenUpload] = useState(false);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [selected, setSelected] = useState();
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const users = useGroupingQuery({
    schemaType: schemaType,
    parentId: docId
  });

  useEffect(() => {
    setLoading(true);
    if (users) {
      const tmp = users.map((el) => ({
        id: el['_id'],
        name: el.name,
        firstName: el.contact?.firstName,
        lastName: el.contact?.lastName,
        email: el.contact?.email,
        phone: el.contact?.phone
      }));

      setRows(tmp);
      setLoading(false);
    }
  }, [users]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (id) => {
    if (selected === id) {
      setSelected();
    } else {
      setSelected(id);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected === id;
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleToolbarChange = (type) => {
    if (type === 'upload') {
      setOpenUpload(true);
    }
  };

  const handleUploadDialogChange = (type, value) => {
    if (type === 'close') setOpenUpload(false);
  };

  return (
    <LoadingCard loading={loading} height={`calc(100vh - 350px)`}>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <EnhancedTableToolbar
            schemaType={schemaType}
            selectedData={rows.find((el) => el.id === selected)}
            onChange={handleToolbarChange}
          />
          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
              aria-label="enhanced table"
            >
              <EnhancedTableHead
                classes={classes}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    const isItemSelected = isSelected(row.id);
                    const labelId = `enhanced-table-checkbox-${row.id}`;

                    return (
                      <TableRow
                        hover
                        onClick={() => handleClick(row.id)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.name}
                        selected={isItemSelected}
                        style={{
                          '&:selected': {
                            background: 'red'
                          }
                        }}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                        </TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          {row.name}
                        </TableCell>
                        <TableCell align="left">{row.firstName}</TableCell>
                        <TableCell align="left">{row.lastName}</TableCell>
                        <TableCell align="left">{row.email}</TableCell>
                        <TableCell align="left">{row.phone}</TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
        />
      </div>
      <UserUpload
        docId={docId}
        open={openUpload}
        schemaType={schemaType}
        onChange={handleUploadDialogChange}
      />
    </LoadingCard>
  );
};

export default UserTable;
