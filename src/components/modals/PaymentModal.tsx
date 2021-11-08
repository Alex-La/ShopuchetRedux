import {RouteProp} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  Button,
  ButtonGroup,
  Input,
  Layout,
  StyleService,
  Text,
  Toggle,
  useStyleSheet,
  useTheme,
} from '@ui-kitten/components';
import {EvaStatus} from '@ui-kitten/components/devsupport';
import React, {useState} from 'react';
import {
  Keyboard,
  StyleProp,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import {PrivateStackNavigator} from '../../utils/navigation.types';

type Props = {
  navigation: NativeStackNavigationProp<PrivateStackNavigator, 'PaymentModal'>;
  route: RouteProp<PrivateStackNavigator, 'PaymentModal'>;
};

const PaymentModal: React.FC<Props> = ({navigation, route}) => {
  const styles = useStyleSheet(Styles);
  const goBack = () => navigation.goBack();

  const [method, setMethod] = useState<number>(0);
  const [bonus, setBonus] = useState<boolean>(false);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.wrap}>
        <Layout style={styles.form}>
          <Text category="h5">{'Оплата'}</Text>
          <Method method={method} setMethod={setMethod} />

          <View style={styles.toggle}>
            <Text>Оплата бонусами:</Text>
            <Toggle checked={bonus} onChange={setBonus} />
          </View>

          {method === 2 ? (
            <>
              <Input
                style={{marginTop: 24}}
                label="Сумма наличными"
                selectTextOnFocus
                keyboardType="decimal-pad"
              />
              <Input
                style={{marginTop: 16}}
                label="Сумма безналом"
                selectTextOnFocus
                keyboardType="decimal-pad"
              />
            </>
          ) : (
            <Input
              style={{marginTop: 24}}
              label="Сумма к оплате"
              selectTextOnFocus
              keyboardType="decimal-pad"
            />
          )}
          {bonus && (
            <Input
              style={{marginTop: 16}}
              label="Сумма бонусами"
              selectTextOnFocus
              keyboardType="decimal-pad"
            />
          )}

          <View style={styles.all}>
            <Text appearance="hint">Итог:</Text>
            <Text status="primary">5000</Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <Button
              onPress={goBack}
              style={{flex: 1, marginRight: 5}}
              appearance="outline">
              Отмена
            </Button>
            <Button style={{flex: 1, marginLeft: 5}}>Оплата</Button>
          </View>
        </Layout>
      </View>
    </TouchableWithoutFeedback>
  );
};

type MethodProps = {
  method: number;
  setMethod: React.Dispatch<React.SetStateAction<number>>;
};

const Method: React.FC<MethodProps> = ({method, setMethod}) => {
  const theme = useTheme();

  const background = (index: number): StyleProp<ViewStyle> =>
    index === method
      ? {
          backgroundColor: theme['color-primary-500'],
        }
      : undefined;
  const status = (index: number): EvaStatus =>
    index === method ? 'control' : 'primary';
  const handleChangeMethod = (index: number) => setMethod(index);

  return (
    <>
      <Text style={{marginTop: 20}} appearance="hint">
        Способ оплаты
      </Text>
      <ButtonGroup style={{marginTop: 16}} appearance="outline">
        <Button style={background(0)} onPress={() => handleChangeMethod(0)}>
          {() => (
            <Text category="s2" status={status(0)}>
              Наличные
            </Text>
          )}
        </Button>
        <Button style={background(1)} onPress={() => handleChangeMethod(1)}>
          {() => (
            <Text category="s2" status={status(1)}>
              Безнал
            </Text>
          )}
        </Button>
        <Button style={background(2)} onPress={() => handleChangeMethod(2)}>
          {() => (
            <Text category="s2" status={status(2)}>
              Смешанный
            </Text>
          )}
        </Button>
      </ButtonGroup>
    </>
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
  form: {padding: 20, borderRadius: 5, width: '100%', alignItems: 'center'},
  toggle: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  all: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 16,
  },
});

export default PaymentModal;
