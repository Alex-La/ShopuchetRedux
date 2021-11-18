import {useFocusEffect} from '@react-navigation/native';
import {Layout, List, Text} from '@ui-kitten/components';
import React, {useCallback} from 'react';
import {ListRenderItemInfo, StyleSheet, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../../../../../redux';
import {
  getSalesMonth,
  setReduce,
} from '../../../../../../redux/actions/private/reportsActions';
import {TAB_TYPES} from '../../../../../../redux/types/private/reports.types';
import {convertDate, even} from '../../../../../../utils';
import {SalesMonthDetails} from '../../../../../../utils/api.types';
import SalesHeader from '../SalesHeader';

const SalesByMonthes: React.FC = () => {
  const dispatch = useAppDispatch();
  const date = useAppSelector(state => state.reports.date);
  const reduce = useAppSelector(state => state.reports.tabs.salesMonth.reduce);
  const data = useAppSelector(state => state.reports.tabs.salesMonth.data);
  const loading = useAppSelector(
    state => state.reports.tabs.salesMonth.loading,
  );

  const currentGTochkaid = useAppSelector(
    state => state.main.tradePoint?.gTochkaId,
  );

  const loadSalesMonth = useCallback(() => {
    if (currentGTochkaid)
      dispatch(getSalesMonth(currentGTochkaid, date.datebegin, date.dateend));
  }, [currentGTochkaid, date]);

  useFocusEffect(
    useCallback(() => {
      if (currentGTochkaid) {
        loadSalesMonth();
      }
    }, [currentGTochkaid, date]),
  );

  const handleReduce = () => {
    dispatch(setReduce(!reduce, TAB_TYPES.SALES_MONTH));
    loadSalesMonth();
  };

  return (
    <List
      ListHeaderComponent={
        <SalesHeader
          date={date}
          reduce={reduce}
          setReduce={handleReduce}
          head={data.head}
        />
      }
      refreshing={loading}
      onRefresh={loadSalesMonth}
      data={data.details}
      renderItem={ListItem}
    />
  );
};

const ListItem: React.FC<ListRenderItemInfo<SalesMonthDetails>> = ({
  item,
  index,
}) => {
  return (
    <Layout key={index} style={styles.wrap} level={even(index) ? '4' : '2'}>
      <View style={{flex: 2}}>
        <Text numberOfLines={1} style={{marginBottom: 5}} category="p2">
          {convertDate(item.month)}
        </Text>
        <Text appearance="hint" category="label">
          {item.amount?.toFixed(2)}
        </Text>
      </View>
      <View style={styles.number}>
        <Text appearance="hint" category="label">
          {item.summ?.toFixed(2)}
        </Text>
      </View>
      <View style={styles.number}>
        <Text appearance="hint" category="label">
          {item.income?.toFixed(2)}
        </Text>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  number: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
});

export default SalesByMonthes;
