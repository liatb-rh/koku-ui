import type { ApplicationType } from '../types';

export const mockApplicationTypes: ApplicationType[] = [
  {
    id: '1',
    name: '/insights/platform/catalog',
    display_name: 'Catalog',
    supported_source_types: ['ansible-tower'],
    created_at: '2019-04-05T17:54:38Z',
    updated_at: '2019-09-23T14:04:02Z',
  },
  {
    id: '2',
    name: '/insights/platform/cost-management',
    display_name: 'Cost Management',
    supported_source_types: ['amazon', 'azure', 'openshift', 'google', 'ibm'],
    created_at: '2019-04-05T17:54:38Z',
    updated_at: '2019-09-16T19:56:12Z',
  },
  {
    id: '3',
    name: '/insights/platform/topological-inventory',
    display_name: 'Topological Inventory',
    supported_source_types: ['amazon', 'ansible-tower', 'azure', 'openshift'],
    created_at: '2019-04-05T17:54:38Z',
    updated_at: '2019-09-23T14:04:02Z',
  },
  {
    id: '5',
    name: '/insights/platform/cloud-meter',
    display_name: 'RHEL management',
    supported_source_types: ['amazon', 'azure', 'google'],
    created_at: '2020-02-05T21:08:50Z',
    updated_at: '2020-02-18T19:38:52Z',
  },
];
