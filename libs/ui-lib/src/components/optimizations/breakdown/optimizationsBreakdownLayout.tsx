import { PageSection } from '@patternfly/react-core';
import React from 'react';

export interface OptimizationsBreakdownLayoutProps {
  header: React.ReactNode;
  tabs: React.ReactNode;
  children: React.ReactNode;
  headerStyle?: React.CSSProperties;
}

export function OptimizationsBreakdownLayout({
  header,
  tabs,
  children,
  headerStyle,
}: OptimizationsBreakdownLayoutProps) {
  return (
    <>
      <PageSection style={headerStyle}>{header}</PageSection>
      <PageSection>{tabs}</PageSection>
      <PageSection>{children}</PageSection>
    </>
  );
}


