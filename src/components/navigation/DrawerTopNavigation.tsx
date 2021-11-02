import React from 'react';
import {
  Divider,
  Icon,
  TopNavigation,
  TopNavigationAction,
  TopNavigationProps,
} from '@ui-kitten/components';
import {ImageProps} from 'react-native';
import {DrawerHeaderProps} from '@react-navigation/drawer';

const MenuIcon = (props?: Partial<ImageProps>) => (
  <Icon {...props} name="menu-outline" />
);

interface Props extends DrawerHeaderProps, TopNavigationProps {
  divider?: boolean;
}

const DrawerTopNavigation: React.FC<Props> = ({
  options,
  navigation,
  subtitle,
  accessoryRight,
  divider = true,
}) => {
  const MenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={navigation.openDrawer} />
  );

  return (
    <>
      <TopNavigation
        alignment="center"
        accessoryLeft={MenuAction}
        accessoryRight={accessoryRight}
        title={options.title}
        subtitle={subtitle}
      />
      {divider && <Divider />}
    </>
  );
};

export default DrawerTopNavigation;
