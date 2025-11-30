import type { ForecastPathsType, ForecastType } from '@koku-ui/utils/http/forecast/forecast';

export const forecastStateKey = 'forecast';

export function getFetchId(
  forecastPathsType: ForecastPathsType,
  forecastType: ForecastType,
  forecastQueryString: string
) {
  return `${forecastPathsType}--${forecastType}--${forecastQueryString}`;
}
