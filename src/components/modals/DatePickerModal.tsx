import {RouteProp} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  Button,
  Layout,
  StyleService,
  useStyleSheet,
  useTheme,
  Text,
} from '@ui-kitten/components';
import React, {useState} from 'react';
import {TouchableWithoutFeedback, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {useAppDispatch} from '../../redux';
import {convertDate} from '../../utils';
import {PrivateStackNavigator} from '../../utils/navigation.types';

type Props = {
  navigation: NativeStackNavigationProp<
    PrivateStackNavigator,
    'DatePickerModal'
  >;
  route: RouteProp<PrivateStackNavigator, 'DatePickerModal'>;
};

const DatePickerModal: React.FC<Props> = ({navigation, route}) => {
  const theme = useTheme();

  const dispatch = useAppDispatch();
  const styles = useStyleSheet(Styles);
  const goBack = () => navigation.goBack();

  const [datebegin, setDatebegin] = useState<Date>(new Date());
  const [dateend, setDateend] = useState<Date>(new Date());

  const handleSave = () => {
    dispatch(route.params.setDate(3, {datebegin, dateend}));
    goBack();
  };

  return (
    <TouchableWithoutFeedback onPress={goBack}>
      <View style={styles.wrap}>
        <Layout style={styles.form}>
          <Text>От: {convertDate(datebegin)}</Text>
          <DatePicker
            mode="date"
            date={datebegin}
            onDateChange={setDatebegin}
            maximumDate={new Date()}
            textColor={theme['color-primary-500']}
            title="Выберете дату"
            confirmText="Ок"
            cancelText="Отмена"
          />
          <Text>До: {convertDate(dateend)}</Text>
          <DatePicker
            mode="date"
            date={dateend}
            onDateChange={setDateend}
            maximumDate={new Date()}
            textColor={theme['color-primary-500']}
            title="Выберете дату"
            confirmText="Ок"
            cancelText="Отмена"
          />
          <Button onPress={handleSave} style={{marginTop: 20}}>
            ОК
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

export default DatePickerModal;
