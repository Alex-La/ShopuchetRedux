import React from 'react';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';

import Navigator from './src/navigator/Navigator';

import {Provider as ReduxProvider} from 'react-redux';
import store from './src/redux/store';

export default (): React.ReactFragment => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={eva.light}>
      <ReduxProvider store={store}>
        <Navigator />
      </ReduxProvider>
    </ApplicationProvider>
  </>
);
