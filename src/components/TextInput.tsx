import { useRef } from 'react';
import { StyleSheet, TextInput as NativeTextInput, View } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

import useTheme from '../hooks/useTheme';

interface TextInputCustom {
  placeholder: string;
  value: string;
  [x: string]: unknown;
}

type focusAndBlur = 'focus' | 'blur';

const ANIMATION_DURATION = 150;

const TextInput = ({ placeholder, value, ...rest }: TextInputCustom) => {
  const { themeStyle } = useTheme();
  const inputRef = useRef<NativeTextInput>(null);
  const top = useSharedValue(15);
  const labelFontSize = useSharedValue(17);
  const movePlaceholder = (status: focusAndBlur) => {
    if (status === 'focus') {
      top.value = withTiming(-10, { duration: ANIMATION_DURATION });
      labelFontSize.value = withTiming(12, { duration: ANIMATION_DURATION });
    } else {
      if (!value) {
        top.value = withTiming(15, { duration: ANIMATION_DURATION });
        labelFontSize.value = withTiming(17, { duration: ANIMATION_DURATION });
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
        <Animated.Text
          style={[{ color: themeStyle.colors.text }, styles.text, textReanimatedStyle]}
        >
          {placeholder}
        </Animated.Text>
      </Animated.View>
      <NativeTextInput
        onFocus={() => movePlaceholder('focus')}
        onBlur={() => movePlaceholder('blur')}
        ref={inputRef}
        value={value}
        style={[
          { color: themeStyle.colors.text, borderColor: themeStyle.colors.text },
          styles.input,
        ]}
        placeholderTextColor={'white'}
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative',
    marginVertical: 10,
  },
  input: {
    borderBottomWidth: 0.5,
    paddingVertical: 10,
    fontSize: 17,
    paddingHorizontal: 0,
    fontFamily: 'NunitoSans10pt-Regular',
  },
  placeholder: {
    position: 'absolute',
    fontFamily: 'NunitoSans10pt-Regular',
  },
  text: {
    padding: 0,
    margin: 0,
  },
});

export default TextInput;
