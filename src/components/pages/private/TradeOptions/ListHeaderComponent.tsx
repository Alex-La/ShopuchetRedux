import {RouteProp, useRoute} from '@react-navigation/core';
import {
  Datepicker,
  Input,
  Layout,
  StyleService,
  Text,
  useStyleSheet,
} from '@ui-kitten/components';
import React, {useEffect, useState} from 'react';
import {Keyboard, TouchableWithoutFeedback, View} from 'react-native';
import {useAppSelector} from '../../../../redux';
import {
  PrivateStackNavigator,
  TradeOptionsTypes,
} from '../../../../utils/navigation.types';

const ListHeaderComponent: React.FC = () => {
  const tradeSession = useAppSelector(state => state.trade.tradeSession);

  const styles = useStyleSheet(Styles);
  const route = useRoute<RouteProp<PrivateStackNavigator, 'TradeOptions'>>();

  const [date, setDate] = useState<Date>(new Date());
  const [discount, setDiscount] = useState<string>('0.00');

  useEffect(() => {
    if (tradeSession.date.length) setDate(new Date(tradeSession.date));
  }, [tradeSession.date]);

  const handleBlur = () => setDiscount(dis => Number(dis).toFixed(2));

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Layout style={styles.wrap} level="2">
        <View style={styles.itemWrap}>
          <Text appearance="hint" category="label">
            Дата:
          </Text>
          <Datepicker
            disabled={!route.params.edit}
            controlStyle={styles.datepicker}
            date={date}
            onSelect={setDate}
          />
        </View>
        {route.params.type === TradeOptionsTypes.SALE && (
          <View style={styles.itemWrap}>
            <Text appearance="hint" category="label">
              Скидка в %
            </Text>
            <Input
              value={discount}
              onChangeText={setDiscount}
              onBlur={handleBlur}
              style={{backgroundColor: 'transparent', borderWidth: 0}}
              selectTextOnFocus
              keyboardType="number-pad"
              textStyle={styles.percentage}
            />
          </View>
        )}
      </Layout>
    </TouchableWithoutFeedback>
  );
};

const Styles = StyleService.create({
  wrap: {padding: 16, flexDirection: 'row'},
  itemWrap: {
    flex: 1,
    alignItems: 'center',
    borderBottomColor: 'color-primary-500',
    borderBottomWidth: 1,
    marginHorizontal: 5,
  },
  datepicker: {borderWidth: 0, backgroundColor: 'transparent'},
  percentage: {textAlign: 'center', color: 'color-primary-500'},
});

export default ListHeaderComponent;
