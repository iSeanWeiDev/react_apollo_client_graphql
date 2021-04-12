import React from 'react';
import { Typography } from '@material-ui/core';
import { fade, withStyles } from '@material-ui/core/styles';
import { TreeItem } from '@material-ui/lab';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TransitionComponent } from './utils';

TransitionComponent.propTypes = {
  in: PropTypes.bool
};

const CustomTreeItem = withStyles((theme) => ({
  iconContainer: {
    '& .close': {
      opacity: 0.3
    }
  },
  group: {
    marginLeft: 7,
    paddingLeft: 18,
    borderLeft: `1px dashed ${fade(theme.palette.text.primary, 0.4)}`
  }
}))(({ label, labelIcon, resources, ...rest }) => (
  <TreeItem
    label={
      <React.Fragment>
        <FontAwesomeIcon
          value={`${resources.schemaType}-${resources['_id']}`}
          icon={labelIcon}
          size="xs"
        />
        &nbsp;
        <Typography
          variant="caption"
          value={`${resources.schemaType}-${resources['_id']}`}
        >
          {label}
        </Typography>
      </React.Fragment>
    }
    {...rest}
    TransitionComponent={TransitionComponent}
    value={`${resources.schemaType}-${resources['_id']}`}
  />
));

export default CustomTreeItem;
