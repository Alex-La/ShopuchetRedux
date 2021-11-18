import {useFocusEffect} from '@react-navigation/core';
import {Divider, Layout, List, Text} from '@ui-kitten/components';
import React, {Fragment, useCallback, useState} from 'react';
import {ListRenderItemInfo, StyleSheet, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../../../../../redux';
import {
  getReturnsProducts,
  setReduce,
} from '../../../../../../redux/actions/private/reportsActions';
import {TAB_TYPES} from '../../../../../../redux/types/private/reports.types';
import {even} from '../../../../../../utils';
import {ReturnsProductsDetail} from '../../../../../../utils/api.types';
import FooterLoader from '../../../../../general/FooterLoader';
import DateRangeAndSort from '../DateRangeAndSort';

const ReturnsByProducts: React.FC = () => {
  const dispatch = useAppDispatch();

  const date = useAppSelector(state => state.reports.date);
  const details = useAppSelector(
    state => state.reports.tabs.returnsByProducts.data.details,
  );
  const loading = useAppSelector(
    state => state.reports.tabs.returnsByProducts.loading,
  );
  const returnsByProducts = useAppSelector(
    state => state.reports.tabs.returnsByProducts,
  );

  const currentGTochkaid = useAppSelector(
    state => state.main.tradePoint?.gTochkaId,
  );

  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(true);

  const loadSalesGroups = useCallback(
    (loadMore: boolean, page: number, descending: boolean) => {
      if (currentGTochkaid)
        return dispatch(
          getReturnsProducts(
            loadMore,
            currentGTochkaid,
            date.datebegin,
            date.dateend,
            page,
            descending,
          ),
        );
    },
    [currentGTochkaid, date],
  );

  useFocusEffect(
    useCallback(() => {
      if (currentGTochkaid) {
        loadSalesGroups(false, 0, !returnsByProducts.reduce);
      }
    }, [currentGTochkaid, date]),
  );

  const handleReduce = () => {
    dispatch(setReduce(!returnsByProducts.reduce, TAB_TYPES.RETURNS_PRODUCTS));
    loadSalesGroups(false, 0, !returnsByProducts.reduce);
  };

  const handleRefresh = () =>
    loadSalesGroups(false, 0, returnsByProducts.reduce);

  const handleLoadMore = () => {
    if (isDataLoaded && returnsByProducts.data.hasNext) {
      setIsDataLoaded(false);
      loadSalesGroups(
        true,
        returnsByProducts.data.currentPage + 1,
        returnsByProducts.reduce,
      )
        ?.then(() => setIsDataLoaded(true))
        .catch(() => setIsDataLoaded(true));
    }
  };

  const ListHeader = () => (
    <Layout style={{flex: 1}}>
      <DateRangeAndSort
        date={date}
        reduce={returnsByProducts.reduce}
        setReduce={handleReduce}
      />
      <View style={{padding: 16}}>
        <View style={styles.headerItem}>
          <Text appearance="hint">Всего возвратов:</Text>
          <Text status="primary">{returnsByProducts.data.head.cnt}</Text>
        </View>
        <View
          style={{
            ...styles.headerItem,
            marginTop: 14,
          }}>
          <Text appearance="hint">На сумму:</Text>
          <Text status="primary">
            {returnsByProducts.data.head.summ?.toFixed(2)}
          </Text>
        </View>
      </View>
      <Divider />
    </Layout>
  );

  const ListFooter = () => (isDataLoaded ? <Fragment /> : <FooterLoader />);

  return (
    <List
      refreshing={loading}
      onRefresh={handleRefresh}
      data={details}
      ListHeaderComponent={ListHeader}
      ListFooterComponent={ListFooter}
      renderItem={ListItem}
      onEndReachedThreshold={0.2}
      onEndReached={handleLoadMore}
    />
  );
};

const ListItem: React.FC<ListRenderItemInfo<ReturnsProductsDetail>> = ({
  item,
  index,
}) => {
  return (
    <Layout key={index} style={styles.wrap} level={even(index) ? '4' : '2'}>
      <View style={{flex: 2}}>
        <Text numberOfLines={1} category="p2">
          {item.name}
        </Text>
      </View>
      <View style={styles.number}>
        <Text appearance="hint" category="label">
          {item.amount?.toFixed(2)}
        </Text>
      </View>
      <View style={styles.number}>
        <Text appearance="hint" category="label">
          {item.summ?.toFixed(2)}
        </Text>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    padding: 16,
  },
  number: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  headerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ReturnsByProducts;
