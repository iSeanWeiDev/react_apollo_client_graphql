import React, { useCallback } from 'react';
import clsx from 'clsx';
import { Box, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { useDropzone } from 'react-dropzone';
import { findPhoneNumbersInText } from 'libphonenumber-js';
import useStyles from './style';

const UserUpload = ({ onChange }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const convertFileToJSON = (file) =>
    new Promise((resolve) => {
      const fileReader = new FileReader();
      fileReader.onload = (evt) => {
        const lines = evt.target.result.split('\n');
        const result = [];
        let headers = lines[0].split(',');
        headers = headers.map((el) => el.trim());

        for (let i = 1; i < lines.length; i++) {
          let obj = {};
          const currentline = lines[i].split(',');

          for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
          }

          result.push(obj);
        }
        resolve({ result, headers });
      };
      fileReader.readAsText(file);
    });

  const genCSVData = (headers, data) => {
    const csvString = [
      [...headers],
      ...data.map((item) => headers.map((elHeader) => item[elHeader]))
    ]
      .map((e) => e.join(','))
      .join('\n');

    return csvString;
  };

  const onDrop = useCallback(async (files) => {
    try {
      const { result, headers } = await convertFileToJSON(files[0]);
      if (!headers.includes('phone')) {
        enqueueSnackbar(
          'Invalid CSV file type, CSV have to include the phone number',
          { variant: 'error' }
        );
        return;
      }

      const validatedData = [];
      const invalidatedData = [];
      for (const obj of result) {
        if (obj.phone) {
          const arrPhone = findPhoneNumbersInText(obj.phone, 'US');
          if (arrPhone.length === 0) {
            invalidatedData.push(obj);
            continue;
          }
          validatedData.push({
            ...obj,
            phone: arrPhone[0].number.number
          });
        }
      }

      // validated File logic
      const validatedCSVData = genCSVData(headers, validatedData);
      const validatedBlob = new Blob([validatedCSVData], {
        type: files[0].type
      });

      const validatedCSVFile = new File(
        [validatedBlob],
        'validated_users.csv',
        { type: files[0].type, lastModified: files[0].lastModified }
      );
      onChange(validatedCSVFile);

      // handling invalidated file logic
      if (invalidatedData.length > 0) {
        const invalidatedCSVData = genCSVData(headers, invalidatedData);
        const invalidatedBlob = new Blob([invalidatedCSVData], {
          type: files[0].type
        });

        var link = document.createElement('a');
        link.download = 'invalidated_users.csv';
        link.href = window.URL.createObjectURL(invalidatedBlob);
        link.click();

        enqueueSnackbar('Successfully uploaded', { variant: 'success' });
      }
    } catch (error) {
      console.log(error.message);
      enqueueSnackbar(error.message, { variant: 'warning' });
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: '.csv'
  });

  return (
    <Box
      {...getRootProps()}
      className={clsx(classes.dropzone, {
        [classes.dropzone]: !isDragActive,
        [classes.dropzoneDragging]: isDragActive
      })}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <Typography variant="subtitle1" className={classes.dropzoneParagraph}>
          Drop the file here ...
        </Typography>
      ) : (
        <Typography variant="subtitle1" className={classes.dropzoneParagraph}>
          Upload the file
        </Typography>
      )}
    </Box>
  );
};

export default UserUpload;
