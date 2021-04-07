/* eslint-disable max-len */
import React, { useState } from 'react';
import { Box } from '@material-ui/core';
import { Document, Page, pdfjs } from 'react-pdf';
import config from '@app/Config';
import useStyles from './style';
import './style.css';

const PDFReader = ({ url }) => {
  const classes = useStyles();
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

  const handleDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  return (
    <Box className={classes.root} display="flex" justifyContent="center">
      <Document
        className={classes.content}
        file={`${config.dev.corsHandler}${url}`}
        onLoadSuccess={handleDocumentLoadSuccess}
      >
        <Page scale={1} width={450} pageNumber={pageNumber} />
      </Document>
    </Box>
  );
};

export default PDFReader;
