import React, {useCallback, useState} from 'react';
import {
  ImageProps,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {Button, Icon, Input, Layout, Text} from '@ui-kitten/components';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {PublicStackNavigator} from '../../utils/navigation.types';

const Email = (props?: Partial<ImageProps>) => (
  <Icon {...props} name="email-outline" />
);

const Lock = (props?: Partial<ImageProps>) => (
  <Icon {...props} name="lock-outline" />
);

type Props = {
  navigation: NativeStackNavigationProp<PublicStackNavigator, 'Login'>;
};

const Login: React.FC<Props> = ({navigation}) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleChangeEmail = (text: string) => setEmail(text);
  const handleChangePassword = (text: string) => setPassword(text);

  //Navigation actions
  const navToForgot = () => navigation.navigate('Forgot');
  const navToReg = () => navigation.navigate('Registration');
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
        <Text category="h2">ВХОД</Text>
        <Input
          value={email}
          onChangeText={handleChangeEmail}
          accessoryLeft={Email}
          placeholder="E-mail"
          keyboardType="email-address"
          style={styles.email}
          size="large"
        />
        <Input
          value={password}
          onChangeText={handleChangePassword}
          accessoryLeft={Lock}
          accessoryRight={renderToggleIcon}
          placeholder="Password"
          style={styles.password}
          secureTextEntry={secureTextEntry}
          size="large"
        />
        <TouchableOpacity style={styles.forgot} onPress={navToForgot}>
          <Text status="primary">Забыли пароль?</Text>
        </TouchableOpacity>
        <Button style={styles.login}>ВХОД</Button>
        <Button
          style={styles.registration}
          appearance="ghost"
          onPress={navToReg}>
          РЕГИСТРАЦИЯ
        </Button>
      </Layout>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  wrap: {flex: 1, justifyContent: 'center', alignItems: 'center', padding: 15},
  email: {marginTop: 50},
  password: {marginTop: 10},
  forgot: {marginTop: 8, alignSelf: 'flex-start'},
  login: {marginTop: 50, minWidth: 200},
  registration: {marginTop: 10, minWidth: 200},
});

export default Login;
