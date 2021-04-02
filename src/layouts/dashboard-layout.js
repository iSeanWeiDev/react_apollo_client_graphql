import React from 'react';
import PropTypes from 'prop-types';
import { CssBaseline, Fab } from '@material-ui/core';
import { KeyboardArrowUp as KeyboardArrowUpIcon } from '@material-ui/icons';
import { AppNavbar, AppSidebar } from '@app/components/App';
import { ScrollTop } from '@app/components/ScrollButton';
import useStyles from './style';

const DashboardLayout = ({ window, children }) => {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppNavbar onChange={handleDrawerToggle} />
      <AppSidebar
        mobileOpen={mobileOpen}
        onChange={handleDrawerToggle}
        {...window}
      />
      <main className={classes.content}>
        <div className={classes.toolbar} id="back-to-top-anchor" />
        {children}
      </main>
      <ScrollTop window={window} children={children}>
        <Fab color="primary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </div>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func
};

export default DashboardLayout;
