import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { store } from '../../redux/store';
import InitAxios from '../InitAxios';
import PermissionsChecker from '../PermissionsChecker';
import AppLayout from './AppLayout';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <IntlProvider locale="en">
        <BrowserRouter>
          <InitAxios>
            <PermissionsChecker>
              <AppLayout />
            </PermissionsChecker>
          </InitAxios>
        </BrowserRouter>
      </IntlProvider>
    </Provider>
  );
};

export default App;
