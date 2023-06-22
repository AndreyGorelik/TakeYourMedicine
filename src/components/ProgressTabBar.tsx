import { Route, NavigationState } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet } from 'react-native';

import useTheme from '../hooks/useTheme';

import ProgressBar from './ProgressBar';

interface RouteParams {
  range: number;
}

interface ProgressTabBarProps {
  state: NavigationState;
}

const ProgressTabBar = ({ state }: ProgressTabBarProps) => {
  const route = state.routes[state.index] as Route<string, RouteParams>;

  const { themeStyle } = useTheme();
  const { range } = route.params;

  return (
    <View style={[{ backgroundColor: themeStyle.colors.back }, styles.progressTabBar]}>
      <ProgressBar range={range} />
    </View>
  );
};

const styles = StyleSheet.create({
  progressTabBar: {
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
});

export default ProgressTabBar;
