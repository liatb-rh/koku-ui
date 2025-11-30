import type { RecommendationValues, Recommendations, RecommendationTerm } from './http/reports/recommendations';
import { Interval } from './commonTypes';

export function getRecommendationTerm(recommendations: Recommendations, interval: Interval): RecommendationTerm | undefined {
  if (!recommendations) {
    return undefined;
  }
  let result: RecommendationTerm | undefined;
  switch (interval) {
    case Interval.short_term:
      result = recommendations?.recommendation_terms?.short_term;
      break;
    case Interval.medium_term:
      result = recommendations?.recommendation_terms?.medium_term;
      break;
    case Interval.long_term:
      result = recommendations?.recommendation_terms?.long_term;
      break;
  }
  return result;
}

export function hasRecommendation(values: RecommendationValues | undefined) {
  if (!values) {
    return false;
  }
  const hasConfigLimitsCpu = hasRecommendationValues(values, 'limits', 'cpu');
  const hasConfigLimitsMemory = hasRecommendationValues(values, 'limits', 'memory');
  const hasConfigRequestsCpu = hasRecommendationValues(values, 'requests', 'cpu');
  const hasConfigRequestsMemory = hasRecommendationValues(values, 'requests', 'memory');
  return hasConfigLimitsCpu || hasConfigLimitsMemory || hasConfigRequestsCpu || hasConfigRequestsMemory;
}

// Helper to determine if config and variation are empty objects
// Example: key1 = limits/requests, key2 = cpu/memory
export function hasRecommendationValues(
  values: RecommendationValues,
  key1: 'limits' | 'requests',
  key2: 'cpu' | 'memory'
) {
  let result = false;
  if (values && values[key1] && values[key1][key2]) {
    result = Object.keys(values[key1][key2]).length > 0;
  }
  return result;
}


