import {useFocusEffect} from '@react-navigation/core';
import {Layout, List, Text} from '@ui-kitten/components';
import React, {useCallback} from 'react';
import {ListRenderItemInfo, StyleSheet, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../../../../../redux';
import {
  getSalesProducts,
  setReduce,
} from '../../../../../../redux/actions/private/reportsActions';
import {TAB_TYPES} from '../../../../../../redux/types/private/reports.types';
import {even} from '../../../../../../utils';
import {SalesProductsDetails} from '../../../../../../utils/api.types';
import SalesHeader from '../SalesHeader';

const SalesByProducts: React.FC = () => {
  const dispatch = useAppDispatch();
  const date = useAppSelector(state => state.reports.date);
  const reduce = useAppSelector(
    state => state.reports.tabs.salesProducts.reduce,
  );
  const data = useAppSelector(state => state.reports.tabs.salesProducts.data);
  const loading = useAppSelector(
    state => state.reports.tabs.salesProducts.loading,
  );

  const currentGTochkaid = useAppSelector(
    state => state.main.tradePoint?.gTochkaId,
  );

  const loadSalesProducts = useCallback(() => {
    if (currentGTochkaid)
      dispatch(
        getSalesProducts(currentGTochkaid, date.datebegin, date.dateend),
      );
  }, [currentGTochkaid, date]);

  useFocusEffect(
    useCallback(() => {
      if (currentGTochkaid) {
        loadSalesProducts();
      }
    }, [currentGTochkaid, date]),
  );

  const handleReduce = () => {
    dispatch(setReduce(!reduce, TAB_TYPES.SALES_PRODUCTS));
    loadSalesProducts();
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
      onRefresh={loadSalesProducts}
      data={data.details}
      renderItem={ListItem}
    />
  );
};

const ListItem: React.FC<ListRenderItemInfo<SalesProductsDetails>> = ({
  item,
  index,
}) => {
  return (
    <Layout key={index} style={styles.wrap} level={even(index) ? '4' : '2'}>
      <View style={{flex: 2}}>
        <Text numberOfLines={1} style={{marginBottom: 5}} category="p2">
          {item.name}
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

export default SalesByProducts;
