import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {useTheme} from '@ui-kitten/components';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PublicStackNavigator} from '../utils/navigation.types';

import Login from '../pages/public/Login';
import Forgot from '../pages/public/Forgot';
import Registration from '../pages/public/Registration';

const Stack = createNativeStackNavigator<PublicStackNavigator>();

const Public: React.FC = () => {
  const theme = useTheme();

  useEffect(() => {
    changeNavigationBarColor(theme['color-basic-100'], true, true);
  }, []);

  return (
    <>
      <StatusBar
        backgroundColor={theme['color-basic-100']}
        barStyle="dark-content"
      />
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Forgot" component={Forgot} />
        <Stack.Screen name="Registration" component={Registration} />
      </Stack.Navigator>
    </>
  );
};

export default Public;
