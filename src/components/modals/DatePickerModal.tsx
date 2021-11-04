import {RouteProp} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  Button,
  Datepicker,
  Layout,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';
import React, {useState} from 'react';
import {TouchableWithoutFeedback, View} from 'react-native';
import {useAppDispatch} from '../../redux';
import {PrivateStackNavigator} from '../../utils/navigation.types';

type Props = {
  navigation: NativeStackNavigationProp<
    PrivateStackNavigator,
    'DatePickerModal'
  >;
  route: RouteProp<PrivateStackNavigator, 'DatePickerModal'>;
};

const DatePickerModal: React.FC<Props> = ({navigation, route}) => {
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
          <Datepicker label="От:" date={datebegin} onSelect={setDatebegin} />
          <Datepicker
            style={{marginTop: 10}}
            label="До:"
            date={dateend}
            onSelect={setDateend}
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
