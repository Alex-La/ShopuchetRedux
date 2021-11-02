import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Divider, Layout, Text} from '@ui-kitten/components';

import {DrawerNavigationProp} from '@react-navigation/drawer';
import {DrawerNavigator} from '../../../../../utils/navigation.types';
import DrawerTopNavigation from '../../../../navigation/DrawerTopNavigation';

import RefreshScrollView from '../../../../loaders/RefreshScrollView';
import InfoItem from './InfoItem';

import {useAppDispatch, useAppSelector} from '../../../../../redux';
import {getMainData} from '../../../../../redux/actions/private/mainActions';
import {useFocusEffect} from '@react-navigation/core';
import usePrevious from '../../../../../hooks/previous.hook';

type Props = {
  navigation: DrawerNavigationProp<DrawerNavigator, 'Main'>;
};

const Main: React.FC<Props> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const mainData = useAppSelector(state => state.main.mainData);
  const tradePoint = useAppSelector(state => state.main.tradePoint);
  const loading = useAppSelector(state => state.fetch.loading);

  const prevTradePointId = usePrevious<number>(tradePoint?.gTochkaId);

  useEffect(() => {
    navigation.setOptions({
      header: props => (
        <DrawerTopNavigation {...props} subtitle={tradePoint?.name} />
      ),
    });
  }, [tradePoint]);

  useFocusEffect(
    React.useCallback(() => {
      if (tradePoint?.gTochkaId && tradePoint.gTochkaId !== prevTradePointId)
        dispatch(getMainData(tradePoint.gTochkaId));
    }, [tradePoint?.gTochkaId, prevTradePointId]),
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
      </RefreshScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Main;
