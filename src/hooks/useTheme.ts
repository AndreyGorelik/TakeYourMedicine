import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { useColorScheme } from 'react-native';

import { useAppSelector } from './redux-hooks';

const useTheme = () => {
  const theme = useColorScheme();
  const [themeColor, setThemeColor] = useState<string>('light');

  const storeTheme = useAppSelector((state) => state.themeSlice);

  const DefaultTheme = {
    colors: {
      background: '#F1F5FF',
      border: '#F1F5FF',
      card: '#F1F5FF',
      notification: 'rgb(255, 69, 58)',
      primary: '#003F5F',
      text: '#003F5F',
      back: '#FFF',
    },
    dark: storeTheme.darkMode,
  };

  const DarkTheme = {
    colors: {
      background: '#003F5F',
      border: '#002d44',
      card: '#003F5F',
      notification: 'white',
      primary: '#FFF',
      text: 'white',
      back: '#002d44',
    },
    dark: storeTheme.darkMode,
  };

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
