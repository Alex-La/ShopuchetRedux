import React, {useCallback, useState} from 'react';
import {ListRenderItemInfo, StyleSheet, View} from 'react-native';
import {Divider, Layout, List, Text} from '@ui-kitten/components';

import Filter from './Filter';

import {useAppDispatch, useAppSelector} from '../../../../../redux';
import {useFocusEffect} from '@react-navigation/core';
import usePrevious from '../../../../../hooks/previous.hook';
import {
  getRemainders,
  setRemainders,
} from '../../../../../redux/actions/private/remaindersActions';
import {Remainder} from '../../../../../utils/api.types';
import {even} from '../../../../../utils';

const Remainders: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentGTochkaId = useAppSelector(
    state => state.main.tradePoint?.gTochkaId,
  );
  const prevGTochkaId = usePrevious<number>(currentGTochkaId);
  const remainders = useAppSelector(state => state.remainders.remainders);
  const loading = useAppSelector(state => state.fetch.loading);

  const [cnt, setCnt] = useState<string>('');
  const [filter, setFilter] = useState<string>('');

  const loadRemainders = useCallback(() => {
    if (currentGTochkaId)
      dispatch(getRemainders(currentGTochkaId, 30, Number(cnt), filter));
  }, [currentGTochkaId, cnt, filter]);

  useFocusEffect(
    useCallback(() => {
      if (currentGTochkaId) loadRemainders();
      return () => dispatch(setRemainders([]));
    }, [currentGTochkaId, prevGTochkaId]),
  );

  const keyExtractor = useCallback<(item: Remainder) => string>(
    item => item.gProductId.toString(),
    [],
  );

  const RenderItem = useCallback<
    (props: ListRenderItemInfo<Remainder>) => JSX.Element
  >(
    ({item, index}) => {
      const level = even(index) ? '2' : '1';
      return (
        <Layout key={index} level={level} style={styles.tableHead}>
          <View style={{flex: 4}}>
            <Text>{item.groupName}</Text>
            <Text category="c1" appearance="hint" numberOfLines={1}>
              {item.name}
            </Text>
          </View>
          <View style={styles.tableRemainder}>
            <Text category="c1" appearance="hint">
              {item.amount.toFixed(1)}
            </Text>
          </View>
        </Layout>
      );
    },
    [remainders],
  );

  return (
    <Layout style={styles.wrap}>
      <Filter cnt={cnt} setCnt={setCnt} filter={filter} setFilter={setFilter} />
      <Divider />

      <View style={styles.tableHead}>
        <Text appearance="hint" style={{flex: 4}}>
          Товар
        </Text>
        <Text appearance="hint" style={styles.tableHeadRemainder}>
          Остаток
        </Text>
      </View>

      <Divider />

      <List
        refreshing={loading}
        onRefresh={loadRemainders}
        data={remainders}
        renderItem={RenderItem}
        keyExtractor={keyExtractor}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },
  tableHead: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  tableHeadRemainder: {flex: 1, textAlign: 'right'},
  tableRemainder: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  item: {flex: 3},
  remainder: {flex: 1, textAlign: 'right'},
});

export default Remainders;
