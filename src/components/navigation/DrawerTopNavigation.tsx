import React from 'react';
import {
  Divider,
  Icon,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import {ImageProps} from 'react-native';
import {DrawerHeaderProps} from '@react-navigation/drawer';

import {useAppSelector} from '../../redux';

const MenuIcon = (props?: Partial<ImageProps>) => (
  <Icon {...props} name="menu-outline" />
);

interface Props extends DrawerHeaderProps {}

const DrawerTopNavigation: React.FC<Props> = ({options, navigation, route}) => {
  const subtitle = useAppSelector(state => state.private.tradePoint.name);

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
          route.name !== 'Friends' && route.name !== 'Profile'
            ? subtitle
            : undefined
        }
      />
      {route.name !== 'Trade' && route.name !== 'Reports' && <Divider />}
    </>
  );
};

export default DrawerTopNavigation;
