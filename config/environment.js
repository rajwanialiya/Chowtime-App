var environments = {
  staging: {
    FIREBASE_API_KEY: 'AIzaSyB7Wf82FZj4myWXW8ih3CM9qAY2wO20R3k',
    FIREBASE_AUTH_DOMAIN: 'chowtime-nlp.firebaseapp.com',
    FIREBASE_DATABASE_URL: 'https://chowtime-nlp.firebaseio.com/',
    FIREBASE_PROJECT_ID: 'chowtime-nlp',
    FIREBASE_STORAGE_BUCKET: 'chowtime-nlp.appspot.com',
    FIREBASE_MESSAGING_SENDER_ID: '865904963252',
    GOOGLE_CLOUD_VISION_API_KEY: 'AIzaSyCjYxpm0W41Vk179FdaR3cZJHSDAovWcWE'
  },
  production: {
    // Warning: This file still gets included in your native binary and is not a secure way to store secrets if you build for the app stores. Details: https://github.com/expo/expo/issues/83
  }
};

function getReleaseChannel() {
  return 'staging'
}

function getEnvironment(env) {
  return environments[env];
}

var Environment = getEnvironment(getReleaseChannel());
export default Environment;