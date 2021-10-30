import React from 'react';
import {Layout} from '@ui-kitten/components';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PrivateStackNavigator} from '../utils/navigation.types';

import Home from '../components/pages/private/Home/Home';
import TradePoint from '../components/pages/private/TradePoint/TradePoint';
import StackTopNavigation from '../components/navigation/StackTopNavigation';

const Stack = createNativeStackNavigator<PrivateStackNavigator>();

const Private: React.FC = () => {
  const {top, bottom} = useSafeAreaInsets();

  return (
    <Layout style={{paddingTop: top, paddingBottom: bottom, flex: 1}}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{header: props => <StackTopNavigation {...props} />}}>
        <Stack.Group>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="TradePoint"
            component={TradePoint}
            options={{title: 'Торговая точка'}}
          />
        </Stack.Group>
      </Stack.Navigator>
    </Layout>
  );
};

export default Private;
