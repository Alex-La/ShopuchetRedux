import React, {useCallback, useState} from 'react';
import {
  ImageProps,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  Button,
  Icon,
  Input,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {PublicStackNavigator} from '../../../utils/navigation.types';

const User = (props?: Partial<ImageProps>) => (
  <Icon {...props} name="person-outline" />
);

const Email = (props?: Partial<ImageProps>) => (
  <Icon {...props} name="email-outline" />
);

const Phone = (props?: Partial<ImageProps>) => (
  <Icon {...props} name="phone-outline" />
);

const Lock = (props?: Partial<ImageProps>) => (
  <Icon {...props} name="lock-outline" />
);

const BackIcon = (props?: Partial<ImageProps>) => (
  <Icon {...props} name="arrow-ios-back-outline" />
);

type Props = {
  navigation: NativeStackNavigationProp<PublicStackNavigator, 'Forgot'>;
};

const Registration: React.FC<Props> = ({navigation}) => {
  const [name, setName] = useState<string>('');
  const [surname, setSurname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleChangeName = (text: string) => setName(text);
  const handleChangeSurname = (text: string) => setSurname(text);
  const handleChangeEmail = (text: string) => setEmail(text);
  const handleChangePhone = (text: string) => setPhone(text);
  const handleChangePassword = (text: string) => setPassword(text);

  //Navigation actions
  const goBack = () => navigation.canGoBack() && navigation.goBack();

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={goBack} />
  );
  //----------------

  //Password secure icon
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderToggleIcon = useCallback(
    (props?: Partial<ImageProps>) => (
      <TouchableOpacity onPress={toggleSecureEntry}>
        <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
      </TouchableOpacity>
    ),
    [secureTextEntry],
  );
  //--------------------

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Layout style={styles.wrap}>
        <TopNavigation accessoryLeft={BackAction} />
        <View style={styles.formWrap}>
          <Text category="h2">РЕГИСТРАЦИЯ</Text>
          <Input
            value={name}
            onChangeText={handleChangeName}
            accessoryLeft={User}
            placeholder="Имя"
            style={styles.name}
            size="large"
          />
          <Input
            value={surname}
            onChangeText={handleChangeSurname}
            accessoryLeft={User}
            placeholder="Фамилия"
            style={styles.input}
            size="large"
          />
          <Input
            value={email}
            onChangeText={handleChangeEmail}
            accessoryLeft={Email}
            placeholder="E-mail"
            style={styles.input}
            keyboardType="email-address"
            size="large"
          />
          <Input
            value={phone}
            onChangeText={handleChangePhone}
            accessoryLeft={Phone}
            placeholder="Телефон"
            style={styles.input}
            keyboardType="phone-pad"
            size="large"
          />
          <Input
            value={password}
            onChangeText={handleChangePassword}
            accessoryLeft={Lock}
            accessoryRight={renderToggleIcon}
            placeholder="Пароль"
            style={styles.input}
            size="large"
            secureTextEntry={secureTextEntry}
          />

          <Button style={styles.registration}>РЕГИСТРАЦИЯ</Button>
        </View>
      </Layout>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  wrap: {flex: 1},
  formWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  name: {marginTop: 50},
  input: {marginTop: 10},
  registration: {marginTop: 50, minWidth: 200},
});

export default Registration;
