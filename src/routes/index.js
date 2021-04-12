import React from 'react';
import { Switch, withRouter } from 'react-router-dom';

import PublicRoute from './public-route';
import PrivateRoute from './private-route';
import RestrictedRoute from './restricted-route';

import BasicLayout from '@app/layouts/basic-layout';
import DashboardLayout from '@app/layouts/dashboard-layout';

import { LoginContainer, ForgotPasswordContainer } from '@app/pages/Auth';
import AdminContainer from '@app/pages/Admin';
import TopologyContainer from '@app/pages/Topology';
import ResourceContainer from '@app/pages/Resource';
import GalleryContainer from '@app/pages/Gallery';
import PackageContainer from '@app/pages/Package';
import LessonContainer from '@app/pages/Lession';
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
      path="/topologies/:type?/:typeId?"
      component={TopologyContainer}
      layout={DashboardLayout}
    />
    <PrivateRoute
      path="/resources/:id?"
      component={ResourceContainer}
      layout={DashboardLayout}
    />
    <PrivateRoute
      path="/galleries/:type?/:id?"
      component={GalleryContainer}
      layout={DashboardLayout}
    />
    <PrivateRoute
      path="/packages/:id?"
      component={PackageContainer}
      layout={DashboardLayout}
    />
    <PrivateRoute
      path="/admins/:type?/:id?"
      component={AdminContainer}
      layout={DashboardLayout}
    />
    <PrivateRoute
      path="/lessons"
      component={LessonContainer}
      layout={DashboardLayout}
    />
    <PublicRoute path="**" component={NotFound} layout={BasicLayout} />
  </Switch>
);

export default withRouter(AppRoutes);
