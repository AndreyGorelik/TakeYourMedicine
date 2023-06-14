import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useImperativeHandle, forwardRef, useCallback } from 'react';
import { Dimensions, TouchableHighlight, StyleSheet, Text, View, FlatList } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

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
        <Text style={styles.menuText}>{item.label}</Text>
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
          <View style={styles.innerSheetView}>
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
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 25,
  },
  menuText: {
    textAlign: 'center',
    fontSize: 20,
    paddingVertical: 10,
  },
});

export default ActionSheet;
