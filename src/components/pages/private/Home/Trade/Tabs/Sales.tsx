import {useFocusEffect} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  Button,
  Icon,
  Layout,
  List,
  MenuItem,
  OverflowMenu,
  Text,
  useTheme,
} from '@ui-kitten/components';
import React, {useCallback, useState} from 'react';
import {ImageProps, ListRenderItemInfo, StyleSheet, View} from 'react-native';
import {TouchableHighlight} from 'react-native-gesture-handler';
import usePrevious from '../../../../../../hooks/previous.hook';
import {useAppDispatch, useAppSelector} from '../../../../../../redux';
import {getSales} from '../../../../../../redux/actions/private/tradeActions';
import {SalesDetail} from '../../../../../../utils/api.types';
import {
  PrivateStackNavigator,
  TradeOptionsTypes,
} from '../../../../../../utils/navigation.types';

const Trash = (props?: Partial<ImageProps>) => (
  <Icon {...props} name="trash-2-outline" />
);

const Edit = (props?: Partial<ImageProps>) => (
  <Icon {...props} name="edit-outline" />
);

type Props = {
  navigation: NativeStackNavigationProp<PrivateStackNavigator>;
};

const Sales: React.FC<Props> = ({navigation}) => {
  const theme = useTheme();

  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.trade.tabs.sales.loading);
  const {sales, details} = useAppSelector(state => state.trade.tabs.sales.data);
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

  const handleRefresh = () => loadSales();

  const navToNewTrade = () =>
    navigation.navigate('TradeOptions', {
      type: TradeOptionsTypes.SALE,
      edit: false,
    });

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
      <List
        ListHeaderComponent={ListHeaderComponent}
        refreshing={loading}
        onRefresh={handleRefresh}
        style={{backgroundColor: theme['background-color-1']}}
        data={details}
        renderItem={props => (
          <ListItem
            {...props}
            theme={theme}
            navigation={navigation}
            reload={loadSales}
          />
        )}
      />
      <Button onPress={navToNewTrade} style={styles.button}>
        Новая продажа
      </Button>
    </Layout>
  );
};

interface ListItemProps extends ListRenderItemInfo<SalesDetail> {
  theme: Record<string, string>;
  navigation: NativeStackNavigationProp<PrivateStackNavigator>;
  reload: () => void;
}

const ListItem: React.FC<ListItemProps> = ({
  item,
  index,
  theme,
  navigation,
  reload,
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const toggle = () => setVisible(true);

  const navToDelete = () => {
    setVisible(false);
    navigation.navigate('DeleteTradeModal', {
      refresh: reload,
      deleteId: item.zakazId,
      type: TradeOptionsTypes.SALE,
    });
  };

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
          flex: 3,
          borderRightWidth: 1,
          borderColor: theme['color-basic-500'],
        }}>
        <Text category="p2" status="primary">
          {`Чек № ${item.recId}`}
        </Text>
        {item.products.slice(0, 3).map((item, index) => (
          <Text key={index} category="label" numberOfLines={1}>
            {item.name}
          </Text>
        ))}
        {item.products.length > 3 && (
          <Text category="label" appearance="hint" style={{marginTop: 5}}>
            ... ещё позиций - {item.products.length - 3}шт.
          </Text>
        )}
      </View>
      <View
        style={{
          padding: 5,
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {item.products.slice(0, 3).map((item, index) => (
          <Text key={index} category="label">
            {item.price} x {item.amount?.toFixed(2)}
          </Text>
        ))}
        <Text status="primary" category="p2">
          ={' '}
          {item.products
            .slice(0, 3)
            .reduce((acc, item) => acc + item.price * item.amount, 0)}
        </Text>
      </View>
    </View>
  );

  return (
    <TouchableHighlight
      underlayColor={theme['color-basic-transparent-active']}
      onPress={() => {}}
      onLongPress={toggle}
      key={index}
      style={{marginHorizontal: 16, marginVertical: 8}}>
      <OverflowMenu
        anchor={RenderAnchor}
        visible={visible}
        onBackdropPress={() => setVisible(false)}
        backdropStyle={{
          backgroundColor: theme['color-basic-transparent-focus'],
        }}
        placement="top">
        <MenuItem title="Изменить" accessoryLeft={Edit} />
        <MenuItem title="Удалить" accessoryLeft={Trash} onPress={navToDelete} />
      </OverflowMenu>
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
