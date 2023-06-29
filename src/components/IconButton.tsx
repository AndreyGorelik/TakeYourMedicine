import { StyleSheet, TouchableOpacity } from 'react-native';

const IconButton = ({ children, onPress }: { children: JSX.Element; onPress: () => void }) => {
  return (
    <TouchableOpacity style={styles.createButton} onPress={onPress} activeOpacity={0.6}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  createButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    width: 50,
    height: 50,
    borderRadius: 13,
    shadowColor: '#171717',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
});

export default IconButton;
