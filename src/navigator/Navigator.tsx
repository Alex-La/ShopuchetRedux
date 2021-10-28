import React from 'react';

import ErrorBoundary from '../components/loaders/ErrorBoundary';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import Public from './Public';
import Private from './Private';

import {useAppSelector} from '../redux';

const Navigator: React.FC = () => {
  const isAuth = useAppSelector(state => state.auth.isAuth);

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
