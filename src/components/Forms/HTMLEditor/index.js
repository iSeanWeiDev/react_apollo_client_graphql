import React, { useState, useEffect, useRef } from 'react';
import { Box } from '@material-ui/core';
import { Editor } from 'react-draft-wysiwyg';
import {
  EditorState,
  convertFromRaw,
  convertToRaw,
  AtomicBlockUtils
} from 'draft-js';
import toolbarData from './editor.config';
import useStyles from './style';
import './style.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const HTMLEditor = ({ onChange }) => {
  const classes = useStyles();
  const editorRef = useRef(null);
  const [editorState, setEditorState] = useState();

  const handleEditorStateChange = (value) => {
    setEditorState(value);
    const currentContent = convertToRaw(value.getCurrentContent());
    // onChange(currentContent);
  };

  return (
    <Box className={classes.root}>
      <Editor
        toolbar={toolbarData}
        ref={editorRef}
        editorState={editorState}
        toolbarClassName={classes.toolbarArea}
        wrapperClassName={classes.wrapperArea}
        editorClassName={classes.editorArea}
        onEditorStateChange={handleEditorStateChange}
      />
    </Box>
  );
};

export default HTMLEditor;
