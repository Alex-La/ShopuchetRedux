import {
  IndexPath,
  Layout,
  MenuItem,
  OverflowMenu,
  Text,
  useTheme,
} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Clock from '../icons/Clock';
import Day from '../icons/Day';
import Month from '../icons/Month';
import Week from '../icons/Week';

type Item = {
  key: number;
  title: string;
  icon: React.ReactElement;
};

const items: Item[] = [
  {key: 0, title: 'День', icon: <Day />},
  {key: 1, title: 'Неделя', icon: <Week />},
  {key: 2, title: 'Месяц', icon: <Month />},
  {key: 3, title: 'Любой срок', icon: <Clock />},
];

const DatePicker: React.FC = () => {
  const theme = useTheme();

  const [selectedIndex, setSelectedIndex] = React.useState<IndexPath>(
    new IndexPath(0),
  );
  const [visible, setVisible] = React.useState<boolean>(false);

  const onItemSelect = (index: IndexPath) => {
    setSelectedIndex(index);
    setVisible(false);
  };

  const RenderAnchor = () => {
    return (
      <TouchableOpacity
        style={{borderRadius: 12}}
        onPress={() => setVisible(true)}>
        <Layout style={styles.wrap}>
          {items[selectedIndex.row].icon}
          <Text status="primary" style={{marginLeft: 10}}>
            {items[selectedIndex.row].title}
          </Text>
        </Layout>
      </TouchableOpacity>
    );
  };

  return (
    <OverflowMenu
      anchor={RenderAnchor}
      visible={visible}
      selectedIndex={selectedIndex}
      onSelect={onItemSelect}
      onBackdropPress={() => setVisible(false)}
      backdropStyle={{backgroundColor: theme['color-primary-transparent-100']}}>
      {items.map(item => (
        <MenuItem key={item.key} accessoryLeft={item.icon} title={item.title} />
      ))}
    </OverflowMenu>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 8,
  },
});

export default DatePicker;
