import { Button, ButtonVariant, Popover, Title, TitleSizes } from '@patternfly/react-core';
import { OutlinedQuestionCircleIcon } from '@patternfly/react-icons/dist/esm/icons/outlined-question-circle-icon';
import t_global_font_size_md from '@patternfly/react-tokens/dist/js/t_global_font_size_md';
import t_global_spacer_sm from '@patternfly/react-tokens/dist/js/t_global_spacer_sm';
import React from 'react';

interface Styles {
  [className: string]: React.CSSProperties;
}

const styles: Styles = {
  headerContainer: {
    paddingBottom: 0,
  },
  infoIcon: {
    fontSize: t_global_font_size_md.value,
  },
  title: {
    paddingBottom: t_global_spacer_sm.var,
  },
};

export interface OptimizationsDetailsHeaderShellProps {
  title: React.ReactNode;
  infoAriaLabel: string;
  infoButtonAriaLabel: string;
  infoContent: React.ReactNode;
}

export function OptimizationsDetailsHeaderShell({
  title,
  infoAriaLabel,
  infoButtonAriaLabel,
  infoContent,
}: OptimizationsDetailsHeaderShellProps) {
  return (
    <header style={styles.headerContainer}>
      <Title headingLevel="h1" style={styles.title} size={TitleSizes['2xl']}>
        {title}
        <span style={styles.infoIcon}>
          <Popover aria-label={infoAriaLabel} enableFlip bodyContent={infoContent}>
            <Button icon={<OutlinedQuestionCircleIcon />} aria-label={infoButtonAriaLabel} variant={ButtonVariant.plain} />
          </Popover>
        </span>
      </Title>
    </header>
  );
}


