import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useImperativeHandle, forwardRef, useCallback } from 'react';
import { Dimensions, TouchableHighlight, StyleSheet, View, FlatList } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import useTheme from '../hooks/useTheme';

import Text from './Text';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

export const ACTION_SHEET_SIZE = -500;

interface MenuItem {
  id: string;
  label: string;
  function: () => void;
}

interface BottomSheetProps {
  options: MenuItem[];
}

export interface BottomSheetRefProps {
  // eslint-disable-next-line no-unused-vars
  scrollTo: (destination: number) => void;
  isActive: boolean;
}

const ActionSheet = forwardRef<BottomSheetRefProps, BottomSheetProps>(({ options }, ref) => {
  const translateY = useSharedValue(0);
  const active = useSharedValue(false);
  const { darkMode } = useTheme();

  const tabBarHeight = useBottomTabBarHeight();

  const scrollTo = useCallback(
    (destination: number) => {
      'worklet';
      active.value = destination !== 0;
      translateY.value = withSpring(destination, { damping: 50 });
    },
    [active, translateY]
  );

  const isActive = active.value;

  useImperativeHandle(ref, () => ({ scrollTo, isActive }), [scrollTo, isActive]);

  const context = useSharedValue({ y: 0 });
  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value };
    })
    .onUpdate((event) => {
      if (event.translationY < 0) return;
      translateY.value = event.translationY + context.value.y;
    })
    .onEnd(() => {
      if (translateY.value > ACTION_SHEET_SIZE + 50) {
        scrollTo(0);
      } else {
        scrollTo(ACTION_SHEET_SIZE);
      }
    });

  const bottomSheetStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const backdropStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(active.value ? 1 : 0),
    };
  }, []);

  const backdropProps = useAnimatedProps(() => {
    return {
      pointerEvents: active.value ? 'auto' : 'none',
    } as any;
  }, []);

  const renderMenuItem = ({ item }: { item: MenuItem }) => {
    return (
      <TouchableHighlight onPress={() => item.function()} underlayColor={'gray'}>
        <View style={styles.menuText}>
          <Text variant="h3">{item.label}</Text>
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <>
      <Animated.View
        onTouchStart={() => {
          scrollTo(0);
        }}
        animatedProps={backdropProps}
        style={[
          {
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'rgba(0,0,0,0.4)',
          },
          backdropStyle,
        ]}
      />
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[
            styles.bottomSheetContainer,
            bottomSheetStyle,
            { paddingBottom: tabBarHeight * 2 },
          ]}
        >
          <View
            style={[{ backgroundColor: darkMode ? '#003F5F' : 'white' }, styles.innerSheetView]}
          >
            <FlatList data={options} renderItem={renderMenuItem} keyExtractor={(item) => item.id} />
          </View>
        </Animated.View>
      </GestureDetector>
    </>
  );
});

const styles = StyleSheet.create({
  bottomSheetContainer: {
    height: -ACTION_SHEET_SIZE,
    width: screenWidth,
    backgroundColor: 'white',
    position: 'absolute',
    top: screenHeight,
    borderRadius: 25,
    zIndex: 99999,
    flex: 1,
  },
  innerSheetView: {
    flex: 1,
    padding: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  menuText: {
    alignItems: 'center',
  },
});

export default ActionSheet;
