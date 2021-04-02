import React from 'react';
import { Box, Drawer, Hidden } from '@material-ui/core';
import AppDrawer from './Drawer';
import useStyles from './style';

const AppSidebar = ({ mobileOpen, onChange, window }) => {
  const classes = useStyles();

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      <Hidden smUp implementation="css">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={() => onChange()}
          classes={{
            paper: classes.drawerPaper
          }}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          <AppDrawer />
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper
          }}
          variant="permanent"
          open
        >
          <AppDrawer />
        </Drawer>
      </Hidden>
    </nav>
  );
};

export default AppSidebar;
