import {View, StyleSheet} from 'react-native';
import Text from '../components/Text';
import {Switch} from 'react-native-paper';
import {useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {languagesList} from '../constants/languages';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';

interface LangItem {
  label: string;
  value: string;
}

function SettingsPage({changeTheme}: {changeTheme: () => void}) {
  const {dark} = useTheme();
  const [darkThemeSwitch, setDarkThemeSwitch] = useState(dark ? true : false);
  const [value, setValue] = useState('en');
  const {t, i18n} = useTranslation();

  const switchTheme = () => {
    setDarkThemeSwitch(!darkThemeSwitch);
    changeTheme();
  };

  const changeLanguage = (item: any) => {
    setValue(item.value);
    i18n.changeLanguage(item.value);
  };

  return (
    <View style={styles.view}>
      <View style={styles.row}>
        <Text>{t('darkmode')}</Text>
        <Switch value={darkThemeSwitch} onValueChange={switchTheme} />
      </View>

      <View>
        <Text>Language</Text>
        <View>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={
              dark ? styles.selectedTextStyleDark : styles.selectedTextStyle
            }
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            containerStyle={dark ? styles.container : null}
            itemTextStyle={dark ? styles.itemText : null}
            data={languagesList}
            activeColor={"gray"}
            maxHeight={300}
            mode="modal"
            labelField="label"
            valueField="value"
            value={value}
            onChange={changeLanguage}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    padding: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  container: {
    backgroundColor: 'black',
  },
  iconContainer: {
    backgroundColor: "orange"
  },
  itemText: {
    color: 'white',
  },
  dropdown: {
    height: 50,
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  selectedTextStyleDark: {
    fontSize: 16,
    color: '#fff',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default SettingsPage;
