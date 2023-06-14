import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const FloatingButton = ({ onPress }: { onPress: () => void }) => {
  return (
    <TouchableOpacity style={styles.createButton} onPress={onPress}>
      <Icon name="plus" size={25} color="#fff" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  createButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0099FF',
    width: 50,
    height: 50,
    borderRadius: 13,
    position: 'absolute',
    bottom: 79,
    right: 20,
    zIndex: 999,
    shadowColor: '#171717',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
});

export default FloatingButton;
