import { useRef } from 'react';
import { StyleSheet, TextInput as NativeTextInput, View } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

interface TextInputCustom {
  placeholder: string;
  value: string;
  [x: string]: unknown;
}

type focusAndBlur = 'focus' | 'blur';

const ANIMATION_DURATION = 150;

const TextInput = ({ placeholder, value, ...rest }: TextInputCustom) => {
  const inputRef = useRef<NativeTextInput>(null);
  const top = useSharedValue(36);
  const labelFontSize = useSharedValue(16);

  const movePlaceholder = (status: focusAndBlur) => {
    if (status === 'focus') {
      top.value = withTiming(16, { duration: ANIMATION_DURATION });
      labelFontSize.value = withTiming(12, { duration: ANIMATION_DURATION });
    } else {
      if (!value) {
        top.value = withTiming(36, { duration: ANIMATION_DURATION });
        labelFontSize.value = withTiming(16, { duration: ANIMATION_DURATION });
      }
    }
  };

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      top: top.value,
    };
  }, []);

  const textReanimatedStyle = useAnimatedStyle(() => {
    return {
      fontSize: labelFontSize.value,
    };
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.placeholder, reanimatedStyle]}>
        <Animated.Text style={[styles.text, textReanimatedStyle]}>{placeholder}</Animated.Text>
      </Animated.View>
      <NativeTextInput
        onFocus={() => movePlaceholder('focus')}
        onBlur={() => movePlaceholder('blur')}
        ref={inputRef}
        style={styles.input}
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    height: 50,
    borderWidth: 0.5,
    // backgroundColor: 'gray',
    paddingTop: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    width: '100%',
  },
  placeholder: {
    position: 'relative',
  },
  text: {
    paddingHorizontal: 10,
  },
});

export default TextInput;
