import {useColorScheme} from 'react-native';
import {useState, useEffect} from 'react';
import {DefaultTheme, DarkTheme} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useTheme = () => {
  const theme = useColorScheme();
  const [themeColor, useThemeColor] = useState<string>('light');

  useEffect(()=>{
    getTheme().then(data => {
      if (data === 'light' || data === 'dark') {
        useThemeColor(data)
      } else {
        useThemeColor(theme ? theme : 'light')
      }
    })
  },[themeColor])

  const changeTheme = () => {
    if (themeColor === 'light') {
      useThemeColor('dark');
      saveTheme('dark');
    } else {
      useThemeColor('light');
      saveTheme('light');
    }
  };

  const saveTheme = async (value: string) => {
    try {
      await AsyncStorage.setItem('themeMode', value);
    } catch (e) {
      console.log(e);
    }
  };

  const getTheme = async () => {
    try {
      const value = await AsyncStorage.getItem('themeMode');
      if (value) {
        return value
      }
    } catch (e) {
      console.log(e);
    }
  };

  if (themeColor === 'light') {
    return {darkMode: false, themeStyle: DefaultTheme, changeTheme};
  } else {
    return {darkMode: true, themeStyle: DarkTheme, changeTheme};
  }
};

export default useTheme;
