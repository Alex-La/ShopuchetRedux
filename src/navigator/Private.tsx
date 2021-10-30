import React, {useEffect} from 'react';
import {Layout} from '@ui-kitten/components';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Preloader from '../components/loaders/Preloader';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PrivateStackNavigator} from '../utils/navigation.types';

import Home from '../components/pages/private/Home/Home';
import TradePoint from '../components/pages/private/TradePoint/TradePoint';
import StackTopNavigation from '../components/navigation/StackTopNavigation';

import {useAppDispatch, useAppSelector} from '../redux';
import {getPrivateData} from '../redux/actions/private/privateActions';

const Stack = createNativeStackNavigator<PrivateStackNavigator>();

const Private: React.FC = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.fetch.appLoading);

  const {top, bottom} = useSafeAreaInsets();

  useEffect(() => {
    dispatch(getPrivateData());
  }, []);

  if (loading) return <Preloader />;

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
