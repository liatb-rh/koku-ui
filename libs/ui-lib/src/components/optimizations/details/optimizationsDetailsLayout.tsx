import { Card, CardBody, PageSection } from '@patternfly/react-core';
import React from 'react';

export interface OptimizationsDetailsLayoutProps {
  header: React.ReactNode;
  children: React.ReactNode;
}

export function OptimizationsDetailsLayout({ header, children }: OptimizationsDetailsLayoutProps) {
  return (
    <>
      <PageSection>{header}</PageSection>
      <PageSection>
        <Card>
          <CardBody>{children}</CardBody>
        </Card>
      </PageSection>
    </>
  );
}


