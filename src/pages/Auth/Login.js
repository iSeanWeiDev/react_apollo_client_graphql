import React from 'react';
import {
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseAuthedAnd
} from '@react-firebase/auth';
import firebase from 'firebase/app';

const LoginContainer = () => {
  return (
    <div>
      <button
        onClick={() => {
          const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
          firebase.auth().signInWithPopup(googleAuthProvider);
        }}
      >
        Sign In with Google
      </button>
      <button
        data-testid="signin-anon"
        onClick={() => {
          firebase.auth().signInAnonymously();
        }}
      >
        Sign In Anonymously
      </button>
      <button
        onClick={() => {
          firebase.auth().signOut();
        }}
      >
        Sign Out
      </button>
      <FirebaseAuthConsumer>
        {({ isSignedIn, user, providerId }) => {
          return (
            <pre style={{ height: 300, overflow: 'auto' }}>
              {JSON.stringify({ isSignedIn, user, providerId }, null, 2)}
            </pre>
          );
        }}
      </FirebaseAuthConsumer>
      <div>
        <IfFirebaseAuthed>
          {() => {
            return <div>You are authenticated</div>;
          }}
        </IfFirebaseAuthed>
        <IfFirebaseAuthedAnd
          filter={({ providerId }) => providerId !== 'anonymous'}
        >
          {({ providerId }) => {
            return <div>You are authenticated with {providerId}</div>;
          }}
        </IfFirebaseAuthedAnd>
      </div>
    </div>
  );
};

export default LoginContainer;
