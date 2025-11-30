import type { OptimizationType } from '@koku-ui/utils/commonTypes';
import { Interval } from '@koku-ui/utils/commonTypes';
import type { Query } from '@koku-ui/utils/http/queries/query';
import type { Recommendations } from '@koku-ui/utils/http/reports/recommendations';
import { hasRecommendation } from '@koku-ui/utils/recommendations';
import messages from 'locales/messages';
import React from 'react';
import { PerspectiveSelect } from 'routes/components/perspective/perspectiveSelect';
import { hasNotifications } from 'utils/notifications';

interface OptimizationsBreakdownToolbarOwnProps {
  currentInterval?: string;
  isDisabled?: boolean;
  onSelect?: (value: string) => void;
  query?: Query;
  optimizationType?: OptimizationType;
  recommendations?: Recommendations;
}

type OptimizationsBreakdownToolbarProps = OptimizationsBreakdownToolbarOwnProps;

const OptimizationsBreakdownToolbar: React.FC<OptimizationsBreakdownToolbarProps> = ({
  currentInterval,
  isDisabled,
  onSelect,
  optimizationType,
  recommendations,
}) => {
  const getOptions = () => {
    const terms = recommendations?.recommendation_terms;
    return [
      {
        isDisabled:
          !hasRecommendation(terms?.short_term?.recommendation_engines?.[optimizationType]?.config) &&
          !hasNotifications(recommendations, Interval.short_term, optimizationType),
        label: messages.optimizationsShortTerm,
        value: Interval.short_term,
      },
      {
        isDisabled:
          !hasRecommendation(terms?.medium_term?.recommendation_engines?.[optimizationType]?.config) &&
          !hasNotifications(recommendations, Interval.medium_term, optimizationType),
        label: messages.optimizationsMediumTerm,
        value: Interval.medium_term,
      },
      {
        isDisabled:
          !hasRecommendation(terms?.long_term?.recommendation_engines?.[optimizationType]?.config) &&
          !hasNotifications(recommendations, Interval.long_term, optimizationType),
        label: messages.optimizationsLongTerm,
        value: Interval.long_term,
      },
    ];
  };

  const options = getOptions();

  return (
    <PerspectiveSelect
      currentItem={currentInterval || options[0].value}
      isDisabled={isDisabled}
      onSelect={onSelect}
      options={options}
      title={messages.optimizationsPerspective}
    />
  );
};

export { OptimizationsBreakdownToolbar };
