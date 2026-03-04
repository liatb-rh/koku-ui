export interface IntegrationEndpoint {
  id: string;
  type: string;
  sub_type?: string;
  name?: string;
  scheme?: string;
  host?: string;
  path?: string;
  created_at?: string;
  updated_at?: string;
}

export const mockIntegrations: IntegrationEndpoint[] = [
  {
    id: '1',
    type: 'ansible',
    name: 'Ansible Tower',
    scheme: 'https',
    host: 'tower.example.com',
    path: '/',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    type: 'webhook',
    name: 'Alert Webhook',
    scheme: 'https',
    host: 'hooks.example.com',
    path: '/alerts',
    created_at: '2024-02-01T12:00:00Z',
    updated_at: '2024-02-01T12:00:00Z',
  },
  {
    id: '3',
    type: 'camel',
    sub_type: 'slack',
    name: 'Slack Channel',
    created_at: '2024-02-10T08:00:00Z',
    updated_at: '2024-02-10T08:00:00Z',
  },
  {
    id: '4',
    type: 'camel',
    sub_type: 'teams',
    name: 'Microsoft Teams',
    created_at: '2024-02-12T14:00:00Z',
    updated_at: '2024-02-12T14:00:00Z',
  },
  {
    id: '5',
    type: 'pagerduty',
    name: 'PagerDuty Service',
    created_at: '2024-03-01T09:00:00Z',
    updated_at: '2024-03-01T09:00:00Z',
  },
];
