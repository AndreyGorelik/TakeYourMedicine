import { Route, NavigationState } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet } from 'react-native';

import ProgressBar from './ProgressBar';

interface RouteParams {
  range: number;
}

interface ProgressTabBarProps {
  state: NavigationState;
}

const ProgressTabBar = ({ state }: ProgressTabBarProps) => {
  const route = state.routes[state.index] as Route<string, RouteParams>;

  const { range } = route.params;

  return (
    <View style={styles.progressTabBar}>
      <ProgressBar range={range} />
    </View>
  );
};

const styles = StyleSheet.create({
  progressTabBar: {
    paddingVertical: 40,
    paddingHorizontal: 15,
  },
});

export default ProgressTabBar;
