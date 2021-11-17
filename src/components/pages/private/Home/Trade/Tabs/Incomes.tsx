import {RouteProp, useFocusEffect} from '@react-navigation/native';
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
import React, {useCallback, useEffect, useState} from 'react';
import {
  ImageProps,
  ListRenderItemInfo,
  StyleSheet,
  TouchableHighlight,
  View,
} from 'react-native';
import usePrevious from '../../../../../../hooks/previous.hook';
import {useAppDispatch, useAppSelector} from '../../../../../../redux';
import {getIncome} from '../../../../../../redux/actions/private/tradeActions';
import {
  TAB_TYPES,
  TradeSessionDetail,
} from '../../../../../../redux/types/private/trade.types';
import {convertDate} from '../../../../../../utils';
import {SkladDetail} from '../../../../../../utils/api.types';
import {
  PrivateStackNavigator,
  TradeOptionsTypes,
  TradeTopTabNavigator,
} from '../../../../../../utils/navigation.types';

const Trash = (props?: Partial<ImageProps>) => (
  <Icon {...props} name="trash-2-outline" />
);

const Edit = (props?: Partial<ImageProps>) => (
  <Icon {...props} name="edit-outline" />
);

type Props = {
  navigation: NativeStackNavigationProp<PrivateStackNavigator>;
  route: RouteProp<TradeTopTabNavigator, 'Incomes'>;
};

const Incomes: React.FC<Props> = ({navigation, route}) => {
  const theme = useTheme();

  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.trade.tabs.income.loading);
  const {head, details} = useAppSelector(state => state.trade.tabs.income.data);
  const date = useAppSelector(state => state.trade.date);
  const index = useAppSelector(state => state.trade.index);
  const currentGTochkaId = useAppSelector(
    state => state.main.tradePoint?.gTochkaId,
  );
  const prevGTochkaId = usePrevious<number>(currentGTochkaId);
  const prevDatebegin = usePrevious<Date>(date.datebegin);
  const prevDateend = usePrevious<Date>(date.dateend);

  const loadIncomes = useCallback(
    (loadMore: boolean, page: number) => {
      if (currentGTochkaId)
        dispatch(
          getIncome(
            loadMore,
            currentGTochkaId,
            date.datebegin,
            date.dateend,
            page,
          ),
        );
    },
    [currentGTochkaId, date],
  );

  useEffect(() => {
    if (route.params.reload) {
      loadIncomes(false, 0);
      navigation.setParams({reload: false});
    }
  }, [route.params]);

  useFocusEffect(
    useCallback(() => {
      if (currentGTochkaId) {
        if (
          currentGTochkaId !== prevGTochkaId ||
          date.datebegin !== prevDatebegin ||
          date.dateend !== prevDateend
        )
          loadIncomes(false, 0);
      }
    }, [currentGTochkaId, date]),
  );

  const handleRefresh = () => loadIncomes(false, 0);

  const navToNewIncome = () =>
    currentGTochkaId &&
    navigation.navigate('TradeOptions', {
      type: TradeOptionsTypes.INCOME,
      sessionType: TAB_TYPES.INCOME,
      edit: true,
      newTrade: true,
      typeId: currentGTochkaId,
    });

  const ListHeaderComponent = useCallback(() => {
    return (
      <Layout style={styles.headerWrap}>
        <View style={styles.item}>
          <Text appearance="hint">Всего приходов:</Text>
          <Text status="primary">{head.cntReceipt}</Text>
        </View>
        <View style={[styles.item, styles.margin]}>
          <Text appearance="hint">На сумму:</Text>
          <Text status="primary">{head.sumReceipt?.toFixed(2)}</Text>
        </View>
      </Layout>
    );
  }, [head]);

  return (
    <Layout style={styles.wrap}>
      <List
        refreshing={loading}
        onRefresh={handleRefresh}
        ListHeaderComponent={ListHeaderComponent}
        data={details}
        style={{backgroundColor: theme['background-color-1']}}
        renderItem={props => (
          <ListItem
            {...props}
            dateIndex={index}
            theme={theme}
            navigation={navigation}
            reload={() => loadIncomes(false, 0)}
          />
        )}
      />
      <Button onPress={navToNewIncome} style={styles.button}>
        Новый приход
      </Button>
    </Layout>
  );
};

interface ListItemProps extends ListRenderItemInfo<SkladDetail> {
  dateIndex: number;
  theme: Record<string, string>;
  navigation: NativeStackNavigationProp<PrivateStackNavigator>;
  reload: () => void;
}

const ListItem: React.FC<ListItemProps> = ({
  item,
  index,
  dateIndex,
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
      deleteId: item.skladId,
      type: TradeOptionsTypes.INCOME,
      sessionType: TAB_TYPES.INCOME,
    });
  };

  const navToEdit = () => {
    setVisible(false);
    navigation.navigate('TradeOptions', {
      edit: true,
      newTrade: false,
      type: TradeOptionsTypes.INCOME,
      sessionType: TAB_TYPES.INCOME,
      recId: item.recId,
      zakazId: item.skladId,
      typeId: item.skladId,
      details: item.details.map<TradeSessionDetail>(item => ({
        ...item,
        remainder: item.remainAmount,
        name: item.gProduct.name,
        gProductId: item.gProduct.gProductId,
        cost: item.price,
      })),
    });
  };

  const navToReceipt = () => {
    setVisible(false);
    navigation.navigate('TradeOptions', {
      edit: false,
      newTrade: false,
      type: TradeOptionsTypes.INCOME,
      sessionType: TAB_TYPES.INCOME,
      recId: item.recId,
      zakazId: item.skladId,
      typeId: item.skladId,
      details: item.details.map<TradeSessionDetail>(item => ({
        ...item,
        remainder: item.remainAmount,
        name: item.gProduct.name,
        gProductId: item.gProduct.gProductId,
        cost: item.price,
      })),
    });
  };

  const renderDate = useCallback(() => {
    const dateArray = (item.date as string).split(' ');
    if (dateIndex === 0) {
      return `в ${dateArray[1]}`;
    } else return `от ${dateArray[0]}`;
  }, [item.details]);

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
          {`Чек № ${item.recId} ${renderDate()}`}
        </Text>
        {item.details.slice(0, 3).map((item, index) => (
          <Text key={index} category="label" numberOfLines={1}>
            {item.gProduct.name}
          </Text>
        ))}
        {item.details.length > 3 && (
          <Text category="label" appearance="hint" style={{marginTop: 5}}>
            ... ещё позиций - {item.details.length - 3}шт.
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
        {item.details.slice(0, 3).map((item, index) => (
          <Text key={index} category="label">
            {item.price} x {item.amount?.toFixed(2)}
          </Text>
        ))}
        <Text status="primary" category="p2">
          ={' '}
          {item.details
            .slice(0, 3)
            .reduce((acc, item) => acc + item.price * item.amount, 0)}
        </Text>
      </View>
    </View>
  );

  return (
    <TouchableHighlight
      underlayColor={theme['color-basic-transparent-active']}
      onPress={navToReceipt}
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
        <MenuItem title="Изменить" accessoryLeft={Edit} onPress={navToEdit} />
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

export default Incomes;
