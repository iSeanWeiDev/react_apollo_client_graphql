import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter } from 'react-router-dom';
import { AppStateProvider } from '@app/providers';
import { Authenticator, SignIn, Greetings } from 'aws-amplify-react';
import theme from '@app/themes';
import AppRoutes from '@app/routes';
import config from './Config';
import '@app/themes/app.css';

const App = () => {
  return (
    <Authenticator hide={[SignIn, Greetings]} amplifyConfig={config.aws}>
      <AppStateProvider>
        <ThemeProvider theme={theme}>
          <SnackbarProvider maxSnack={5}>
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </SnackbarProvider>
        </ThemeProvider>
      </AppStateProvider>
    </Authenticator>
  );
};

export default App;
