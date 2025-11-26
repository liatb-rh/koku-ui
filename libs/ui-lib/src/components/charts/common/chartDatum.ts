export interface ChartDatum {
  childName?: string;
  date?: string;
  key: string | number;
  name?: string | number;
  show?: boolean;
  tooltip?: string;
  units: string;
  x: string | number;
  y: number;
  y0?: number;
}

export function getDatumDateRange(datums: ChartDatum[]): [Date, Date] {
  let firstDay = 0;
  for (let i = firstDay; i < datums.length; i++) {
    if (datums[i]?.key && datums[i]?.y !== null) {
      firstDay = i;
      break;
    }
  }
  let lastDay = datums.length - 1;
  for (let i = lastDay; i >= 0; i--) {
    if (datums[i]?.key && datums[i].y !== null) {
      lastDay = i;
      break;
    }
  }
  const start = new Date(datums[firstDay].key);
  const end = new Date(datums[lastDay].key);
  return [start, end];
}

export function getDateRangeString(
  datums: ChartDatum[],
  opts: {
    isSameDate?: boolean;
    formatDateTimeRange: (start: Date, end: Date) => string;
    formatMessage: (args: { dateRange: string }) => string;
    noData: string;
  }
) {
  if (!(datums?.length && opts)) {
    return opts?.noData ?? '';
  }
  const [start, end] = getDatumDateRange(datums);
  const dateRange = opts.formatDateTimeRange(opts.isSameDate ? end : start, end);
  return opts.formatMessage({ dateRange });
}

export function getMaxMinValues(datums: ChartDatum[]) {
  let max: number | null = null;
  let min: number | null = null;
  if (datums && datums.length) {
    datums.forEach(datum => {
      const maxY =
        datum.y0 !== undefined
          ? Math.max(datum.y, datum.y0)
          : Array.isArray(datum.y)
            ? datum.y[0] !== null
              ? Math.max(...(datum.y as unknown as number[]))
              : (datum as any).yVal !== null
                ? (datum as any).yVal
                : null
            : (datum.y as unknown as number);
      const minY =
        datum.y0 !== undefined
          ? Math.min(datum.y, datum.y0)
          : Array.isArray(datum.y)
            ? datum.y[0] !== null
              ? Math.min(...(datum.y as unknown as number[]))
              : (datum as any).yVal
                ? (datum as any).yVal
                : null
            : (datum.y as unknown as number);
      if ((max === null || (maxY as number) > max) && maxY !== null) {
        max = maxY as number;
      }
      if ((min === null || (minY as number) < min) && minY !== null) {
        min = minY as number;
      }
    });
  }
  return { max, min };
}

export function getTooltipContent(
  formatter: (value: number, unit?: string, options?: any) => string,
  formatUnitMessage?: (units: string, formattedValue: string) => string
) {
  return function labelFormatter(value: number, unit: string = null, options: any = {}) {
    const formatted = formatter(value, unit, options);
    if (formatUnitMessage) {
      return formatUnitMessage(unit, formatted);
    }
    return formatted;
  };
}

export function isInt(n) {
  const result = Number(n) === n && n % 1 === 0;
  return result && n >= 0;
}

export function isFloat(n) {
  const result = Number(n) === n && n % 1 !== 0;
  return result && n >= 0;
}


