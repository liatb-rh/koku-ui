import { getMaxMinValues } from './chartDatum';

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
  style?: any;
}

export const getChartNames = (series: ChartSeries[]) => {
  const result: string[] = [];
  if (series) {
    series.map(serie => {
      result.push(serie.childName || '');
    });
  }
  return result as any;
};

export const getDomain = (series: ChartSeries[], hiddenSeries: Set<number>, groupedSeriesCount = 0) => {
  const domain: { x?: any; y?: any } = { y: [0, 1] };
  let maxValue: number | null = null;
  let minValue: number | null = null;

  if (series) {
    if (series.length - groupedSeriesCount === hiddenSeries.size) {
      domain.x = [0, 1];
      hiddenSeries = new Set();
    }
    series.forEach((s: any, index) => {
      if (!isSeriesHidden(hiddenSeries, index) && s.data && s.data.length !== 0) {
        const { max = null, min = null } = getMaxMinValues(s.data as any);
        if (max !== null && (maxValue === null || max > maxValue)) {
          maxValue = max;
        }
        if (min !== null && (minValue === null || min < minValue)) {
          minValue = min;
        }
      }
    });
  }

  const threshold = (maxValue !== null && maxValue !== undefined ? maxValue : 0) * 0.05;
  const max = (maxValue !== null && maxValue !== undefined && maxValue > 0)
    ? Math.ceil(maxValue + threshold)
    : 0;

  const _min = (minValue !== null && minValue !== undefined && minValue > 0)
    ? Math.max(0, Math.floor(minValue - threshold))
    : 0;
  const min = _min > 0 ? _min : 0;

  if (max > 0) {
    domain.y = [min, max];
  }
  return domain;
};

export const getLegendData = (series: ChartSeries[], hiddenSeries: Set<number>, tooltip: boolean = false) => {
  if (!series) {
    return undefined;
  }
  const result: Array<ChartLegendItem & { childName?: string; hidden: boolean }> = [];
  series.map((s, index) => {
    if (s.legendItem) {
      const data: ChartLegendItem & { childName?: string; hidden: boolean } = {
        childName: s.childName,
        ...s.legendItem,
        hidden: hiddenSeries.has(index),
      };
      if (tooltip) {
        data.name = s.legendItem.tooltip;
      }
      result.push(data);
    }
  });
  return result;
};

export const getTooltipLabel = (
  datum: any,
  formatter: (value: number, unit?: string, options?: any) => string,
  formatOptions: any,
  labels: { cone: (v0: string, v1: string) => string; noData: string }
) => {
  const dy = datum.y !== undefined && datum.y !== null ? formatter(datum.y, datum.units, formatOptions) : undefined;
  const dy0 = datum.y0 !== undefined && datum.y0 !== null ? formatter(datum.y0, datum.units, formatOptions) : undefined;
  if (dy !== undefined && dy0 !== undefined) {
    return labels.cone(dy0, dy);
  }
  return dy !== undefined ? dy : labels.noData;
};

export const getResizeObserver = (containerRef: HTMLDivElement, handleResize: () => void) => {
  const containerElement = containerRef;
  const { ResizeObserver } = window as any;
  let _navToggle: any;
  let _resizeObserver: any;

  if (containerElement && ResizeObserver) {
    const resizeObserver = new ResizeObserver(entries => {
      window.requestAnimationFrame(() => {
        if (!Array.isArray(entries) || !entries.length) {
          return;
        }
        handleResize();
      });
    });
    resizeObserver.observe(containerElement);
    _resizeObserver = () => resizeObserver.unobserve(containerElement);
  } else {
    handleResize();
    window.addEventListener('resize', handleResize);
    _resizeObserver = () => window.removeEventListener('resize', handleResize);
    _navToggle = (window as any).insights?.chrome?.on?.('NAVIGATION_TOGGLE', setTimeout(handleResize, 500));
  }

  return () => {
    if (_resizeObserver) {
      _resizeObserver();
    }
    if (_navToggle) {
      _navToggle();
    }
  };
};

export const initHiddenSeries = (series: ChartSeries[], hiddenSeries: Set<number>, index: number) => {
  const result = new Set(hiddenSeries);
  if (!result.delete(index)) {
    result.add(index);
  }
  return result;
};

export const isDataAvailable = (series: ChartSeries[], hiddenSeries: Set<number>) => {
  const unavailable: number[] = [];
  if (series) {
    series.forEach((s: any, index) => {
      if (isSeriesHidden(hiddenSeries, index) || (s.data && s.data.length === 0)) {
        unavailable.push(index);
      }
    });
  }
  return unavailable.length !== (series ? series.length : 0);
};

export const isDataHidden = (series: ChartSeries[], hiddenSeries: Set<number>, data: any) => {
  if (data && data.length) {
    for (let keys = hiddenSeries.keys(), key; !(key = keys.next()).done; ) {
      let dataChildName: string | undefined;
      let serieChildName: string | undefined;
      for (const item of data) {
        if (item.childName) {
          dataChildName = item.childName;
          break;
        }
      }
      for (const item of (series as any)[key.value].data) {
        if (item.childName) {
          serieChildName = item.childName;
          break;
        }
      }
      if (serieChildName && dataChildName && serieChildName === dataChildName) {
        return true;
      }
    }
  }
  return false;
};

export const isSeriesHidden = (hiddenSeries: Set<number>, index: number) => {
  return hiddenSeries.has(index);
};


