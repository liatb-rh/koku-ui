import { OptimizationsDetailsHeaderShell } from '@koku-ui/ui-lib/components/optimizations/details';
import messages from 'locales/messages';
import React from 'react';
import { useIntl } from 'react-intl';

interface OptimizationsDetailsHeaderOwnProps {
  // TBD...
}

type OptimizationsDetailsHeaderProps = OptimizationsDetailsHeaderOwnProps;

const OptimizationsDetailsHeader: React.FC<OptimizationsDetailsHeaderProps> = () => {
  const intl = useIntl();

  return (
    <OptimizationsDetailsHeaderShell
      title={intl.formatMessage(messages.optimizations)}
      infoAriaLabel={intl.formatMessage(messages.optimizationsInfoArialLabel)}
      infoButtonAriaLabel={intl.formatMessage(messages.optimizationsInfoButtonArialLabel)}
      infoContent={
        <>
          <p>{intl.formatMessage(messages.optimizationsInfoTitle)}</p>
          <br />
          <p>
            {intl.formatMessage(messages.optimizationsInfoDesc, {
              learnMore: (
                <a href={intl.formatMessage(messages.docsOptimizations)} rel="noreferrer" target="_blank">
                  {intl.formatMessage(messages.learnMore)}
                </a>
              ),
            })}
          </p>
        </>
      }
    />
  );
};

export { OptimizationsDetailsHeader };
