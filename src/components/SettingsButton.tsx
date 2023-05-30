import Icon from 'react-native-vector-icons/FontAwesome';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@react-navigation/native';

const SettingsButton = () => {
    const navigation = useNavigation();
    const {dark} = useTheme();
    
    return (
        <View style={{ marginRight: 10 }}>
            <Icon name="gear"
                size={24}
                color={dark ? "gray" : "black"}
                onPress={() => navigation.navigate('Settings' as never)} />
        </View>

    )
}

export default SettingsButton;
