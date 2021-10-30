import React, {useEffect, useState} from 'react';
import Preloader from '../components/loaders/Preloader';

import ErrorBoundary from '../components/loaders/ErrorBoundary';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import Public from './Public';
import Private from './Private';

import {useAppDispatch, useAppSelector} from '../redux';
import {getPrivateData} from '../redux/actions/private/privateActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setIsAuth} from '../redux/actions/authActions';

const Navigator: React.FC = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.fetch.appLoading);

  const isAuth = useAppSelector(state => state.auth.isAuth);

  useEffect(() => {
    if (isAuth) dispatch(getPrivateData());
  }, [isAuth]);

  useEffect(() => {
    AsyncStorage.getItem('accessToken').then(token => {
      if (!!token) dispatch(setIsAuth(true));
    });
  }, []);

  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <NavigationContainer>
          {loading ? <Preloader /> : isAuth ? <Private /> : <Public />}
        </NavigationContainer>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
};

export default Navigator;
