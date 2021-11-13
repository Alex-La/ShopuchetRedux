import {RouteProp} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Button, List, Text, useTheme} from '@ui-kitten/components';
import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {
  PrivateStackNavigator,
  TradeOptionsTypes,
} from '../../../../utils/navigation.types';
import Plus from '../../../icons/Plus';
import ListEmptyComponent from './ListEmptyComponent';
import ListFooterComponent from './ListFooterComponent';
import ListHeaderComponent from './ListHeaderComponent';
import ListItem from '../../../general/ListItem';
import {useAppDispatch, useAppSelector} from '../../../../redux';
import {
  getZakazInfo,
  setTradeSession,
} from '../../../../redux/actions/private/tradeActions';
import {initialTradeSession} from '../../../../redux/reducers/private/tradeReducer';
import Preloader from '../../../loaders/Preloader';
import {TAB_TYPES} from '../../../../redux/types/private/trade.types';

type Props = {
  navigation: NativeStackNavigationProp<PrivateStackNavigator, 'TradeOptions'>;
  route: RouteProp<PrivateStackNavigator, 'TradeOptions'>;
};

const TradeOptions: React.FC<Props> = ({navigation, route}) => {
  const {type, zakazId, edit, recId} = route.params;

  const dispatch = useAppDispatch();
  const details = useAppSelector(state => state.trade.tradeSession.details);
  const [loading, setLoding] = useState<boolean>(true);

  useEffect(() => {
    if (type === TradeOptionsTypes.RECEIPT && zakazId) {
      dispatch(getZakazInfo(zakazId, edit, TAB_TYPES.SALES)).then(() =>
        setLoding(false),
      );
    } else setLoding(false);
  }, [type]);

  useEffect(() => {
    navigation.setOptions({
      title: type === TradeOptionsTypes.RECEIPT ? `Чек №${recId}` : type,
    });
  }, [route.params]);

  const theme = useTheme();

  const goBack = () => navigation.goBack();
  const navToAddProduct = () => navigation.navigate('AddProduct');
  const navToAddProductModal = () => navigation.navigate('AddProductModal');
  const navToPaymentModal = () => navigation.navigate('PaymentModal');

  useEffect(() => {
    navigation.addListener('beforeRemove', () => {
      dispatch(setTradeSession(initialTradeSession));
    });
    return () => navigation.removeListener('beforeRemove', () => {});
  }, []);

  if (loading) return <Preloader />;

  return (
    <>
      <View style={styles.wrap}>
        <ListHeaderComponent />
        <List
          contentContainerStyle={[
            styles.list,
            {backgroundColor: theme['background-basic-color-1']},
          ]}
          ListEmptyComponent={() => (
            <ListEmptyComponent navToAddProduct={navToAddProduct} />
          )}
          data={details}
          renderItem={props => (
            <ListItem
              {...props}
              theme={theme}
              modal
              onPress={navToAddProductModal}
            />
          )}
        />
        {edit && (
          <Button style={styles.addButton} onPress={navToAddProduct}>
            <Plus />
          </Button>
        )}
      </View>
      <ListFooterComponent goBack={goBack} handlePay={navToPaymentModal} />
    </>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    position: 'relative',
  },
  list: {
    flexGrow: 1,
    paddingVertical: 10,
  },
  addButton: {
    position: 'absolute',
    bottom: 26,
    right: 16,
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});

export default TradeOptions;
