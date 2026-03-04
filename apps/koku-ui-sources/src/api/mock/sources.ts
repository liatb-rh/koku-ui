import type { Source } from '../types';
import { ANSIBLE_TOWER_TYPE, OPENSHIFT_TYPE } from './sourceTypes';

export const mockSources: Source[] = [
  {
    id: '14',
    created_at: '2019-04-23T18:21:07.081Z',
    source_type_id: OPENSHIFT_TYPE.id,
    name: 'OpenShift Source 1',
    updated_at: '2019-07-25T09:40:36.432Z',
    availability_status: 'available',
    applications: [],
    endpoints: [{ id: '8', scheme: null, host: null, port: null, path: null }],
    authentications: [],
  },
  {
    id: '406',
    created_at: '2019-08-06T12:18:25.410Z',
    source_type_id: ANSIBLE_TOWER_TYPE.id,
    name: 'Ansible Tower Source',
    updated_at: '2019-08-06T12:18:25.410Z',
    availability_status: 'unavailable',
    applications: [{ application_type_id: '1', id: '888' }],
    endpoints: [
      {
        id: '212',
        scheme: 'https',
        host: 'tower.example.com',
        port: null,
        path: '/',
      },
    ],
    authentications: [],
  },
];
