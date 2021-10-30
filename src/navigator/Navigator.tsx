import React, {useEffect} from 'react';

import ErrorBoundary from '../components/loaders/ErrorBoundary';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import Public from './Public';
import Private from './Private';

import {useAppDispatch, useAppSelector} from '../redux';
import {checkToken} from '../redux/actions/authActions';

const Navigator: React.FC = () => {
  const dispatch = useAppDispatch();

  const isAuth = useAppSelector(state => state.auth.isAuth);

  useEffect(() => {
    dispatch(checkToken());
  }, []);

  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <NavigationContainer>
          {isAuth ? <Private /> : <Public />}
        </NavigationContainer>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
};

export default Navigator;
