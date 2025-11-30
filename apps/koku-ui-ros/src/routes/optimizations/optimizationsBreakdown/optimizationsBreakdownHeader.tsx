import { BreakdownHeaderShell } from '@koku-ui/ui-lib/components/optimizations/breakdown';
import type { OptimizationType } from '@koku-ui/utils/commonTypes';
import type { RecommendationReportData } from '@koku-ui/utils/http/reports/recommendations';
import { Content, ContentVariants, Icon } from '@patternfly/react-core';
import { ExclamationTriangleIcon } from '@patternfly/react-icons/dist/esm/icons/exclamation-triangle-icon';
import messages from 'locales/messages';
import React from 'react';
import { useIntl } from 'react-intl';
import { Link, useLocation } from 'react-router-dom';
import { getTimeFromNow } from 'utils/dates';
import { hasNotificationsWarning } from 'utils/notifications';

import { OptimizationsBreakdownProjectLink } from './optimizationsBreakdownProjectLink';
import { OptimizationsBreakdownToolbar } from './optimizationsBreakdownToolbar';

interface OptimizationsBreakdownHeaderOwnProps {
  breadcrumbLabel?: string;
  breadcrumbPath?: string;
  currentInterval?: string;
  isDisabled?: boolean;
  isOptimizationsDetails?: boolean;
  projectPath?: string;
  onSelect?: (value: string) => void;
  optimizationType?: OptimizationType;
  report?: RecommendationReportData;
}

type OptimizationsBreakdownHeaderProps = OptimizationsBreakdownHeaderOwnProps;

const OptimizationsBreakdownHeader: React.FC<OptimizationsBreakdownHeaderProps> = ({
  breadcrumbLabel,
  breadcrumbPath,
  currentInterval,
  isDisabled,
  isOptimizationsDetails,
  onSelect,
  optimizationType,
  projectPath,
  report,
}) => {
  const intl = useIntl();
  const location = useLocation();
  const showWarningIcon = hasNotificationsWarning(report?.recommendations);

  const backLink = (
    <Link to={breadcrumbPath} state={{ ...location.state }}>
      {breadcrumbLabel ? breadcrumbLabel : intl.formatMessage(messages.breakdownBackToOptimizations)}
    </Link>
  );

  const description = (() => {
    const clusterAlias = report?.cluster_alias ? report.cluster_alias : undefined;
    const clusterUuid = report?.cluster_uuid ? report.cluster_uuid : '';
    const cluster = clusterAlias ? clusterAlias : clusterUuid;

    const lastReported = report ? getTimeFromNow(report.last_reported) : '';
    const project = report?.project ? report.project : undefined;
    const workload = report?.workload ? report.workload : undefined;
    const workloadType = report?.workload_type ? report.workload_type : '';

    return (
      <Content>
        <Content component={ContentVariants.dl}>
          <Content component={ContentVariants.dt}>
            {intl.formatMessage(messages.optimizationsValues, { value: 'last_reported' })}
          </Content>
          <Content component={ContentVariants.dd}>{lastReported}</Content>
          <Content component={ContentVariants.dt}>
            {intl.formatMessage(messages.optimizationsValues, { value: 'cluster' })}
          </Content>
          <Content component={ContentVariants.dd}>{cluster}</Content>
          <Content component={ContentVariants.dt}>
            {intl.formatMessage(messages.optimizationsValues, { value: 'project' })}
          </Content>
          <Content component={ContentVariants.dd}>
            <OptimizationsBreakdownProjectLink
              breadcrumbLabel={intl.formatMessage(messages.breakdownBackToOptimizationsProject, { value: project })}
              isOptimizationsDetails={isOptimizationsDetails}
              linkPath={projectPath}
              project={project}
            />
          </Content>
          <Content component={ContentVariants.dt}>
            {intl.formatMessage(messages.optimizationsValues, { value: 'workload_type' })}
          </Content>
          <Content component={ContentVariants.dd}>{workloadType}</Content>
          <Content component={ContentVariants.dt}>
            {intl.formatMessage(messages.optimizationsValues, { value: 'workload' })}
          </Content>
          <Content component={ContentVariants.dd}>{workload}</Content>
        </Content>
      </Content>
    );
  })();

  return (
    <BreakdownHeaderShell
      backLink={backLink}
      title={report ? report.container : null}
      rightAdornment={
        showWarningIcon ? (
          <Icon status="warning">
            <ExclamationTriangleIcon />
          </Icon>
        ) : null
      }
      description={description}
      toolbar={
        <OptimizationsBreakdownToolbar
          currentInterval={currentInterval}
          isDisabled={isDisabled}
          onSelect={onSelect}
          optimizationType={optimizationType}
          recommendations={report?.recommendations}
        />
      }
    />
  );
};

export { OptimizationsBreakdownHeader };
