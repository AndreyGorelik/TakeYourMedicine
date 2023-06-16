import React from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import './18n';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import AppWrapper from './src/navigation/AppWrapper';
import { store, persistor } from './src/store';

function App() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      {/* <GestureHandlerRootView style={styles.view}> */}
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <AppWrapper />
        </PersistGate>
      </Provider>
      {/* </GestureHandlerRootView> */}
    </TouchableWithoutFeedback>
  );
}

// const styles = StyleSheet.create({
//   view: {
//     flex: 1,
//   },
// });

export default App;
