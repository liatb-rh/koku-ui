import {
  getChartNames as libGetChartNames,
  getDomain as libGetDomain,
  getLegendData as libGetLegendData,
  getResizeObserver as libGetResizeObserver,
  getTooltipLabel as libGetTooltipLabel,
  initHiddenSeries as libInitHiddenSeries,
  isDataAvailable as libIsDataAvailable,
  isDataHidden as libIsDataHidden,
  isSeriesHidden as libIsSeriesHidden,
} from '@koku-ui/ui-lib/components/charts/common';
import { getInteractiveLegendItemStyles } from '@patternfly/react-charts/victory';
import { intl } from 'components/i18n';
import messages from 'locales/messages';
import type { Formatter } from 'utils/format';
import type { DomainTuple, VictoryStyleInterface } from 'victory-core';

import { getTooltipContent } from './chartDatum';

export interface ChartData {
  childName?: string;
  units?: string;
}

export interface ChartLegendItem {
  childName?: string;
  name?: string;
  symbol?: any;
  tooltip?: string;
}

export interface ChartSeries {
  childName?: string;
  data?: [ChartData];
  legendItem?: ChartLegendItem;
  style?: VictoryStyleInterface;
}

// Returns groups of chart names associated with each data series
export const getChartNames = (series: ChartSeries[]) => libGetChartNames(series as any) as any;

// Note: A series may be grouped in order to be hidden / shown together
export const getDomain = (series: ChartSeries[], hiddenSeries: Set<number>, groupedSeriesCount = 0) =>
  libGetDomain(series as any, hiddenSeries, groupedSeriesCount) as { x?: DomainTuple; y?: DomainTuple };

// Returns legend data styled per hiddenSeries
export const getLegendData = (series: ChartSeries[], hiddenSeries: Set<number>, tooltip: boolean = false) => {
  const data = libGetLegendData(series as any, hiddenSeries, tooltip);
  if (!data) {
    return data;
  }
  return (data as any[]).map((item, index) => ({
    ...item,
    ...getInteractiveLegendItemStyles(hiddenSeries.has(index)),
  }));
};

// Note: Forecast is expected to use both datum.y and datum.y0
export const getTooltipLabel = (datum: any, formatter: Formatter, formatOptions: any) => {
  const tooltipFormatter = getTooltipContent(formatter);
  return libGetTooltipLabel(
    datum,
    (value: number, unit?: string, options?: any) => tooltipFormatter(value, unit, options),
    formatOptions,
    {
      cone: (v0: string, v1: string) =>
        intl.formatMessage(messages.chartCostForecastConeTooltip, { value0: v0, value1: v1 }),
      noData: intl.formatMessage(messages.chartNoData),
    }
  );
};

export const getResizeObserver = (containerRef: HTMLDivElement, handleResize: () => void) =>
  libGetResizeObserver(containerRef, handleResize);

export const initHiddenSeries = (series: ChartSeries[], hiddenSeries: Set<number>, index: number) =>
  libInitHiddenSeries(series as any, hiddenSeries, index);

// Returns true if at least one data series is available
export const isDataAvailable = (series: ChartSeries[], hiddenSeries: Set<number>) =>
  libIsDataAvailable(series as any, hiddenSeries);

// Returns true if data series is hidden
export const isDataHidden = (series: ChartSeries[], hiddenSeries: Set<number>, data: any) =>
  libIsDataHidden(series as any, hiddenSeries, data);

// Returns true if data series is hidden
export const isSeriesHidden = (hiddenSeries: Set<number>, index: number) => libIsSeriesHidden(hiddenSeries, index);
