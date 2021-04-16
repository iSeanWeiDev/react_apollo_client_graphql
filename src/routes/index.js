import React from 'react';
import { Switch, withRouter } from 'react-router-dom';

import PublicRoute from './public-route';
import PrivateRoute from './private-route';
// import RestrictedRoute from './restricted-route';

import BasicLayout from '@app/layouts/basic-layout';
import AppLayout from '@app/layouts/app-layout';
import DashboardLayout from '@app/layouts/dashboard-layout';

import HomeContainer from '@app/pages/Home';
import ComingSoonContainer from '@app/pages/ComingSoon';
import DashboardContainer from '@app/pages/Dashboard';
import UserContainer from '@app/pages/User';
import TopologyContainer from '@app/pages/Topology';
import ResourceContainer from '@app/pages/Resource';
import GalleryContainer from '@app/pages/Gallery';
import PackageContainer from '@app/pages/Package';
import LessonContainer from '@app/pages/Lession';
import NotFound from '@app/pages/NotFound';

const AppRoutes = () => (
  <Switch>
    <PublicRoute exact path="/" component={HomeContainer} layout={AppLayout} />
    <PrivateRoute
      path="/dashboard"
      component={DashboardContainer}
      layout={DashboardLayout}
    />
    <PrivateRoute
      path="/topologies/:type?/:typeId?/:pId?"
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
      path="/users/:type?/:id?"
      component={UserContainer}
      layout={DashboardLayout}
    />
    <PrivateRoute
      path="/lessons"
      component={LessonContainer}
      layout={DashboardLayout}
    />
    <PrivateRoute
      path="/archives"
      component={ComingSoonContainer}
      layout={DashboardLayout}
    />
    <PrivateRoute
      path="/tutorials"
      component={ComingSoonContainer}
      layout={DashboardLayout}
    />
    <PrivateRoute
      path="/settings"
      component={ComingSoonContainer}
      layout={DashboardLayout}
    />
    <PublicRoute path="**" component={NotFound} layout={BasicLayout} />
  </Switch>
);

export default withRouter(AppRoutes);
