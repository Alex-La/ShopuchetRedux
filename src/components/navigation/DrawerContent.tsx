import {DrawerContentComponentProps} from '@react-navigation/drawer';
import {Drawer, DrawerItem, Icon, useTheme} from '@ui-kitten/components';
import React from 'react';
import {ImageProps, View} from 'react-native';

const ForwardIcon = (props?: Partial<ImageProps>) => (
  <Icon {...props} name="arrow-ios-forward" />
);

const PersonIcon = (props?: Partial<ImageProps>) => (
  <Icon {...props} name="person-outline" />
);

const LogoutIcon = (props?: Partial<ImageProps>) => (
  <Icon {...props} name="log-out-outline" />
);

interface Props extends DrawerContentComponentProps {}

const DrawerContent: React.FC<Props> = ({navigation, state}) => {
  const theme = useTheme();

  return (
    <Drawer
      footer={() => (
        <>
          <DrawerItem
            title="Профиль"
            accessoryLeft={PersonIcon}
            style={{
              borderBottomWidth: 1,
              borderBottomColor: theme['color-basic-300'],
            }}
          />
          <DrawerItem title="Выход" accessoryLeft={LogoutIcon} />
        </>
      )}>
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

export default DrawerContent;
