import {
  IndexPath,
  Layout,
  MenuItem,
  OverflowMenu,
  Text,
  useTheme,
} from '@ui-kitten/components';
import React, {useEffect} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useAppDispatch} from '../../redux';
import {SetDateAction} from '../../redux/types/private/reports.types';
import {DateRange, getDateRangeByIndex} from '../../utils';

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

type Props = {
  index: number;
  setDateAction: (index: number, date: DateRange) => SetDateAction;
};

const DatePicker: React.FC<Props> = ({index, setDateAction}) => {
  const theme = useTheme();

  const dispatch = useAppDispatch();

  const [selectedIndex, setSelectedIndex] = React.useState<IndexPath>(
    new IndexPath(0),
  );

  useEffect(() => {
    setSelectedIndex(new IndexPath(index));
  }, [index]);

  const [visible, setVisible] = React.useState<boolean>(false);

  const onItemSelect = (index: IndexPath) => {
    dispatch(setDateAction(index.row, getDateRangeByIndex(index.row)));
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
