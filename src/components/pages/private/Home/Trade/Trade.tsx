import React, {useEffect} from 'react';
import {useTheme, Text} from '@ui-kitten/components';
import Preloader from '../../../../loaders/Preloader';

import {DrawerNavigationProp} from '@react-navigation/drawer';
import DrawerTopNavigation from '../../../../navigation/DrawerTopNavigation';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {
  DrawerNavigator,
  TradeTopTabNavigator,
} from '../../../../../utils/navigation.types';

import Sales from './Tabs/Sales';
import Incomes from './Tabs/Incomes';
import Returnes from './Tabs/Returnes';

type Props = {
  navigation: DrawerNavigationProp<DrawerNavigator, 'Trade'>;
};

const TopTab = createMaterialTopTabNavigator<TradeTopTabNavigator>();

const Trade: React.FC<Props> = ({navigation}) => {
  useEffect(() => {
    navigation.setOptions({
      header: props => <DrawerTopNavigation {...props} divider={false} />,
    });
  }, []);

  const theme = useTheme();

  const renderLabel = (text: string, focused: boolean) => (
    <Text
      category="label"
      status={focused ? 'primary' : 'basic'}
      style={{textAlign: 'center'}}>
      {text}
    </Text>
  );

  return (
    <TopTab.Navigator
      initialRouteName="Sales"
      screenOptions={{
        lazy: true,
        lazyPlaceholder: () => <Preloader />,
        tabBarStyle: {backgroundColor: theme['background-basic-color-1']},
        tabBarPressColor: theme['color-primary-300'],
        tabBarIndicatorStyle: {backgroundColor: theme['color-primary-500']},
      }}>
      <TopTab.Screen
        name="Sales"
        component={Sales}
        options={{
          tabBarLabel: ({focused}) => renderLabel('Продажи', focused),
        }}
      />
      <TopTab.Screen
        name="Incomes"
        component={Incomes}
        options={{
          tabBarLabel: ({focused}) => renderLabel('Приходы', focused),
        }}
      />
      <TopTab.Screen
        name="Returns"
        component={Returnes}
        options={{
          tabBarLabel: ({focused}) => renderLabel('Возвраты', focused),
        }}
      />
    </TopTab.Navigator>
  );
};

export default Trade;
