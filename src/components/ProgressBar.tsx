import { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

interface ProgressBarInterface {
  range: number;
}

const ProgressBar = ({ range }: ProgressBarInterface) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    if (range < 1) {
      progress.value = withSpring(1);
    } else if (range > 100) {
      progress.value = withSpring(100);
    } else {
      progress.value = withSpring(range);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  progress.value = withSpring(range);

  const aStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(`${progress.value + '%'}`, {
        duration: 100,
      }),
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
