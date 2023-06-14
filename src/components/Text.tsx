import { Text as NativeText, StyleSheet, TextStyle } from 'react-native';

type TextVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5';

interface CustomText {
  children: string;
  variant?: TextVariant;
}

function Text({ children, variant, ...rest }: CustomText) {
  const settings: TextStyle = {
    fontSize: 16,
    marginVertical: 5,
    fontWeight: '400',
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
    color: '#003F5F',
    fontFamily: 'NunitoSans10pt-Regular',
    fontWeight: '400',
  },
});

export default Text;
