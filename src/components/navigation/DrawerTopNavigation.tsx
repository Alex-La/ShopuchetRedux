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
import Chart from '../icons/Chart';

const MenuIcon = (props?: Partial<ImageProps>) => (
  <Icon {...props} name="menu-outline" />
);

interface Props extends DrawerHeaderProps {}

const DrawerTopNavigation: React.FC<Props> = ({options, navigation, route}) => {
  const subtitle = useAppSelector(state => state.main.tradePoint?.name);

  const MenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={navigation.openDrawer} />
  );

  const ChartAction = () => (
    <TopNavigationAction icon={<Chart def={true} />} onPress={() => {}} />
  );

  return (
    <>
      <TopNavigation
        alignment="center"
        accessoryLeft={MenuAction}
        accessoryRight={route.name === 'Remainders' ? ChartAction : undefined}
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
