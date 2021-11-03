import React, {useState} from 'react';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';

import Navigator from './src/navigator/Navigator';

import {Provider as ReduxProvider} from 'react-redux';
import store from './src/redux/store';
import {Theme, ThemeContextProvider} from './src/context/ThemeContext';

export default (): React.ReactFragment => {
  const [theme, setTheme] = useState<Theme>('light');

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva[theme]}>
        <ReduxProvider store={store}>
          <ThemeContextProvider theme={theme} setTheme={setTheme}>
            <Navigator />
          </ThemeContextProvider>
        </ReduxProvider>
      </ApplicationProvider>
    </>
  );
};
