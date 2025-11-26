import type { MessageDescriptor } from '@formatjs/intl/src/types';
import {
  getDateRangeString as libGetDateRangeString,
  getDatumDateRange as libGetDatumDateRange,
  getMaxMinValues as libGetMaxMinValues,
  getTooltipContent as libGetTooltipContent,
  isFloat as libIsFloat,
  isInt as libIsInt,
} from '@koku-ui/ui-lib/components/charts/common';
import { intl } from 'components/i18n';
import messages from 'locales/messages';
import { unitsLookupKey } from 'utils/format';

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
  return libGetDatumDateRange(datums);
}

export function getDateRangeString(
  datums: ChartDatum[],
  key: MessageDescriptor,
  isSameDate: boolean = false,
  noDataKey: MessageDescriptor = messages.chartNoData
) {
  return libGetDateRangeString(datums, {
    isSameDate,
    formatDateTimeRange: (start, end) =>
      intl.formatDateTimeRange(start, end, {
        day: 'numeric',
        month: 'short',
      }),
    formatMessage: ({ dateRange }) => intl.formatMessage(key, { dateRange }),
    noData: intl.formatMessage(noDataKey),
  });
}

export function getMaxMinValues(datums: ChartDatum[]) {
  return libGetMaxMinValues(datums);
}

export function getTooltipContent(formatter) {
  return libGetTooltipContent(
    (value: number, unit?: string, options?: any) => formatter(value, unit, options),
    (units: string, formattedValue: string) => {
      const lookup = unitsLookupKey(units);
      return lookup
        ? intl.formatMessage(messages.unitTooltips, {
            units: lookup,
            value: formattedValue,
          })
        : formattedValue;
    }
  );
}

// Returns true if non negative integer
export function isInt(n) {
  return libIsInt(n);
}

// Returns true if non-negative float
export function isFloat(n) {
  return libIsFloat(n);
}
