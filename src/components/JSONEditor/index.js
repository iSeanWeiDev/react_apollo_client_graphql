import React, { useRef, useEffect } from 'react';
import { Box } from '@material-ui/core';
import { JsonEditor as Editor } from 'jsoneditor-react';
import 'jsoneditor-react/es/editor.min.css';
import ace from 'brace';
import 'brace/mode/json';
import 'brace/theme/github';
import useStyles from './style';

const JSONEditor = ({ disable, resources, onChange }) => {
  const classes = useStyles();
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current !== null) {
      editorRef.current.update(resources ? resources : {});
    }
  }, [resources]);

  const setRef = (instance) => {
    if (instance) {
      editorRef.current = instance.jsonEditor;
    } else {
      editorRef.current = null;
    }
  };
  return (
    <Box className={classes.root}>
      <Editor
        ref={setRef}
        value={resources}
        mode={disable ? 'view' : 'code'}
        onChange={onChange}
        ace={ace}
        theme="ace/theme/github"
        height={500}
      />
    </Box>
  );
};

export default JSONEditor;
