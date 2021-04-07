export default {
  fontSize: {
    icon: 'fontSize',
    options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
    className: undefined,
    component: undefined,
    dropdownClassName: undefined
  },
  fontFamily: {
    options: [
      'Arial',
      'Georgia',
      'Impact',
      'Tahoma',
      'Times New Roman',
      'Verdana'
    ],
    className: undefined,
    component: undefined,
    dropdownClassName: undefined
  },
  blockType: {
    inDropdown: true,
    options: [
      'Normal',
      'H1',
      'H2',
      'H3',
      'H4',
      'H5',
      'H6',
      'Blockquote',
      'Code'
    ],
    className: 'blockType',
    component: undefined,
    dropdownClassName: undefined
  },
  list: {
    options: ['unordered', 'ordered']
  },
  history: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ['undo', 'redo']
  }
};
