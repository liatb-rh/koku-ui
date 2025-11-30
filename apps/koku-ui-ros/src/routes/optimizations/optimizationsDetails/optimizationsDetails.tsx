import { OptimizationsDetailsLayout } from '@koku-ui/ui-lib/components/optimizations/details';
import React from 'react';
import { OptimizationsTable } from 'routes/optimizations/optimizationsTable';

import { OptimizationsDetailsHeader } from './optimizationsDetailsHeader';

interface OptimizationsDetailsOwnProps {
  breadcrumbLabel?: string;
  breadcrumbPath?: string;
  linkPath?: string; // Optimizations breakdown link path
  linkState?: any; // Optimizations breakdown link state
  projectPath?: string; // Project path (i.e., OCP details breakdown path)
}

type OptimizationsDetailsProps = OptimizationsDetailsOwnProps;

const OptimizationsDetails: React.FC<OptimizationsDetailsProps> = ({
  breadcrumbLabel,
  breadcrumbPath,
  linkPath,
  linkState,
  projectPath,
}) => {
  return (
    <OptimizationsDetailsLayout header={<OptimizationsDetailsHeader />}>
      <OptimizationsTable
        breadcrumbLabel={breadcrumbLabel}
        breadcrumbPath={breadcrumbPath}
        isOptimizationsDetails
        linkPath={linkPath}
        linkState={linkState}
        projectPath={projectPath}
      />
    </OptimizationsDetailsLayout>
  );
};

export default OptimizationsDetails;
