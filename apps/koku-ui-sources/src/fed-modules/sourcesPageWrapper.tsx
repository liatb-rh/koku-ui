import UiVersion from '@koku-ui/ui-lib/components/page/uiVersion';
import { Bullseye, Spinner } from '@patternfly/react-core';
import { ErrorBoundary } from 'components/ErrorBoundary';
import { getLocale, ignoreDefaultMessageError } from 'components/i18n';
import { SourcesPage } from 'components/sourcesPage/SourcesPage';
import React, { useEffect, useState } from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { sourcesStore } from 'redux/store';

// eslint-disable-next-line no-restricted-imports
import dataMessages from '../../locales/data.json';

export interface SourcesPageWrapperProps {
  canWrite?: boolean;
}

const useMswReady = (): boolean => {
  const [ready, setReady] = useState(() => process.env.SOURCES_ENABLE_MSW !== 'true');

  useEffect(() => {
    if (process.env.SOURCES_ENABLE_MSW !== 'true') {
      return;
    }
    let cancelled = false;
    void import('api/mock/enableMocks')
      .then(({ enableMocking }) => enableMocking())
      .catch(() => {})
      .finally(() => {
        if (!cancelled) {
          setReady(true);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return ready;
};

const SourcesPageWrapper: React.FC<SourcesPageWrapperProps> = ({ canWrite = false }) => {
  const locale = getLocale();
  const messagesByLocale = dataMessages as Record<string, Record<string, string>>;
  const mswReady = useMswReady();

  if (!mswReady) {
    return (
      <Bullseye style={{ minHeight: 200 }}>
        <Spinner size="lg" aria-label="Starting mock API" />
      </Bullseye>
    );
  }

  return (
    <IntlProvider
      defaultLocale="en"
      locale={locale}
      messages={messagesByLocale[locale] || messagesByLocale.en}
      onError={ignoreDefaultMessageError}
    >
      <Provider store={sourcesStore}>
        <ErrorBoundary>
          <SourcesPage canWrite={canWrite} />
        </ErrorBoundary>
        <UiVersion />
      </Provider>
    </IntlProvider>
  );
};

export default SourcesPageWrapper;
