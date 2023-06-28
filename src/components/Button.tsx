import { Keyboard, StyleSheet, Text, TouchableOpacity } from 'react-native';

interface CustomButton {
  title: string;
  onPress: () => void;
  width?: number | string;
  backgroundColor?: string;
  disabled?: boolean;
}

function Button({ title, width, onPress, backgroundColor, disabled = false }: CustomButton) {
  const handlePress = () => {
    Keyboard.dismiss();
    onPress();
  };
  return (
    <TouchableOpacity
      disabled={disabled}
      accessible
      accessibilityRole="button"
      style={[
        {
          width: width ? width : '100%',
          backgroundColor: disabled ? 'gray' : backgroundColor || '#0099FF',
        },
        styles.button,
      ]}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 13,
    flex: 1,
    maxHeight: 40,
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    paddingVertical: 10,
  },
});

export default Button;
