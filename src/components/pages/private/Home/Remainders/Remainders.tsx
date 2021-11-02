import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {
  Button,
  Divider,
  Icon,
  Input,
  Layout,
  List,
  Text,
  Tooltip,
  TopNavigationAction,
} from '@ui-kitten/components';

import {DrawerNavigationProp} from '@react-navigation/drawer';
import {DrawerNavigator} from '../../../../../utils/navigation.types';
import DrawerTopNavigation from '../../../../navigation/DrawerTopNavigation';
import Sort from '../../../../icons/Sort';

import {useAppDispatch, useAppSelector} from '../../../../../redux';
import {even} from '../../../../../utils';
import {getRemainders} from '../../../../../redux/actions/private/remaindersActions';
import usePrevious from '../../../../../hooks/previous.hook';
import {useFocusEffect} from '@react-navigation/core';

type Props = {
  navigation: DrawerNavigationProp<DrawerNavigator, 'Remainders'>;
};

const Remainders: React.FC<Props> = ({navigation}) => {
  const dispatch = useAppDispatch();

  const tradePoint = useAppSelector(state => state.main.tradePoint);
  const reverse = useAppSelector(state => state.remainders.reverse);
  const remainders = useAppSelector(state => state.remainders.remainders);
  const loading = useAppSelector(state => state.fetch.loading);

  const prevTradePointId = usePrevious<number>(tradePoint?.gTochkaId);

  const [cnt, setCnt] = useState<string>('');
  const [filter, setFilter] = useState<string>('');

  const renderRightAction = () => (
    <TopNavigationAction icon={<Sort def={!reverse} />} />
  );

  useEffect(() => {
    navigation.setOptions({
      header: props => (
        <DrawerTopNavigation
          {...props}
          accessoryRight={renderRightAction}
          subtitle={tradePoint?.name}
        />
      ),
    });
  }, [tradePoint]);

  const [visible, setVisible] = useState<boolean>(false);

  const toggle = () => setVisible(!visible);

  const fetchRemainders = useCallback(() => {
    if (tradePoint)
      dispatch(getRemainders(tradePoint.gTochkaId, Number(cnt), filter));
  }, [tradePoint, cnt, filter]);

  useFocusEffect(
    useCallback(() => {
      if (tradePoint?.gTochkaId && tradePoint?.gTochkaId !== prevTradePointId)
        fetchRemainders();
    }, [tradePoint?.gTochkaId]),
  );

  return (
    <Layout style={styles.wrap}>
      <View style={{padding: 16}}>
        <Text style={{textAlign: 'center'}}>Фильтр</Text>
        <Input
          value={cnt}
          onChangeText={setCnt}
          keyboardType="number-pad"
          selectTextOnFocus
          style={{marginTop: 8}}
          placeholder="Остаток"
          accessoryRight={props => (
            <Tooltip
              placement={'bottom end'}
              anchor={() => (
                <TouchableOpacity onPress={toggle}>
                  <Icon {...props} name="info-outline" />
                </TouchableOpacity>
              )}
              visible={visible}
              onBackdropPress={() => setVisible(false)}>
              Показать товары с остатком меньше указанного
            </Tooltip>
          )}
        />
        <Input
          value={filter}
          onChangeText={setFilter}
          selectTextOnFocus
          style={{marginTop: 16}}
          placeholder="Товар"
        />
        <Button
          disabled={loading}
          onPress={fetchRemainders}
          style={{marginTop: 16}}>
          Поиск
        </Button>
      </View>
      <Divider />

      <View style={styles.tableHead}>
        <Text style={styles.item} appearance="hint">
          Товар
        </Text>
        <Text style={styles.remainder} appearance="hint">
          Остаток
        </Text>
      </View>
      <Divider />

      <List
        refreshing={loading}
        onRefresh={fetchRemainders}
        ItemSeparatorComponent={Divider}
        data={remainders}
        renderItem={({item, index}) => (
          <Layout style={styles.tableHead} level={even(index) ? '2' : '1'}>
            <View style={[styles.item]}>
              <Text numberOfLines={1}>{item.groupName}</Text>
              <Text category="label" appearance="hint" numberOfLines={1}>
                {item.name}
              </Text>
            </View>
            <View style={{justifyContent: 'flex-end'}}>
              <Text category="label">{item.amount}</Text>
            </View>
          </Layout>
        )}
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
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  item: {flex: 4},
  remainder: {flex: 1, textAlign: 'right'},
});

export default Remainders;
