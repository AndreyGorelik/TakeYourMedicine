import { useTheme } from '@react-navigation/native';
import { Text as RNText } from 'react-native-paper';

function Text({ children }: { children: string }) {
  const { colors } = useTheme();

  return <RNText style={{ color: colors.text }}>{children}</RNText>;
}

export default Text;
