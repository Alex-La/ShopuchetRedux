import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Button, Layout, Text} from '@ui-kitten/components';
import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  PrivateStackNavigator,
  TradeOptionsTypes,
} from '../../../../../../utils/navigation.types';
import TradeList from '../TradesList';

type Props = {
  navigation: NativeStackNavigationProp<PrivateStackNavigator>;
};

const Sales: React.FC<Props> = ({navigation}) => {
  const navToNewTrade = () =>
    navigation.navigate('TradeOptions', {type: TradeOptionsTypes.SALE});

  const ListHeaderComponent = useCallback(() => {
    return (
      <Layout style={styles.headerWrap}>
        <View style={styles.item}>
          <Text appearance="hint">Всего продаж:</Text>
          <Text status="primary">4</Text>
        </View>
        <View style={[styles.item, styles.margin]}>
          <Text appearance="hint">На сумму:</Text>
          <Text status="primary">29700.00</Text>
        </View>
        <View style={[styles.item, styles.margin]}>
          <Text appearance="hint">Прибыль:</Text>
          <Text status="primary">12345.00</Text>
        </View>
      </Layout>
    );
  }, []);

  return (
    <Layout style={styles.wrap}>
      <TradeList
        ListHeaderComponent={<ListHeaderComponent />}
        navigation={navigation}
        type={TradeOptionsTypes.RECEIPT}
      />
      <Button onPress={navToNewTrade} style={styles.button}>
        Новая продажа
      </Button>
    </Layout>
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
