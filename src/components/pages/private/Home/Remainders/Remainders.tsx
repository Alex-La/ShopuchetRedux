import React, {useCallback, useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {
  Button,
  Divider,
  Icon,
  Input,
  Layout,
  List,
  Text,
  Tooltip,
} from '@ui-kitten/components';

import {useAppDispatch, useAppSelector} from '../../../../../redux';
import {even} from '../../../../../utils';
import {
  getRemainders,
  setRemainders,
} from '../../../../../redux/actions/private/remaindersActions';
import {useFocusEffect} from '@react-navigation/core';
import usePrevious from '../../../../../hooks/previous.hook';
import ListItem from './ListItem';

const Remainders: React.FC = () => {
  const dispatch = useAppDispatch();

  const tradePoint = useAppSelector(state => state.main.tradePoint);
  const remainders = useAppSelector(state => state.remainders.remainders);
  const loading = useAppSelector(state => state.fetch.loading);

  const prevTradePointId = usePrevious<number>(tradePoint?.gTochkaId);

  const [cnt, setCnt] = useState<string>('');
  const [filter, setFilter] = useState<string>('');

  const [visible, setVisible] = useState<boolean>(false);

  const toggle = () => setVisible(!visible);

  const fetchRemainders = useCallback(() => {
    if (tradePoint)
      dispatch(getRemainders(tradePoint.gTochkaId, Number(cnt), filter));
  }, [tradePoint, cnt, filter]);

  useFocusEffect(
    useCallback(() => {
      if (tradePoint?.gTochkaId && tradePoint.gTochkaId !== prevTradePointId)
        fetchRemainders();
    }, [tradePoint?.gTochkaId, prevTradePointId]),
  );

  return (
    <Layout style={styles.wrap}>
      <View style={{padding: 16}}>
        <Text style={{textAlign: 'center'}}>Фильтр</Text>
        <Input
          value={cnt}
          onChangeText={setCnt}
          keyboardType="number-pad"
          selectTextOnFocus
          style={{marginTop: 8}}
          placeholder="Остаток"
          accessoryRight={props => (
            <Tooltip
              placement={'bottom end'}
              anchor={() => (
                <TouchableOpacity onPress={toggle}>
                  <Icon {...props} name="info-outline" />
                </TouchableOpacity>
              )}
              visible={visible}
              onBackdropPress={() => setVisible(false)}>
              Показать товары с остатком меньше указанного
            </Tooltip>
          )}
        />
        <Input
          value={filter}
          onChangeText={setFilter}
          selectTextOnFocus
          style={{marginTop: 16}}
          placeholder="Товар"
        />
        <Button
          disabled={loading}
          onPress={fetchRemainders}
          style={{marginTop: 16}}>
          Поиск
        </Button>
      </View>
      <Divider />

      <View style={styles.tableHead}>
        <Text style={styles.item} appearance="hint">
          Товар
        </Text>
        <Text style={styles.remainder} appearance="hint">
          Остаток
        </Text>
      </View>
      <Divider />

      <List
        refreshing={loading}
        onRefresh={fetchRemainders}
        ItemSeparatorComponent={Divider}
        data={remainders}
        renderItem={ListItem}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },
  tableHead: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  item: {flex: 3},
  remainder: {flex: 1, textAlign: 'right'},
});

export default Remainders;
