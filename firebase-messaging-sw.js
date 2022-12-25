// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
messaging.getToken({ vapidKey: 'BD8-hxWYnQfSAjjCNgVZXzlUnU4vtcbF7kbpqARzGnTJpUaG9Kn0EpjiKdiCgGnkB1zqovPMRuGS_lwAJig7oD8' })
.then((currentToken) => {
    if (currentToken) {
      // Send the token to your server and update the UI if necessary
      // ...
    } else {
      // Show permission request UI
      console.log('No registration token available. Request permission to generate one.');
      // ...
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // ...
  });