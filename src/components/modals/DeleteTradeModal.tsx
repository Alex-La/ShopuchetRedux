import {RouteProp} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  Button,
  Layout,
  StyleService,
  Text,
  useStyleSheet,
} from '@ui-kitten/components';
import React from 'react';
import {Alert, TouchableWithoutFeedback, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../redux';
import {
  deleteReceipt,
  deleteSale,
} from '../../redux/actions/private/tradeActions';
import {
  PrivateStackNavigator,
  TradeOptionsTypes,
} from '../../utils/navigation.types';

type Props = {
  navigation: NativeStackNavigationProp<
    PrivateStackNavigator,
    'DeleteTradeModal'
  >;
  route: RouteProp<PrivateStackNavigator, 'DeleteTradeModal'>;
};

const DeleteTradeModal: React.FC<Props> = ({navigation, route}) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.trade.loading);

  const styles = useStyleSheet(Styles);
  const goBack = () => navigation.goBack();

  const onPress = () => {
    route.params.refresh();
    goBack();
  };

  const onDelete = () => {
    switch (route.params.type) {
      case TradeOptionsTypes.SALE:
        dispatch(deleteSale(route.params.deleteId))
          .then(text => {
            Alert.alert('Информация', text, [
              {
                onPress,
              },
            ]);
          })
          .catch(goBack);
        break;
      case TradeOptionsTypes.INCOME:
      case TradeOptionsTypes.RETURN:
        dispatch(deleteReceipt(route.params.deleteId))
          .then(text => {
            Alert.alert('Информация', text, [
              {
                onPress,
              },
            ]);
          })
          .catch(goBack);
        break;
      default:
        return;
    }
  };

  return (
    <TouchableWithoutFeedback onPress={goBack}>
      <View style={styles.wrap}>
        <Layout style={styles.form}>
          <Text category="h5" style={{textAlign: 'center'}} status="primary">
            Вы точно хотите удалить продажу?!
          </Text>
          <Button
            disabled={loading}
            style={{marginTop: 40}}
            status="danger"
            onPress={onDelete}>
            Удалить
          </Button>
          <Button
            disabled={loading}
            style={{marginTop: 15}}
            appearance="outline"
            onPress={goBack}>
            Отмена
          </Button>
        </Layout>
      </View>
    </TouchableWithoutFeedback>
  );
};

const Styles = StyleService.create({
  wrap: {
    flex: 1,
    backgroundColor: 'color-primary-transparent-100',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  form: {padding: 30, borderRadius: 5, width: '100%'},
});

export default DeleteTradeModal;
