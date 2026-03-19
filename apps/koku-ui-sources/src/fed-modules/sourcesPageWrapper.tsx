import UiVersion from '@koku-ui/ui-lib/components/page/uiVersion';
import { ErrorBoundary } from 'components/ErrorBoundary';
import { getLocale, ignoreDefaultMessageError } from 'components/i18n';
import messages from 'locales/messages';
import React from 'react';
import { IntlProvider, useIntl } from 'react-intl';
import { Provider, useSelector } from 'react-redux';
import type { RootState } from 'redux/store';
import { sourcesStore } from 'redux/store';

// eslint-disable-next-line no-restricted-imports
import dataMessages from '../../locales/data.json';

export interface SourcesPageWrapperProps {
  canWrite?: boolean;
}

/** PR 2: exercises i18n + Redux; full SourcesPage lands in PR 3. */
const SourcesPr2Placeholder: React.FC = () => {
  const intl = useIntl();
  const count = useSelector((s: RootState) => s.sources.count);

  return (
    <div data-testid="sources-skeleton" data-ouia-component-id="sources-skeleton">
      <span>{intl.formatMessage(messages.sourcesTabTitle)}</span>
      <span data-testid="sources-redux-count">{count}</span>
    </div>
  );
};

const SourcesPageWrapper: React.FC<SourcesPageWrapperProps> = () => {
  const locale = getLocale();
  const messagesByLocale = dataMessages as Record<string, Record<string, string>>;

  return (
    <IntlProvider
      defaultLocale="en"
      locale={locale}
      messages={messagesByLocale[locale] || messagesByLocale.en}
      onError={ignoreDefaultMessageError}
    >
      <Provider store={sourcesStore}>
        <ErrorBoundary>
          <SourcesPr2Placeholder />
        </ErrorBoundary>
        <UiVersion />
      </Provider>
    </IntlProvider>
  );
};

export default SourcesPageWrapper;
