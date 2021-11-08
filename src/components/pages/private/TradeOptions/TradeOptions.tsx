import {RouteProp} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Button, List, Text, useTheme} from '@ui-kitten/components';
import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  PrivateStackNavigator,
  TradeOptionsTypes,
} from '../../../../utils/navigation.types';
import Plus from '../../../icons/Plus';
import ListEmptyComponent from './ListEmptyComponent';
import ListFooterComponent from './ListFooterComponent';
import ListHeaderComponent from './ListHeaderComponent';
import ListItem from '../../../general/ListItem';

type Props = {
  navigation: NativeStackNavigationProp<PrivateStackNavigator, 'TradeOptions'>;
  route: RouteProp<PrivateStackNavigator, 'TradeOptions'>;
};

const TradeOptions: React.FC<Props> = ({navigation, route}) => {
  useEffect(() => {
    navigation.setOptions({
      title:
        route.params.type === TradeOptionsTypes.RECEIPT
          ? `Чек №`
          : route.params.type,
    });
  }, [route.params]);

  const theme = useTheme();

  const goBack = () => navigation.goBack();
  const navToAddProduct = () => navigation.navigate('AddProduct');
  const navToAddProductModal = () => navigation.navigate('AddProductModal');
  const navToPaymentModal = () => navigation.navigate('PaymentModal');

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
          data={[2, 3]}
          renderItem={props => (
            <ListItem
              {...props}
              theme={theme}
              modal
              onPress={navToAddProductModal}
            />
          )}
        />
        <Button style={styles.addButton} onPress={navToAddProduct}>
          <Plus />
        </Button>
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
