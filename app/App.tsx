import {AppNavigator} from '@navigator/app-navigator';
import * as React from 'react';
import {store} from './store/store';
import {Provider} from 'react-redux';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const App = () => {
  React.useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '608291050737-0iuis5p9hjqpr9mk4s7kn8qaq3vha74k.apps.googleusercontent.com',
    });
  }, []);

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
