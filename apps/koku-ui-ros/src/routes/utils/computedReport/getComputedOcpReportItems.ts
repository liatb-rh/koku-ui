import type { OcpQuery } from '@koku-ui/utils/http/queries/ocpQuery';
import type { OcpReport, OcpReportItem } from '@koku-ui/utils/http/reports/ocpReports';

import type { ComputedReportItemsParams } from './getComputedReportItems';

export interface ComputedOcpReportItemsParams extends ComputedReportItemsParams<OcpReport, OcpReportItem> {}

export function getIdKeyForGroupBy(groupBy: OcpQuery['group_by'] = {}): ComputedOcpReportItemsParams['idKey'] {
  if (groupBy.project) {
    return 'project';
  }
  if (groupBy.cluster) {
    return 'cluster';
  }
  if (groupBy.node) {
    return 'node';
  }
  return 'date';
}
