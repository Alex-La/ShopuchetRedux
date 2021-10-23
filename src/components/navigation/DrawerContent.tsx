import {DrawerContentComponentProps} from '@react-navigation/drawer';
import {Drawer, DrawerItem, IndexPath} from '@ui-kitten/components';
import React from 'react';

interface Props extends DrawerContentComponentProps {}

const DrawerContent: React.FC<Props> = ({navigation, state}) => {
  return (
    <Drawer
      selectedIndex={new IndexPath(state.index)}
      onSelect={index => navigation.navigate(state.routeNames[index.row])}>
      <DrawerItem title="Главная" />
    </Drawer>
  );
};

export default DrawerContent;
