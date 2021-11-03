import React, {Fragment} from 'react';
import {
  Divider,
  Icon,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
  useTheme,
} from '@ui-kitten/components';
import {ImageProps, StyleSheet, TouchableOpacity, View} from 'react-native';
import {DrawerHeaderProps} from '@react-navigation/drawer';
import {useAppSelector} from '../../redux';
import {RouteProp} from '@react-navigation/core';
import {DrawerNavigator} from '../../utils/navigation.types';
import DatePicker from '../general/DatePicker';

interface Props extends DrawerHeaderProps {}

const DrawerTopNavigation: React.FC<Props> = ({options, navigation, route}) => {
  const theme = useTheme();
  const name = (route as RouteProp<DrawerNavigator>).name;

  const subtitle = useAppSelector(state => state.main.tradePoint?.name);

  const MenuIcon = (props?: Partial<ImageProps>) => (
    <Icon {...props} name="menu-outline" fill={theme['text-basic-color']} />
  );

  return (
    <>
      <Layout style={styles.wrap}>
        <TouchableOpacity onPress={navigation.openDrawer}>
          <MenuIcon width={25} height={25} />
        </TouchableOpacity>
        <View style={{marginLeft: 16}}>
          <Text category="s1">{options.title}</Text>
          {name !== 'Profile' && name !== 'Friends' && (
            <Text category="label" appearance="hint">
              {subtitle}
            </Text>
          )}
        </View>
      </Layout>
      <Divider />
    </>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
});

export default DrawerTopNavigation;
