import React, {useState} from 'react';
import {
  Button,
  Divider,
  Icon,
  Input,
  Layout,
  Text,
  useTheme,
} from '@ui-kitten/components';
import {ImageProps, StyleSheet, TouchableOpacity, View} from 'react-native';
import Preloader from '../../../../loaders/Preloader';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ProfileStackNavigator} from '../../../../../utils/navigation.types';
import {RouteProp} from '@react-navigation/core';

import {useAppDispatch, useAppSelector} from '../../../../../redux';
import {updateUser} from '../../../../../redux/actions/private/profileActions';
import {show} from '../../../../../utils/snackbar';

type Props = {
  navigation: NativeStackNavigationProp<ProfileStackNavigator, 'Edit'>;
  route: RouteProp<ProfileStackNavigator, 'Edit'>;
};

const Edit: React.FC<Props> = ({navigation, route}) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.fetch.loading);

  const [name, setName] = useState<string>(route.params.nm);
  const [surname, setSurname] = useState<string>(route.params.fn);
  const [email, setEmail] = useState<string>(route.params.login);
  const [phone, setPhone] = useState<string>(
    route.params.phone === 'null' ? '' : route.params.phone,
  );
  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');

  const theme = useTheme();

  const goBack = () => navigation.goBack();

  const RenderAcceptAction = (props: Partial<ImageProps>) => (
    <TouchableOpacity onPress={goBack}>
      <Icon {...props} name="checkmark" fill={theme['color-primary-500']} />
    </TouchableOpacity>
  );

  const update = () =>
    dispatch(
      updateUser(surname, name, phone, oldPassword, newPassword, email),
    ).then(res => {
      if (res) {
        show({text: res, type: 'success'});
        goBack();
      }
    });

  if (loading) return <Preloader />;

  return (
    <Layout style={styles.wrap}>
      <View style={styles.row}>
        <Text category="h6" status="primary">
          Личные данные
        </Text>
        <RenderAcceptAction width={20} height={20} />
      </View>
      <Divider style={{marginTop: 16}} />

      <View style={{marginTop: 13}}>
        <Input
          size="large"
          placeholder="Имя"
          value={name}
          onChangeText={t => setName(t)}
        />
        <Input
          size="large"
          placeholder="Фамилия"
          style={{marginTop: 10}}
          value={surname}
          onChangeText={t => setSurname(t)}
        />
        <Input
          size="large"
          placeholder="E-mail"
          style={{marginTop: 10}}
          value={email}
          onChangeText={t => setEmail(t)}
        />
        <Input
          size="large"
          placeholder="Телефон"
          style={{marginTop: 10}}
          value={phone}
          onChangeText={t => setPhone(t)}
        />
        <Divider style={{marginTop: 10, marginBottom: 10}} />
        <Input
          size="large"
          placeholder="Старый пароль"
          value={oldPassword}
          onChangeText={t => setOldPassword(t)}
        />
        <Input
          size="large"
          placeholder="Новый пароль"
          style={{marginTop: 10}}
          value={newPassword}
          onChangeText={t => setNewPassword(t)}
        />
      </View>
      <Button style={{marginTop: 30}} onPress={update}>
        Сохранить
      </Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  wrap: {flex: 1, padding: 16},
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default Edit;
