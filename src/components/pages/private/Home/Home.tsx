import React from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerNavigator} from '../../../../utils/navigation.types';

import Main from './Main/Main';
import DrawerTopNavigation from '../../../navigation/DrawerTopNavigation';
import DrawerContent from '../../../navigation/DrawerContent';

const Drawer = createDrawerNavigator<DrawerNavigator>();

const Home: React.FC = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Main"
      screenOptions={{header: props => <DrawerTopNavigation {...props} />}}
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen
        name="Main"
        component={Main}
        options={{title: 'Главная'}}
      />
    </Drawer.Navigator>
  );
};

export default Home;
