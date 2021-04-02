import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Box, Divider, Typography, Button } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import { useSnackbar } from 'notistack';
import { Alert } from '@material-ui/lab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCog } from '@fortawesome/free-solid-svg-icons';
import { CreateUserDialog, EditUserDialog } from '@app/components/Dialogs';
import { DataGrid } from '@material-ui/data-grid';
import graphql from '@app/graphql';
import useStyles from './style';

const AdminUsers = ({ type }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [loadedData, setLoadedData] = useState([]);
  const [title, setTitle] = useState('');
  const [nameRegExp, setNameRegExp] = useState(null);
  const [totalRow, setTotalRow] = useState();
  const [hideAlert, setHideAlert] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});

  const columns = [
    { field: 'name', headerName: 'User name', width: 250 },
    { field: 'firstName', headerName: 'First name', width: 200 },
    { field: 'lastName', headerName: 'Last name', width: 200 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'phone', headerName: 'Phone', width: 150 }
  ];

  useEffect(() => {
    switch (type) {
      case 'sysAdmin':
        setTitle('System Admins');
        break;
      case 'stationAdmin':
        setTitle('Station Admins');
        break;
      case 'districtAdmin':
        setTitle('District Admins');
        break;
      case 'schoolAdmin':
        setTitle('School Admins');
        break;
      default:
        break;
    }
  }, [type]);

  const [createGrouping] = useMutation(graphql.mutations.createGrouping, {
    update(cache, { data: { createGrouping } }) {
      const existData = cache.readQuery({
        query: graphql.queries.grouping,
        variables: {
          schemaType: type
        }
      });
      const tmp = [...existData.grouping, createGrouping];
      cache.writeQuery({
        query: graphql.queries.grouping,
        variables: {
          schemaType: type
        },
        data: {
          grouping: tmp
        }
      });
    }
  });

  const [updateGrouping] = useMutation(graphql.mutations.updateGrouping, {
    update(cache, { data: { updateGrouping } }) {
      const existData = cache.readQuery({
        query: graphql.queries.grouping,
        variables: {
          schemaType: type
        }
      });
      let tmp = existData.grouping.slice();
      const idx = tmp.findIndex((el) => el['_id'] === updateGrouping['_id']);
      if (idx > -1) {
        tmp[idx] = updateGrouping;
      }

      cache.writeQuery({
        query: graphql.queries.grouping,
        variables: {
          schemaType: type
        },
        data: {
          grouping: tmp
        }
      });
    }
  });

  const [deleteDocument] = useMutation(graphql.mutations.deleteDocument, {
    update(cache) {
      const existData = cache.readQuery({
        query: graphql.queries.grouping,
        variables: {
          schemaType: type
        }
      });
      const tmp = existData.grouping.filter(
        (el) => el['_id'] !== selectedUser.idx
      );
      cache.writeQuery({
        query: graphql.queries.grouping,
        variables: {
          schemaType: type
        },
        data: {
          grouping: tmp
        }
      });
    }
  });

  const { loading, data, error } = useQuery(graphql.queries.grouping, {
    variables: {
      schemaType: type
    }
  });

  useEffect(() => {
    if (!loading && !error) {
      const tmp = data.grouping.map((el, index) => ({
        id: index + 1,
        idx: el['_id'],
        name: el.name,
        firstName: el.contact?.firstName,
        lastName: el.contact?.lastName,
        email: el.contact?.email,
        phone: el.contact?.phone,
        schemaVer: el.schemaVer,
        version: el.version
      }));
      setLoadedData(tmp);
      setTotalRow(tmp.length);
    }
  }, [loading, data, error]);

  const handleCreateDialogChange = async (flag, value) => {
    try {
      if (flag) {
        const response = await createGrouping({
          variables: {
            schemaType: type,
            schemaVer: 1,
            version: 1,
            name: value.name,
            contact: {
              firstName: value.firstName,
              lastName: value.lastName,
              email: value.email,
              phone: value.phone
            }
          }
        });
        const { data } = response;
        const tmp = loadedData.slice();
        setLoadedData([
          {
            ...value,
            idx: data.createGrouping['_id'],
            id: tmp.length > 0 ? tmp[tmp.length - 1]['id'] + 1 : 1
          },
          ...tmp
        ]);
        enqueueSnackbar('Successfully added!', { variant: 'success' });
      }
      setOpenCreate(false);
    } catch (error) {
      console.log(error.message);
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  const handleEditDialogChange = async (flag, method, value) => {
    try {
      if (flag) {
        if (method === 'save') {
          const findedData = loadedData.find((el) => el.idx === value.idx);
          const response = await updateGrouping({
            variables: {
              id: value.idx,
              name: value.name ? value.name : findedData.name,
              schemaType: type,
              schemaVer: findedData.schemaVer,
              version: findedData.version,
              contact: {
                firstName: value.firstName
                  ? value.firstName
                  : findedData?.firstName,
                lastName: value.lastName
                  ? value.lastName
                  : findedData?.lastName,
                email: value.email ? value.email : findedData?.email,
                phone: value.phone ? value.phone : findedData?.phone
              }
            }
          });
          const { data } = response;
          let tmp = loadedData.slice();
          const idx = tmp.findIndex((el) => el.idx === value.idx);
          tmp[idx] = {
            ...tmp[idx],
            name: data.updateGrouping.name,
            fistName: data.updateGrouping.contact?.firstName,
            lastName: data.updateGrouping.contact?.lastName,
            email: data.updateGrouping.contact?.email,
            phone: data.updateGrouping.contact?.phone,
            version: data.updateGrouping.version
          };

          setLoadedData(tmp);
          enqueueSnackbar(
            `Successfully User ${data.updateGrouping.name} updated.`,
            { variant: 'success' }
          );
        }

        if (method === 'delete') {
          const response = await deleteDocument({
            variables: {
              schemaType: type,
              id: value.idx
            }
          });

          const tmp = loadedData.filter((el) => el.idx !== value.idx);
          setLoadedData(tmp);
          const { data } = response;
          enqueueSnackbar(data.deleteDocument, { variant: 'success' });
        }
      }

      setOpenEdit(false);
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  const handleRowDoubleClick = (value) => {
    setOpenEdit(true);
    setSelectedUser(value.row);
  };

  return (
    <Box className={classes.container}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" className={classes.panelTitle}>
          <FontAwesomeIcon icon={faUserCog} className={classes.panelIcon} />
          {title}
        </Typography>
        <Button
          variant="contained"
          className={classes.addBtn}
          onClick={() => setOpenCreate(true)}
        >
          <AddIcon />
          Add New User
        </Button>
      </Box>

      <Divider className={classes.separator} />
      {!hideAlert && (
        <Alert
          severity="info"
          className={classes.alert}
          onClose={() => setHideAlert(true)}
        >
          To <b>EDIT</b> or <b>DELETE</b> the user, please double click the row.
        </Alert>
      )}
      <DataGrid
        rows={loadedData}
        columns={columns}
        rowCount={totalRow}
        pageSize={5}
        paginationMode="client"
        scrollbarSize={5}
        rowsPerPageOptions={[5, 10, 15]}
        autoHeight
        showCellRightBorder
        disableSelectionOnClick
        onRowDoubleClick={handleRowDoubleClick}
      />
      <EditUserDialog
        type={type}
        open={openEdit}
        resources={selectedUser}
        onChange={handleEditDialogChange}
      />
      <CreateUserDialog
        type={type}
        open={openCreate}
        onChange={handleCreateDialogChange}
      />
    </Box>
  );
};

export default AdminUsers;
