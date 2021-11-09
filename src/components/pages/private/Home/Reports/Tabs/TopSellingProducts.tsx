import {Divider, Layout, List, Text} from '@ui-kitten/components';
import React from 'react';
import {View} from 'react-native';
import {useAppSelector} from '../../../../../../redux';
import RefreshScrollView from '../../../../../loaders/RefreshScrollView';
import DateRangeAndSort from '../DateRangeAndSort';

const TopSellingProducts: React.FC = () => {
  const date = useAppSelector(state => state.reports.date);

  const ListHeader = () => (
    <Layout style={{flex: 1}}>
      <DateRangeAndSort date={date} reduce={false} setReduce={() => {}} />
      <Divider />
      <View style={{padding: 16}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text appearance="hint">Продано товаров:</Text>
          <Text status="primary">153</Text>
        </View>
        <View
          style={{
            marginTop: 14,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text appearance="hint">На сумму:</Text>
          <Text status="primary">153</Text>
        </View>
      </View>
      <Divider />
    </Layout>
  );
  return (
    <RefreshScrollView refreshing={false} onRefresh={() => {}}>
      <ListHeader />
    </RefreshScrollView>
  );
};

export default TopSellingProducts;
