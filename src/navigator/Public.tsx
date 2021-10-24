import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {Layout, useTheme} from '@ui-kitten/components';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PublicStackNavigator} from '../utils/navigation.types';

import Login from '../components/pages/public/Login';
import Forgot from '../components/pages/public/Forgot';
import Registration from '../components/pages/public/Registration';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator<PublicStackNavigator>();

const Public: React.FC = () => {
  const theme = useTheme();
  const {top, bottom} = useSafeAreaInsets();

  useEffect(() => {
    changeNavigationBarColor(theme['color-basic-100'], true, true);
  }, []);

  return (
    <>
      <StatusBar
        backgroundColor={theme['color-basic-100']}
        barStyle="dark-content"
      />
      <Layout style={{paddingTop: top, paddingBottom: bottom, flex: 1}}>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Forgot" component={Forgot} />
          <Stack.Screen name="Registration" component={Registration} />
        </Stack.Navigator>
      </Layout>
    </>
  );
};

export default Public;
