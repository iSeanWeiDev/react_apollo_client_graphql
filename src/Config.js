/* eslint-disable max-len */
export default {
  apollo: {
    http: 'https://core-staging.pmep.org:4001/',
    ws: 'wss://core-staging.pmep.org:4001/'
  },
  firebase: {
    apiKey: 'AIzaSyDzFHT2paKuZNfERmFseHyfC0slPYG16Mo',
    projectId: 'pmep-demo',
    databaseURL: 'https://pmep-demo-default-rtdb.firebaseio.com',
    authDomain: 'pmep-demo.firebaseapp.com',
    // OPTIONAL
    storageBucket: 'pmep-demo.appspot.com',
    messagingSenderId: '221889911451'
  },
  dev: {
    corsHandler: 'https://cors-anywhere-handler.herokuapp.com/'
  },
  auth: {
    loginUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR65bYCnRI9i-fI0RtOHdNlZQcP4X7SGiS8cQ&usqp=CAU',
    bottomLogo: 'https://configs.emp-sig.com/assets/PoweredByLogo.png',
    profileImage:
      'https://www.webxcreation.com/event-recruitment/images/profile-1.jpg'
  },
  signedUrl: {
    endpoint:
      'https://i7zrpnsiz8.execute-api.us-east-2.amazonaws.com/dev/getSignedUrl',
    bucketName: 'assets.emp-sig.com'
  },
  assetUrl: 'https://s3.us-east-2.amazonaws.com/assets.emp-sig.com',
  api: {
    userBulkUpsert:
      'https://xs9e660jm1.execute-api.us-east-2.amazonaws.com/users/multiple',
    packaging:
      'https://xs9e660jm1.execute-api.us-east-2.amazonaws.com/packaging'
  },
  mockData: {
    userFile:
      'https://drive.google.com/uc?export=download&id=1HtJrQtuLxVZx3Kkdqbl6JI35scNorG7a'
  }
};
