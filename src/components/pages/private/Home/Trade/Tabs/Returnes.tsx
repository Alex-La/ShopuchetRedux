import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Button, Layout, List, Text} from '@ui-kitten/components';
import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {TAB_TYPES} from '../../../../../../redux/types/private/trade.types';
import {
  PrivateStackNavigator,
  TradeOptionsTypes,
} from '../../../../../../utils/navigation.types';

type Props = {
  navigation: NativeStackNavigationProp<PrivateStackNavigator>;
};

const Returnes: React.FC<Props> = ({navigation}) => {
  const navToNewReturn = () =>
    navigation.navigate('TradeOptions', {
      type: TradeOptionsTypes.RETURN,
      sessionType: TAB_TYPES.RETURN,
      edit: true,
      newTrade: true,
    });

  const ListHeaderComponent = useCallback(() => {
    return (
      <Layout style={styles.headerWrap}>
        <View style={styles.item}>
          <Text appearance="hint">Всего возвратов:</Text>
          <Text status="primary">4</Text>
        </View>
        <View style={[styles.item, styles.margin]}>
          <Text appearance="hint">На сумму:</Text>
          <Text status="primary">29700.00</Text>
        </View>
      </Layout>
    );
  }, []);

  return (
    <Layout style={styles.wrap}>
      <List
        ListHeaderComponent={ListHeaderComponent}
        data={[]}
        renderItem={() => <></>}
      />
      <Button onPress={navToNewReturn} style={styles.button}>
        Новый возврат
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

export default Returnes;
