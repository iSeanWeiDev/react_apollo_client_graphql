import React from 'react';
import { Switch, withRouter } from 'react-router-dom';

import PublicRoute from './public-route';
import PrivateRoute from './private-route';
import RestrictedRoute from './restricted-route';

import BasicLayout from '@app/layouts/basic-layout';
import DashboardLayout from '@app/layouts/dashboard-layout';

import { LoginContainer, ForgotPasswordContainer } from '@app/pages/Auth';
import AdminContainer from '@app/pages/Admin';
import DashboardContainer from '@app/pages/Dashboard';
import TopologyContainer from '@app/pages/Topology';
import NotFound from '@app/pages/NotFound';

const AppRoutes = () => (
  <Switch>
    <RestrictedRoute
      exact
      path="/"
      component={LoginContainer}
      layout={BasicLayout}
    />
    <RestrictedRoute
      exact
      path="/forgot-password"
      component={ForgotPasswordContainer}
      layout={BasicLayout}
    />
    <PrivateRoute
      path="/dashboard"
      component={DashboardContainer}
      layout={DashboardLayout}
    />
    <PrivateRoute
      path="/topologies"
      component={TopologyContainer}
      layout={DashboardLayout}
    />
    <PrivateRoute
      path="/admins/:type?/:id?"
      component={AdminContainer}
      layout={DashboardLayout}
    />
    <PublicRoute path="**" component={NotFound} layout={BasicLayout} />
  </Switch>
);

export default withRouter(AppRoutes);
