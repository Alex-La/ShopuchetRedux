import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {ListRenderItemInfo, StyleSheet, View} from 'react-native';
import {Divider, Layout, List, Text} from '@ui-kitten/components';

import Filter from './Filter';

import {useAppDispatch, useAppSelector} from '../../../../../redux';
import {useFocusEffect} from '@react-navigation/core';
import usePrevious from '../../../../../hooks/previous.hook';
import {
  clearRemainders,
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
  const remainders = useAppSelector(state => state.remainders.remainders);
  const loading = useAppSelector(state => state.remainders.loading);

  const [cnt, setCnt] = useState<string>('');
  const [filter, setFilter] = useState<string>('');
  const [_, setCurrnetPage] = useState<number>(0);

  const loadRemainders = useCallback(
    (loading: boolean, loadMore: boolean, currentPage: number = 0) => {
      if (currentGTochkaId)
        dispatch(
          getRemainders(
            loading,
            loadMore,
            currentGTochkaId,
            currentPage,
            Number(cnt),
            filter,
          ),
        );
    },
    [currentGTochkaId, cnt, filter],
  );

  useFocusEffect(
    useCallback(() => {
      if (currentGTochkaId) loadRemainders(true, false);
      return () => {
        setCurrnetPage(0);
        dispatch(clearRemainders());
      };
    }, [currentGTochkaId]),
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

  const handelSearch = () => {
    setCurrnetPage(0);
    loadRemainders(true, false, 0);
  };

  const handelRefresh = () => {
    setCurrnetPage(0);
    loadRemainders(true, false, 0);
  };

  const handleEndReached = () =>
    setCurrnetPage(page => {
      const newPage = page + 1;
      loadRemainders(false, true, newPage);
      return newPage;
    });

  const ListHeaderComponent = useMemo(
    () => (
      <Layout>
        <Filter
          cnt={cnt}
          setCnt={setCnt}
          filter={filter}
          setFilter={setFilter}
          handleSearch={handelSearch}
        />
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
      </Layout>
    ),
    [setCnt, setFilter, cnt, filter],
  );

  return (
    <List
      refreshing={loading}
      onRefresh={handelRefresh}
      ListHeaderComponent={ListHeaderComponent}
      data={remainders}
      renderItem={RenderItem}
      onEndReached={handleEndReached}
    />
  );
};

const styles = StyleSheet.create({
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
