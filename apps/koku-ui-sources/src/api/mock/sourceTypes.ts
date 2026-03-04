import type { SourceType } from '../types';

export const OPENSHIFT_TYPE: SourceType = {
  id: '1',
  name: 'openshift',
  product_name: 'OpenShift Container Platform',
  category: 'Red Hat',
  vendor: 'Red Hat',
  created_at: '2019-03-26T14:05:45Z',
  updated_at: '2019-09-16T14:03:35Z',
};

export const AMAZON_TYPE: SourceType = {
  id: '2',
  name: 'amazon',
  product_name: 'Amazon Web Services',
  category: 'Cloud',
  vendor: 'Amazon',
  created_at: '2019-03-26T14:05:45Z',
  updated_at: '2019-09-11T14:03:04Z',
};

export const ANSIBLE_TOWER_TYPE: SourceType = {
  id: '3',
  name: 'ansible-tower',
  product_name: 'Ansible Tower',
  category: 'Red Hat',
  vendor: 'Red Hat',
  created_at: '2019-04-05T17:54:38Z',
  updated_at: '2019-09-16T14:03:35Z',
};

export const SATELLITE_TYPE: SourceType = {
  id: '9',
  name: 'satellite',
  product_name: 'Red Hat Satellite',
  category: 'Red Hat',
  vendor: 'Red Hat',
  created_at: '2019-11-08T14:43:11Z',
  updated_at: '2019-12-12T20:01:44Z',
};

export const mockSourceTypes: SourceType[] = [OPENSHIFT_TYPE, AMAZON_TYPE, ANSIBLE_TOWER_TYPE, SATELLITE_TYPE];
