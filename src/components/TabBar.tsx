import { View, Pressable, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
} from 'react-native-reanimated';

import useTheme from '../hooks/useTheme';

const ROTATE_DURATION = 150;

const TabBar = ({ state, descriptors, navigation }: any) => {
  const { darkMode } = useTheme();
  const angle = useSharedValue(0);

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${angle.value + 'deg'}` }],
    };
  }, [angle]);

  return (
    <View style={[{ backgroundColor: darkMode ? '#4B454D' : '#fff' }, styles.mainContainer]}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];

        const isFocused = state.index === index;

        const tabIcon = options.tabBarIcon({
          color: isFocused ? (darkMode ? '#FFF' : '#0099FF') : darkMode ? '#0099FF' : 'gray',
          size: 30,
        });

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }

          angle.value = withSequence(
            withTiming(-20, { duration: ROTATE_DURATION }),
            withRepeat(withTiming(20, { duration: ROTATE_DURATION }), 2, true, () => {
              angle.value = withTiming(0, { duration: ROTATE_DURATION });
            })
          );
        };

        return (
          <View key={index} style={styles.mainItemContainer}>
            <Animated.View style={isFocused ? reanimatedStyle : null}>
              <Pressable onPress={onPress}>{tabIcon}</Pressable>
            </Animated.View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 15,
    paddingVertical: 5,
    borderRadius: 15,
    marginHorizontal: 100,
    shadowColor: '#171717',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    zIndex: 999,
  },
  mainItemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 1,
    borderColor: '#333B42',
    height: 30,
  },
});

export default TabBar;
