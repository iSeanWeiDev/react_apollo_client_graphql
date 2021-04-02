import { isAuthenticated } from '@app/utils/auth';
import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, layout: Layout, ...rest }) => {
  const [isAuth, setLoggedIn] = useState(-1);

  useEffect(() => {
    (async () => {
      setLoggedIn((await isAuthenticated()) ? 1 : 0);
    })();
  });

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth === 0 ? (
          <Redirect to="/"></Redirect>
        ) : (
          isAuth === 1 && (
            <Layout>
              <Component {...props} />
            </Layout>
          )
        )
      }
    />
  );
};

export default PrivateRoute;
