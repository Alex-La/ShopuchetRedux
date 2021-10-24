import {DrawerContentComponentProps} from '@react-navigation/drawer';
import {
  Drawer,
  DrawerItem,
  Icon,
  Layout,
  Text,
  TopNavigationAction,
  useTheme,
} from '@ui-kitten/components';
import React, {useCallback, useContext} from 'react';
import {ImageProps, StyleSheet} from 'react-native';
import ThemeContext from '../../context/ThemeContext';

const ForwardIcon = (props?: Partial<ImageProps>) => (
  <Icon {...props} name="arrow-ios-forward" />
);

const PersonIcon = (props?: Partial<ImageProps>) => (
  <Icon {...props} name="person-outline" />
);

const LogoutIcon = (props?: Partial<ImageProps>) => (
  <Icon {...props} name="log-out-outline" />
);

const SunIcon = (props?: Partial<ImageProps>) => (
  <Icon {...props} name="sun-outline" />
);

const MoonIcon = (props?: Partial<ImageProps>) => (
  <Icon {...props} name="moon-outline" />
);

interface Props extends DrawerContentComponentProps {}

const DrawerContent: React.FC<Props> = ({navigation, state}) => {
  const uiTheme = useTheme();
  const {theme, toggleTheme} = useContext(ThemeContext);

  const navToTradePoint = () => navigation.navigate('TradePoint');
  const navToMain = () => navigation.navigate('Main');
  const navToConReport = () => navigation.navigate('ConReport');
  const navToTrade = () => navigation.navigate('Trade');
  const navToReports = () => navigation.navigate('Reports');
  const navToRemainders = () => navigation.navigate('Remainders');
  const navToFriends = () => navigation.navigate('Friends');
  const navToProfile = () => navigation.navigate('Profile');

  const renderHeader = useCallback(
    () => (
      <Layout level="2" style={styles.header}>
        <Text category="h6">Shopuchet</Text>
        <TopNavigationAction
          icon={theme === 'light' ? SunIcon : MoonIcon}
          onPress={toggleTheme}
        />
      </Layout>
    ),
    [theme, toggleTheme],
  );

  const renderFooter = useCallback(
    () => (
      <>
        <DrawerItem
          onPress={navToProfile}
          title="Профиль"
          accessoryLeft={PersonIcon}
          style={{
            borderBottomWidth: 1,
            borderBottomColor: uiTheme['background-basic-color-3'],
          }}
        />
        <DrawerItem title="Выход" accessoryLeft={LogoutIcon} />
      </>
    ),
    [uiTheme],
  );

  return (
    <Drawer header={renderHeader} footer={renderFooter}>
      <DrawerItem
        title="Выбрать торговую точку"
        accessoryRight={ForwardIcon}
        onPress={navToTradePoint}
      />
      <DrawerItem title="Главная" onPress={navToMain} />
      <DrawerItem title="Сводный отчет" onPress={navToConReport} />
      <DrawerItem title="Торговля" onPress={navToTrade} />
      <DrawerItem title="Отчеты" onPress={navToReports} />
      <DrawerItem title="Товарные остатки" onPress={navToRemainders} />
      <DrawerItem title="Список друзей" onPress={navToFriends} />
    </Drawer>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 18,
    paddingRight: 5,
  },
});

export default DrawerContent;
