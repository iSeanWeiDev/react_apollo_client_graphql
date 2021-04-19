import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { FirebaseAuthProvider } from '@react-firebase/auth';
import { ThemeProvider } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter } from 'react-router-dom';
import { AppStateProvider } from '@app/providers';
import theme from '@app/themes';
import AppRoutes from '@app/routes';
import '@app/themes/app.css';
import config from './Config';

const App = () => {
  return (
    <FirebaseAuthProvider firebase={firebase} {...config.firebase}>
      <AppStateProvider>
        <ThemeProvider theme={theme}>
          <SnackbarProvider maxSnack={5}>
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </SnackbarProvider>
        </ThemeProvider>
      </AppStateProvider>
    </FirebaseAuthProvider>
  );
};

export default App;
