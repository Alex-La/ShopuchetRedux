import React, {useEffect} from 'react';
import {Layout, Text, useTheme} from '@ui-kitten/components';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import {StatusBar} from 'react-native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PrivateStackNavigator} from '../utils/navigation.types';

import Home from '../components/pages/private/Home/Home';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator<PrivateStackNavigator>();

const Private: React.FC = () => {
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
          initialRouteName="Home"
          screenOptions={{headerShown: false}}>
          <Stack.Group>
            <Stack.Screen name="Home" component={Home} />
          </Stack.Group>
        </Stack.Navigator>
      </Layout>
    </>
  );
};

export default Private;
