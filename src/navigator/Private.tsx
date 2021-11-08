import React from 'react';
import {Layout} from '@ui-kitten/components';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PrivateStackNavigator} from '../utils/navigation.types';

import StackTopNavigation from '../components/navigation/StackTopNavigation';

import Home from '../components/pages/private/Home/Home';
import TradePoint from '../components/pages/private/TradePoint/TradePoint';
import TradeOptions from '../components/pages/private/TradeOptions/TradeOptions';
import AddProduct from '../components/pages/private/AddProduct/AddProduct';
import AddFriendModal from '../components/modals/AddFriendModal';
import DatePickerModal from '../components/modals/DatePickerModal';
import DeleteTradeModal from '../components/modals/DeleteTradeModal';

const Stack = createNativeStackNavigator<PrivateStackNavigator>();

const Private: React.FC = () => {
  const {top, bottom} = useSafeAreaInsets();

  return (
    <Layout style={{paddingTop: top, paddingBottom: bottom, flex: 1}}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Group
          screenOptions={{header: props => <StackTopNavigation {...props} />}}>
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
          <Stack.Screen name="TradeOptions" component={TradeOptions} />
          <Stack.Screen
            name="AddProduct"
            component={AddProduct}
            options={{title: 'Добавить товар'}}
          />
        </Stack.Group>
        <Stack.Group
          screenOptions={{
            presentation: 'transparentModal',
            headerShown: false,
          }}>
          <Stack.Screen name="AddFriendModal" component={AddFriendModal} />
          <Stack.Screen name="DatePickerModal" component={DatePickerModal} />
          <Stack.Screen name="DeleteTradeModal" component={DeleteTradeModal} />
        </Stack.Group>
      </Stack.Navigator>
    </Layout>
  );
};

export default Private;
