import axios from 'axios';

import { INTEGRATIONS_API_BASE, USE_MOCK_API } from './constants';
import { type IntegrationEndpoint, mockIntegrations } from './mock/integrations';

export type { IntegrationEndpoint };

const axiosInstance = axios.create();
axiosInstance.interceptors.response.use(response => response.data ?? response);

export interface IntegrationsCounts {
  ansible: number;
  webhook: number;
  pagerduty: number;
  camel: number;
  camel_google_chat?: number;
  camel_teams?: number;
  camel_slack?: number;
  camel_servicenow?: number;
  camel_splunk?: number;
}

export function getIntegrationsEndpoints(): Promise<IntegrationEndpoint[]> {
  if (USE_MOCK_API) {
    return Promise.resolve(mockIntegrations);
  }
  return axiosInstance
    .get(`${INTEGRATIONS_API_BASE}/endpoints?type=ansible&type=webhook&type=camel&type=pagerduty`)
    .then((body: { data?: IntegrationEndpoint[] }) => body?.data ?? []);
}

/** Compute counts by type/sub_type for widget or list summary (matches sources-ui fetchIntegrations shape). */
export function getIntegrationsCounts(): Promise<{ data: IntegrationEndpoint[]; counts: IntegrationsCounts } | null> {
  return getIntegrationsEndpoints().then(data => {
    const validCamelSubTypes = ['teams', 'google_chat', 'slack', 'servicenow', 'splunk'];
    const counts: IntegrationsCounts = {
      ansible: 0,
      webhook: 0,
      pagerduty: 0,
      camel: 0,
    };
    data.forEach(integration => {
      if (integration.type === 'ansible') {
        counts.ansible++;
      } else if (integration.type === 'webhook') {
        counts.webhook++;
      } else if (integration.type === 'pagerduty') {
        counts.pagerduty++;
      } else if (integration.type === 'camel') {
        counts.camel++;
        if (integration.sub_type && validCamelSubTypes.includes(integration.sub_type)) {
          const c = counts as unknown as Record<string, number>;
          c[integration.sub_type] = (c[integration.sub_type] ?? 0) + 1;
        }
      }
    });
    return { data, counts };
  });
}
