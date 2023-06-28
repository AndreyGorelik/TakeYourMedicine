import { Text as NativeText, StyleSheet, TextStyle } from 'react-native';

import useTheme from '../hooks/useTheme';

type TextVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'warning';

interface CustomText {
  children: string | number;
  variant?: TextVariant;
}

function Text({ children, variant, ...rest }: CustomText) {
  const { themeStyle } = useTheme();

  const settings: TextStyle = {
    fontSize: 17,
    marginVertical: 5,
    color: themeStyle.colors.text,
  };

  switch (variant) {
    case 'h1':
      settings.fontSize = 40;
      settings.marginVertical = 15;
      settings.fontWeight = '800';
      break;
    case 'h2':
      settings.fontSize = 30;
      settings.marginVertical = 13;
      settings.fontWeight = '800';
      break;
    case 'h3':
      settings.fontSize = 25;
      settings.marginVertical = 11;
      settings.fontWeight = '800';
      break;
    case 'h4':
      settings.fontSize = 21;
      settings.marginVertical = 11;
      settings.fontWeight = '800';
      break;
    case 'h5':
      settings.fontSize = 18;
      settings.marginVertical = 8;
      settings.fontWeight = '800';
      break;
    case 'h6':
      settings.fontSize = 15;
      settings.marginVertical = 6;
      settings.fontWeight = '800';
      break;
    case 'warning':
      settings.fontSize = 13;
      settings.marginVertical = 3;
      settings.marginBottom = 10;
      settings.fontWeight = '500';
      settings.color = 'red';
      break;

    default:
      break;
  }

  return (
    <NativeText style={[styles.text, settings]} {...rest}>
      {children}
    </NativeText>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'NunitoSans10pt-Regular',
    fontWeight: '400',
  },
});

export default Text;
