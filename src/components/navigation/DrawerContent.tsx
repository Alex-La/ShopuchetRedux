import {DrawerContentComponentProps} from '@react-navigation/drawer';
import {
  Drawer,
  DrawerItem,
  Icon,
  Layout,
  Text,
  Toggle,
  TopNavigation,
  TopNavigationAction,
  useTheme,
} from '@ui-kitten/components';
import React, {useCallback, useContext} from 'react';
import {ImageProps, StyleSheet, View} from 'react-native';
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
      <DrawerItem title="Выбрать торговую точку" accessoryRight={ForwardIcon} />
      <DrawerItem title="Главная" />
      <DrawerItem title="Сводный отчет" />
      <DrawerItem title="Торговля" />
      <DrawerItem title="Отчеты" />
      <DrawerItem title="Товарные остатки" />
      <DrawerItem title="Список друзей" />
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
