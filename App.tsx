import React from 'react';
import { Keyboard, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import './18n';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import AppWrapper from './src/navigation/AppWrapper';

function App() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <GestureHandlerRootView style={styles.view}>
        <AppWrapper />
      </GestureHandlerRootView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
});

export default App;
