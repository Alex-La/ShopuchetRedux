import {DrawerContentComponentProps} from '@react-navigation/drawer';
import {Drawer, DrawerItem} from '@ui-kitten/components';
import React from 'react';

interface Props extends DrawerContentComponentProps {}

const DrawerContent: React.FC<Props> = ({navigation, state}) => {
  return (
    <Drawer>
      <DrawerItem title="Выбрать торговую точку" />
      <DrawerItem title="Главная" />
    </Drawer>
  );
};

export default DrawerContent;
