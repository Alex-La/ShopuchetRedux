import {useFocusEffect} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Button, Layout, List, Text, useTheme} from '@ui-kitten/components';
import React, {useCallback, useState} from 'react';
import {ListRenderItemInfo, StyleSheet, View} from 'react-native';
import {TouchableHighlight} from 'react-native-gesture-handler';
import usePrevious from '../../../../../../hooks/previous.hook';
import {useAppDispatch, useAppSelector} from '../../../../../../redux';
import {getSales} from '../../../../../../redux/actions/private/tradeActions';
import {Sale, SalesDetail} from '../../../../../../utils/api.types';
import {
  PrivateStackNavigator,
  TradeOptionsTypes,
} from '../../../../../../utils/navigation.types';

type Props = {
  navigation: NativeStackNavigationProp<PrivateStackNavigator>;
};

const Sales: React.FC<Props> = ({navigation}) => {
  const theme = useTheme();

  const dispatch = useAppDispatch();
  const {sales, details} = useAppSelector(state => state.trade.sales);
  const date = useAppSelector(state => state.trade.date);
  const currentGTochkaId = useAppSelector(
    state => state.main.tradePoint?.gTochkaId,
  );
  const prevGTochkaId = usePrevious<number>(currentGTochkaId);
  const prevDatebegin = usePrevious<Date>(date.datebegin);
  const prevDateend = usePrevious<Date>(date.dateend);

  const loadSales = useCallback(() => {
    if (currentGTochkaId)
      dispatch(getSales(currentGTochkaId, date.datebegin, date.dateend));
  }, [currentGTochkaId, date]);

  useFocusEffect(
    useCallback(() => {
      if (currentGTochkaId) {
        if (
          currentGTochkaId !== prevGTochkaId ||
          date.datebegin !== prevDatebegin ||
          date.dateend !== prevDateend
        )
          loadSales();
      }
    }, [currentGTochkaId, prevGTochkaId, date, prevDatebegin, prevDateend]),
  );

  const navToNewTrade = () =>
    navigation.navigate('TradeOptions', {type: TradeOptionsTypes.SALE});

  const ListHeaderComponent = useCallback(() => {
    return (
      <Layout style={styles.headerWrap}>
        <View style={styles.item}>
          <Text appearance="hint">Всего продаж:</Text>
          <Text status="primary">{sales.cnt}</Text>
        </View>
        <View style={[styles.item, styles.margin]}>
          <Text appearance="hint">На сумму:</Text>
          <Text status="primary">{sales.summ?.toFixed(2)}</Text>
        </View>
        <View style={[styles.item, styles.margin]}>
          <Text appearance="hint">Прибыль:</Text>
          <Text status="primary">{sales.income?.toFixed(2)}</Text>
        </View>
      </Layout>
    );
  }, [sales]);

  return (
    <Layout style={styles.wrap}>
      <ListHeaderComponent />
      <List
        style={{backgroundColor: theme['background-color-1']}}
        data={details}
        renderItem={props => <ListItem {...props} theme={theme} />}
      />
      <Button onPress={navToNewTrade} style={styles.button}>
        Новая продажа
      </Button>
    </Layout>
  );
};

interface ListItemProps extends ListRenderItemInfo<SalesDetail> {
  theme: Record<string, string>;
}

const ListItem: React.FC<ListItemProps> = ({item, index, theme}) => {
  const RenderAnchor = () => (
    <View
      style={{
        borderWidth: 1,
        borderColor: theme['color-basic-500'],
        flexDirection: 'row',
      }}>
      <View
        style={{
          padding: 5,
          flex: 2,
          borderRightWidth: 1,
          borderColor: theme['color-basic-500'],
        }}>
        <Text category="p2" status="primary">
          {`Чек № ${item.recId}`}
        </Text>
      </View>
      <View style={{padding: 5, flex: 1}}></View>
    </View>
  );

  return (
    <TouchableHighlight
      underlayColor={theme['color-basic-transparent-active']}
      onPress={() => {}}
      key={index}
      style={{marginHorizontal: 16, marginVertical: 8}}>
      <RenderAnchor />
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  wrap: {flex: 1},
  button: {marginHorizontal: 16, marginVertical: 20},
  headerWrap: {
    padding: 16,
  },
  item: {flexDirection: 'row', justifyContent: 'space-between'},
  margin: {marginTop: 6},
});

export default Sales;
