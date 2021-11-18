import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Divider, Layout, Text} from '@ui-kitten/components';

import RefreshScrollView from '../../../../loaders/RefreshScrollView';
import InfoItem from './InfoItem';

import {useAppDispatch, useAppSelector} from '../../../../../redux';
import {getMainData} from '../../../../../redux/actions/private/mainActions';
import {useFocusEffect} from '@react-navigation/core';
import MainGraph from './MainGraph';

const Main: React.FC = () => {
  const dispatch = useAppDispatch();
  const mainData = useAppSelector(state => state.main.mainData);
  const tradePoint = useAppSelector(state => state.main.tradePoint);
  const loading = useAppSelector(state => state.main.loading);

  useFocusEffect(
    React.useCallback(() => {
      if (tradePoint?.gTochkaId) dispatch(getMainData(tradePoint.gTochkaId));
    }, [tradePoint?.gTochkaId]),
  );

  const onRefresh = () =>
    dispatch(getMainData(tradePoint ? tradePoint.gTochkaId : 0));

  return (
    <Layout style={styles.wrap}>
      <RefreshScrollView refreshing={loading} onRefresh={onRefresh}>
        <View style={styles.row}>
          <Text category="h6" status="primary">
            В кассе на сегодня:
          </Text>
          <Text category="h6" status="primary">
            {mainData.summ}
          </Text>
        </View>
        <Divider style={{marginTop: 16}} />
        <InfoItem title="Сегодня" info={mainData.day} />
        <InfoItem title="За последние 7 дней" info={mainData.week} />
        <InfoItem title="За последние 30 дней" info={mainData.month} />
        <MainGraph />
      </RefreshScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});

export default Main;
