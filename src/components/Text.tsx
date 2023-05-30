import {Text as RNText} from 'react-native-paper';
import {useTheme} from '@react-navigation/native';

function Text({children}: {children: string}) {
  const {colors} = useTheme();

  return <RNText style={{color: colors.text}}>{children}</RNText>;
}

export default Text;
