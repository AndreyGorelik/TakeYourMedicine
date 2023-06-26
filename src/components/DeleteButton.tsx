import { StyleSheet, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface DeleteBtn {
  deleteItem: () => void;
}

function DeleteButton({ deleteItem }: DeleteBtn) {
  return (
    <TouchableOpacity style={styles.view} onPress={deleteItem}>
      <MaterialCommunityIcons name="delete-outline" size={24} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  view: {
    marginRight: 10,
  },
});

export default DeleteButton;
