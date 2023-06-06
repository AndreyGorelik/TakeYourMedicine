import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface CustomButton {
  title: string;
  onPress: () => void;
  width?: number | string;
}

function Button({ title, width, onPress, ...rest }: CustomButton) {
  return (
    <TouchableOpacity
      accessible
      accessibilityRole="button"
      style={[{ width: width ? width : 150 }, styles.button]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.text} {...rest}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    elevation: 3,
    backgroundColor: 'black',
    marginVertical: 5,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});

export default Button;
