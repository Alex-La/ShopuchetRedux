import {DrawerContentComponentProps} from '@react-navigation/drawer';
import {
  Drawer,
  DrawerItem,
  Icon,
  IndexPath,
  Layout,
  Text,
  TopNavigationAction,
  useTheme,
} from '@ui-kitten/components';
import React, {useCallback, useContext, useState} from 'react';
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

const DrawerContent: React.FC<Props> = ({navigation}) => {
  const uiTheme = useTheme();
  const {theme, toggleTheme} = useContext(ThemeContext);

  const [index, setIndex] = useState<number>(1);

  const navToTradePoint = () => {
    navigation.navigate('TradePoint');
    navigation.closeDrawer();
  };
  const navToMain = () => {
    navigation.navigate('Main');
    setIndex(1);
  };
  const navToConReport = () => {
    navigation.navigate('ConReport');
    setIndex(2);
  };
  const navToTrade = () => {
    navigation.navigate('Trade');
    setIndex(3);
  };
  const navToReports = () => {
    navigation.navigate('Reports');
    setIndex(4);
  };
  const navToRemainders = () => {
    navigation.navigate('Remainders');
    setIndex(5);
  };
  const navToFriends = () => {
    navigation.navigate('Friends');
    setIndex(6);
  };
  const navToProfile = () => {
    navigation.navigate('Profile');
    setIndex(7);
  };

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
          selected={index === 7}
        />
        <DrawerItem title="Выход" accessoryLeft={LogoutIcon} />
      </>
    ),
    [uiTheme, index],
  );

  return (
    <Drawer
      header={renderHeader}
      footer={renderFooter}
      selectedIndex={new IndexPath(index)}>
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
