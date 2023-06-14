import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface CustomButton {
  title: string;
  onPress: () => void;
  width?: number | string;
  backgroundColor?: string;
  disabled?: boolean;
}

function Button({ title, width, onPress, backgroundColor, disabled = false }: CustomButton) {
  return (
    <TouchableOpacity
      disabled={disabled}
      accessible
      accessibilityRole="button"
      style={[
        {
          width: width ? width : 150,
          backgroundColor: disabled ? 'gray' : backgroundColor || '#0099FF',
        },
        styles.button,
      ]}
      onPress={onPress}
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
