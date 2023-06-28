import React from 'react';
import './18n';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import AppWrapper from './src/navigation/AppWrapper';
import { store, persistor } from './src/store';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AppWrapper />
      </PersistGate>
    </Provider>
  );
}

export default App;
