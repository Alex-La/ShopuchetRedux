import React from 'react';
import {Layout} from '@ui-kitten/components';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PrivateStackNavigator} from '../utils/navigation.types';

import Home from '../components/pages/private/Home/Home';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator<PrivateStackNavigator>();

const Private: React.FC = () => {
  const {top, bottom} = useSafeAreaInsets();
  return (
    <Layout style={{paddingTop: top, paddingBottom: bottom, flex: 1}}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false}}>
        <Stack.Group>
          <Stack.Screen name="Home" component={Home} />
        </Stack.Group>
      </Stack.Navigator>
    </Layout>
  );
};

export default Private;
