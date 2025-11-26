import './summary.css';

import {
  Button,
  ButtonVariant,
  Card,
  CardBody,
  CardTitle,
  Popover,
  Title,
  TitleSizes,
} from '@patternfly/react-core';
import { OutlinedQuestionCircleIcon } from '@patternfly/react-icons/dist/esm/icons/outlined-question-circle-icon';
import React from 'react';
import { Link } from 'react-router-dom';

interface OptimizationsSummaryProps {
  description: React.ReactNode;
  infoAriaLabel?: string;
  infoBody?: React.ReactNode;
  infoButtonAriaLabel?: string;
  isLoading?: boolean;
  linkPath?: string;
  linkState?: any;
  title: string;
}

const OptimizationsSummary: React.FC<OptimizationsSummaryProps> = ({
  description,
  infoAriaLabel,
  infoBody,
  infoButtonAriaLabel,
  isLoading,
  linkPath,
  linkState,
  title,
}) => {
  return (
    <Card className="summary">
      <CardTitle>
        <Title headingLevel="h2" size={TitleSizes.lg}>
          {title}
          {infoBody && (
            <span className="infoIcon">
              <Popover aria-label={infoAriaLabel} enableFlip bodyContent={infoBody}>
                <Button icon={<OutlinedQuestionCircleIcon />} aria-label={infoButtonAriaLabel} variant={ButtonVariant.plain} />
              </Popover>
            </span>
          )}
        </Title>
      </CardTitle>
      <CardBody>
        {isLoading ? (
          <>
            <div className="skeleton skeleton-line" />
            <div className="skeleton skeleton-block" />
          </>
        ) : linkPath ? (
          <Link to={linkPath} state={{ ...linkState }}>
            {description}
          </Link>
        ) : (
          description
        )}
      </CardBody>
    </Card>
  );
};

export { OptimizationsSummary };


