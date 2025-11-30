import { Title, TitleSizes } from '@patternfly/react-core';
import t_global_spacer_sm from '@patternfly/react-tokens/dist/js/t_global_spacer_sm';
import React from 'react';

interface Styles {
  [className: string]: React.CSSProperties;
}

const styles: Styles = {
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    columnGap: t_global_spacer_sm.value,
  },
  section: {
    marginTop: t_global_spacer_sm.value,
  },
};

export interface BreakdownHeaderShellProps {
  backLink: React.ReactNode;
  title: React.ReactNode;
  rightAdornment?: React.ReactNode;
  description: React.ReactNode;
  toolbar: React.ReactNode;
}

export function BreakdownHeaderShell({
  backLink,
  title,
  rightAdornment,
  description,
  toolbar,
}: BreakdownHeaderShellProps) {
  return (
    <header>
      {backLink}
      <div style={styles.titleContainer}>
        <Title headingLevel="h1" size={TitleSizes['2xl']}>
          {title}
        </Title>
        {rightAdornment}
      </div>
      <div style={styles.section}>{description}</div>
      <div style={styles.section}>{toolbar}</div>
    </header>
  );
}


