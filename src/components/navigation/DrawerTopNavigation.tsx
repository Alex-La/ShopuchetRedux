import React from 'react';
import {Divider, Icon, Layout, Text, useTheme} from '@ui-kitten/components';
import {ImageProps, StyleSheet, TouchableOpacity, View} from 'react-native';
import {DrawerHeaderProps} from '@react-navigation/drawer';
import {useAppSelector} from '../../redux';
import {RouteProp} from '@react-navigation/core';
import {
  DrawerNavigator,
  PrivateStackNavigator,
} from '../../utils/navigation.types';
import DatePicker from '../general/DatePicker';
import {setDate as reportsSetDate} from '../../redux/actions/private/reportsActions';
import {setDate as tradeSetDate} from '../../redux/actions/private/tradeActions';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

interface Props extends DrawerHeaderProps {}

const DrawerTopNavigation: React.FC<Props> = ({options, navigation, route}) => {
  const theme = useTheme();
  const name = (route as RouteProp<DrawerNavigator>).name;

  const {reportsIndex, tradeIndex} = useAppSelector(({reports, trade}) => ({
    reportsIndex: reports.index,
    tradeIndex: trade.index,
  }));

  const {reportsDate, tradeDate} = useAppSelector(({reports, trade}) => ({
    reportsDate: reports.date,
    tradeDate: reports.date,
  }));

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
          {name !== 'Profile' && name !== 'Friends' && subtitle && (
            <Text category="label" appearance="hint">
              {subtitle}
            </Text>
          )}
        </View>
        <View style={{marginLeft: 'auto'}}>
          {(name === 'Reports' || name === 'Trade') && (
            <DatePicker
              navigation={
                navigation as unknown as NativeStackNavigationProp<PrivateStackNavigator>
              }
              setDateAction={name === 'Reports' ? reportsSetDate : tradeSetDate}
              index={name === 'Reports' ? reportsIndex : tradeIndex}
              date={name === 'Reports' ? reportsDate : tradeDate}
            />
          )}
        </View>
      </Layout>
      {name !== 'Reports' && name !== 'Trade' && <Divider />}
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
