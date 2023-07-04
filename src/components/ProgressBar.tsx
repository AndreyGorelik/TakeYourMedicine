import { View, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

interface ProgressBarInterface {
  range: number;
}

const ProgressBar = ({ range }: ProgressBarInterface) => {
  const progress = useSharedValue(0);

  if (range < 1) {
    progress.value = withTiming(1);
  } else if (range > 100) {
    progress.value = withTiming(100);
  } else {
    progress.value = withTiming(range);
  }

  const aStyle = useAnimatedStyle(() => {
    return {
      width: `${progress.value + '%'}`,
    };
  });

  return (
    <View style={styles.backBar}>
      <Animated.View style={[styles.frontBar, aStyle]} />
    </View>
  );
};

const styles = StyleSheet.create({
  backBar: {
    width: '100%',
    height: 10,
    backgroundColor: '#e8e8e8',
    borderRadius: 25,
  },
  frontBar: {
    height: 10,
    backgroundColor: '#003F5F',
    borderRadius: 25,
  },
});

export default ProgressBar;
