import type { ReportPathsType, ReportType } from '@koku-ui/utils/http/reports/report';
export const reportStateKey = 'report';

export function getFetchId(reportPathsType: ReportPathsType, reportType: ReportType, reportQueryString: string) {
  return `${reportPathsType}--${reportType}--${reportQueryString}`;
}
