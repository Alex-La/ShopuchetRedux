import {RouteProp} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  Button,
  Icon,
  Input,
  Layout,
  StyleService,
  Text,
  useStyleSheet,
} from '@ui-kitten/components';
import React from 'react';
import {ImageProps, TouchableWithoutFeedback, View} from 'react-native';
import {PrivateStackNavigator} from '../../utils/navigation.types';

const Product = (props?: Partial<ImageProps>) => (
  <Icon {...props} name="shopping-bag-outline" />
);
const Price = (props?: Partial<ImageProps>) => (
  <Icon {...props} name="pricetags-outline" />
);

type Props = {
  navigation: NativeStackNavigationProp<
    PrivateStackNavigator,
    'AddProductModal'
  >;
  route: RouteProp<PrivateStackNavigator, 'AddProductModal'>;
};

const AddProductModal: React.FC<Props> = ({navigation, route}) => {
  const styles = useStyleSheet(Styles);
  const goBack = () => navigation.goBack();

  return (
    <TouchableWithoutFeedback onPress={goBack}>
      <View style={styles.wrap}>
        <Layout style={styles.form}>
          <Text category="h6" style={{textAlign: 'center'}}>
            Товар 1
          </Text>
          <Text style={{textAlign: 'center'}}>Остаток: 42 шт.</Text>
          <Input
            accessoryLeft={Product}
            placeholder="Количество"
            style={{marginTop: 30}}
            selectTextOnFocus
            keyboardType="decimal-pad"
          />
          <Input
            accessoryLeft={Price}
            placeholder="Цена"
            style={{marginTop: 15}}
            selectTextOnFocus
            keyboardType="decimal-pad"
          />
          <View style={{marginTop: 30, flexDirection: 'row'}}>
            <Button
              onPress={goBack}
              style={{flex: 1, marginRight: 5}}
              appearance="outline">
              Отмена
            </Button>
            <Button style={{flex: 1, marginLeft: 5}}>Ок</Button>
          </View>
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

export default AddProductModal;
