import React, {Fragment} from 'react';
import {
  Divider,
  Icon,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import {ImageProps} from 'react-native';
import {DrawerHeaderProps} from '@react-navigation/drawer';
import {useAppSelector} from '../../redux';
import {RouteProp} from '@react-navigation/core';
import {DrawerNavigator} from '../../utils/navigation.types';

const MenuIcon = (props?: Partial<ImageProps>) => (
  <Icon {...props} name="menu-outline" />
);

interface Props extends DrawerHeaderProps {
  divider?: boolean;
}

const DrawerTopNavigation: React.FC<Props> = ({options, navigation, route}) => {
  const name = (route as RouteProp<DrawerNavigator>).name;

  const subtitle = useAppSelector(state => state.main.tradePoint?.name);

  const MenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={navigation.openDrawer} />
  );

  return (
    <>
      <TopNavigation
        alignment="center"
        accessoryLeft={MenuAction}
        title={options.title}
        subtitle={
          name === 'Profile' || name === 'Friends' ? undefined : subtitle
        }
      />
      {name === 'Reports' || name === 'Trade' ? <Fragment /> : <Divider />}
    </>
  );
};

export default DrawerTopNavigation;
