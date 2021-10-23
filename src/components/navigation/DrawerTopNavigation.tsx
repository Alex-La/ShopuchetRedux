import React from 'react';
import {Icon, TopNavigation, TopNavigationAction} from '@ui-kitten/components';
import {ImageProps} from 'react-native';
import {DrawerHeaderProps} from '@react-navigation/drawer';

const MenuIcon = (props?: Partial<ImageProps>) => (
  <Icon {...props} name="menu-outline" />
);

interface Props extends DrawerHeaderProps {}

const DrawerTopNavigation: React.FC<Props> = ({options, navigation}) => {
  const MenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={navigation.openDrawer} />
  );

  return <TopNavigation accessoryLeft={MenuAction} title={options.title} />;
};

export default DrawerTopNavigation;
