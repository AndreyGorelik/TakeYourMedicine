import AsyncStorage from '@react-native-async-storage/async-storage';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import { useState } from 'react';
import { useColorScheme } from 'react-native';

const useTheme = () => {
  const theme = useColorScheme();
  const [themeColor, setThemeColor] = useState<string>('light');

  const changeTheme = () => {
    if (themeColor === 'light') {
      setThemeColor('dark');
      saveTheme('dark');
    } else {
      setThemeColor('light');
      saveTheme('light');
    }
  };

  const saveTheme = async (value: string) => {
    try {
      await AsyncStorage.setItem('themeMode', value);
    } catch (e) {
      return;
    }
  };

  const getTheme = async () => {
    try {
      const value = await AsyncStorage.getItem('themeMode');
      if (value) {
        return value;
      }
    } catch (e) {
      return;
    }
  };

  const setThemeToState = () => {
    getTheme().then((data) => {
      if (data === 'light' || data === 'dark') {
        setThemeColor(data);
      } else {
        setThemeColor(theme ? theme : 'light');
      }
    });
  };

  setThemeToState();

  if (themeColor === 'light') {
    return { darkMode: false, themeStyle: DefaultTheme, changeTheme };
  } else {
    return { darkMode: true, themeStyle: DarkTheme, changeTheme };
  }
};

export default useTheme;
