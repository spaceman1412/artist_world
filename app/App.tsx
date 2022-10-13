
import {AppNavigator} from '@navigator/app-navigator';
import * as React from 'react';
import {store} from './store/store';
import {Provider} from 'react-redux';

const App = () => {
  return (

    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
