import { View, StyleSheet, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';

const FloatingButton = ({onPress}:{onPress: () => void}) => {
    return (
        <TouchableOpacity style={styles.createButton} onPress={onPress}>
            <Icon
                name='plus'
                size={25}
                color='#fff'
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    createButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
        width: 50,
        height: 50,
        borderRadius: 50,
        position: "absolute",
        bottom: 20,
        right: 20
    },
});

export default FloatingButton;