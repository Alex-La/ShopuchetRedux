import {useFocusEffect} from '@react-navigation/core';
import {Divider, Layout, Text} from '@ui-kitten/components';
import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import usePrevious from '../../../../../../hooks/previous.hook';
import {useAppDispatch, useAppSelector} from '../../../../../../redux';
import {
  getTopSales,
  setReduce,
} from '../../../../../../redux/actions/private/reportsActions';
import {TAB_TYPES} from '../../../../../../redux/types/private/reports.types';
import {getColor} from '../../../../../../utils';
import RefreshScrollView from '../../../../../loaders/RefreshScrollView';
import DateRangeAndSort from '../DateRangeAndSort';
import PieChart from '../PieChart';

const TopSellingProducts: React.FC = () => {
  const dispatch = useAppDispatch();
  const date = useAppSelector(state => state.reports.date);
  const reduce = useAppSelector(state => state.reports.tabs.topSales.reduce);
  const data = useAppSelector(state => state.reports.tabs.topSales.data);
  const loading = useAppSelector(state => state.reports.tabs.topSales.loading);
  const currentGTochkaid = useAppSelector(
    state => state.main.tradePoint?.gTochkaId,
  );
  const prevGTochkaId = usePrevious<number>(currentGTochkaid);
  const prevDatebegin = usePrevious<Date>(date.datebegin);
  const prevDateend = usePrevious<Date>(date.dateend);

  const loadTopSales = useCallback(
    (descending: boolean) => {
      if (currentGTochkaid)
        dispatch(
          getTopSales(
            currentGTochkaid,
            date.datebegin,
            date.dateend,
            descending,
          ),
        );
    },
    [currentGTochkaid, date, reduce],
  );

  useFocusEffect(
    useCallback(() => {
      if (currentGTochkaid) {
        if (
          currentGTochkaid !== prevGTochkaId ||
          date.datebegin !== prevDatebegin ||
          date.dateend !== prevDateend
        )
          loadTopSales(!reduce);
      }
    }, [currentGTochkaid, prevGTochkaId, date, prevDateend, prevDatebegin]),
  );

  const handleRefresh = () => loadTopSales(!reduce);
  const handleReduce = () => {
    dispatch(setReduce(!reduce, TAB_TYPES.TOP_SALES));
    loadTopSales(reduce);
  };

  const ListHeader = () => (
    <Layout>
      <DateRangeAndSort date={date} reduce={reduce} setReduce={handleReduce} />
      <Divider />
      <View style={{padding: 16}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text appearance="hint">Продано товаров:</Text>
          <Text status="primary">{data.head.cnt}</Text>
        </View>
        <View
          style={{
            marginTop: 14,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text appearance="hint">На сумму:</Text>
          <Text status="primary">{data.head.summ?.toFixed(2)}</Text>
        </View>
      </View>
      <Divider />
    </Layout>
  );

  return (
    <Layout style={{flex: 1}}>
      <RefreshScrollView refreshing={loading} onRefresh={handleRefresh}>
        <ListHeader />
        <View style={{padding: 16}}>
          {data.details.map((item, index) => (
            <View key={index} style={styles.infoItem}>
              <View style={styles.textWrap}>
                <View
                  style={[styles.dot, {backgroundColor: getColor(index)}]}
                />
                <Text category="p2" numberOfLines={1}>
                  {item.name}
                </Text>
              </View>
              <Text category="p2" appearance="hint">
                {item.amount?.toFixed(2)}
              </Text>
            </View>
          ))}
        </View>
        <PieChart details={data.details} />
      </RefreshScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  infoItem: {
    flexDirection: 'row',
    marginVertical: 6,
    alignItems: 'center',
  },
  textWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 8,
    marginRight: 8,
  },
});

export default TopSellingProducts;
