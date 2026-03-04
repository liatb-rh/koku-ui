import axios, { type AxiosInstance } from 'axios';

import { COST_API_BASE_V3, SOURCES_API_BASE_V3, USE_MOCK_API } from './constants';
import { mockApplicationTypes } from './mock/applicationTypes';
import { mockAwsRegions } from './mock/cost';
import { mockGraphQL } from './mock/graphql';
import { mockSources } from './mock/sources';
import { mockSourceTypes } from './mock/sourceTypes';
import type { GraphQLSourcesResponse, Source } from './types';

const axiosInstance: AxiosInstance = axios.create();

axiosInstance.interceptors.response.use(response => response.data ?? response);

export function initAxios(getUser?: () => Promise<unknown>, _logout?: () => Promise<unknown>): void {
  if (getUser) {
    axiosInstance.interceptors.request.use(async config => {
      const user = await getUser();
      if (user && (user as { identity?: unknown }).identity) {
        config.headers['X-RH-Identity'] = btoa(JSON.stringify(user));
      }
      return config;
    });
  }
}

export interface SourcesApiClient {
  postGraphQL: (data: { query: string }) => Promise<GraphQLSourcesResponse>;
  listSourceTypes: () => Promise<unknown[]>;
  doLoadAppTypes: () => Promise<unknown[]>;
  showSource: (id: string) => Promise<Source>;
  createSource: (data: Partial<Source>) => Promise<Source>;
  updateSource: (id: string, data: Partial<Source>) => Promise<Source>;
  deleteSource: (id: string) => Promise<void>;
  listSourceEndpoints: (id: string) => Promise<unknown[]>;
  listSourceApplications: (id: string) => Promise<unknown[]>;
  listSourceAuthentications: (id: string) => Promise<unknown[]>;
  checkAvailabilitySource: (id: string) => Promise<unknown>;
  createEndpoint: (data: unknown) => Promise<unknown>;
  createAuthentication: (data: unknown) => Promise<unknown>;
  createApplication: (data: unknown) => Promise<unknown>;
  createAuthApp: (data: unknown) => Promise<unknown>;
  deleteApplication: (id: string) => Promise<void>;
  deleteAuthentication: (id: string) => Promise<void>;
  pauseSource: (id: string) => Promise<unknown>;
  unpauseSource: (id: string) => Promise<unknown>;
}

function realSourcesApi(): SourcesApiClient {
  return {
    postGraphQL: data => axiosInstance.post(`${SOURCES_API_BASE_V3}/graphql`, data) as Promise<GraphQLSourcesResponse>,
    listSourceTypes: () => axiosInstance.get(`${SOURCES_API_BASE_V3}/source_types`) as Promise<unknown[]>,
    doLoadAppTypes: () => axiosInstance.get(`${SOURCES_API_BASE_V3}/application_types`) as Promise<unknown[]>,
    showSource: id => axiosInstance.get(`${SOURCES_API_BASE_V3}/sources/${id}`) as Promise<Source>,
    createSource: data => axiosInstance.post(`${SOURCES_API_BASE_V3}/sources`, data) as Promise<Source>,
    updateSource: (id, data) => axiosInstance.patch(`${SOURCES_API_BASE_V3}/sources/${id}`, data) as Promise<Source>,
    deleteSource: id => axiosInstance.delete(`${SOURCES_API_BASE_V3}/sources/${id}`) as Promise<void>,
    listSourceEndpoints: id =>
      axiosInstance.get(`${SOURCES_API_BASE_V3}/sources/${id}/endpoints`) as Promise<unknown[]>,
    listSourceApplications: id =>
      axiosInstance.get(`${SOURCES_API_BASE_V3}/sources/${id}/applications`) as Promise<unknown[]>,
    listSourceAuthentications: id =>
      axiosInstance.get(`${SOURCES_API_BASE_V3}/sources/${id}/authentications`) as Promise<unknown[]>,
    checkAvailabilitySource: id =>
      axiosInstance.post(`${SOURCES_API_BASE_V3}/sources/${id}/check_availability`) as Promise<unknown>,
    createEndpoint: data => axiosInstance.post(`${SOURCES_API_BASE_V3}/endpoints`, data) as Promise<unknown>,
    createAuthentication: data =>
      axiosInstance.post(`${SOURCES_API_BASE_V3}/authentications`, data) as Promise<unknown>,
    createApplication: data => axiosInstance.post(`${SOURCES_API_BASE_V3}/applications`, data) as Promise<unknown>,
    createAuthApp: data =>
      axiosInstance.post(`${SOURCES_API_BASE_V3}/application_authentications`, data) as Promise<unknown>,
    deleteApplication: id => axiosInstance.delete(`${SOURCES_API_BASE_V3}/applications/${id}`) as Promise<void>,
    deleteAuthentication: id => axiosInstance.delete(`${SOURCES_API_BASE_V3}/authentications/${id}`) as Promise<void>,
    pauseSource: id => axiosInstance.post(`${SOURCES_API_BASE_V3}/sources/${id}/pause`) as Promise<unknown>,
    unpauseSource: id => axiosInstance.post(`${SOURCES_API_BASE_V3}/sources/${id}/unpause`) as Promise<unknown>,
  };
}

function mockSourcesApi(): SourcesApiClient {
  return {
    postGraphQL: data => Promise.resolve(mockGraphQL(data)),
    listSourceTypes: () => Promise.resolve(mockSourceTypes),
    doLoadAppTypes: () => Promise.resolve(mockApplicationTypes),
    showSource: id => {
      const source = mockSources.find(s => s.id === id);
      return Promise.resolve(source ?? (mockSources[0] as Source));
    },
    createSource: data =>
      Promise.resolve({
        ...mockSources[0],
        id: String(Date.now()),
        name: (data as { name?: string }).name ?? 'New Source',
      } as Source),
    updateSource: (id, data) => {
      const source = mockSources.find(s => s.id === id) ?? mockSources[0];
      return Promise.resolve({ ...source, ...data } as Source);
    },
    deleteSource: () => Promise.resolve(),
    listSourceEndpoints: id => {
      const source = mockSources.find(s => s.id === id);
      return Promise.resolve(source?.endpoints ?? []);
    },
    listSourceApplications: id => {
      const source = mockSources.find(s => s.id === id);
      return Promise.resolve(source?.applications ?? []);
    },
    listSourceAuthentications: () => Promise.resolve([]),
    checkAvailabilitySource: () => Promise.resolve({}),
    createEndpoint: () => Promise.resolve({ id: '1' }),
    createAuthentication: () => Promise.resolve({ id: '1' }),
    createApplication: () => Promise.resolve({ id: '1' }),
    createAuthApp: () => Promise.resolve({}),
    deleteApplication: () => Promise.resolve(),
    deleteAuthentication: () => Promise.resolve(),
    pauseSource: () => Promise.resolve({}),
    unpauseSource: () => Promise.resolve({}),
  };
}

export function getSourcesApi(): SourcesApiClient {
  return USE_MOCK_API ? mockSourcesApi() : realSourcesApi();
}

export function getCostApi(): {
  listAwsRegions: (limit?: number, offset?: number) => Promise<{ data?: unknown[] }>;
} {
  if (USE_MOCK_API) {
    return {
      listAwsRegions: () => Promise.resolve({ data: mockAwsRegions }),
    };
  }
  return {
    listAwsRegions: (limit = 10000, offset = 0) =>
      axiosInstance.get(`${COST_API_BASE_V3}/sources/aws-s3-regions/?limit=${limit}&offset=${offset}`) as Promise<{
        data?: unknown[];
      }>,
  };
}

const graphQlAttributes = `
  id, created_at, source_type_id, name, imported, availability_status,
  source_ref, last_checked_at, updated_at, last_available_at, app_creation_workflow, paused_at,
  authentications { authtype, username, availability_status_error, availability_status }
  applications { application_type_id, id, availability_status_error, availability_status, paused_at, authentications { id, resource_type } }
  endpoints { id, scheme, host, port, path, receptor_node, role, certificate_authority, verify_ssl, availability_status_error, availability_status, authentications { authtype, availability_status, availability_status_error } }
`;

function pagination(pageSize: number, pageNumber: number): string {
  return `limit:${pageSize}, offset:${(pageNumber - 1) * pageSize}`;
}

function sorting(sortBy: string, sortDirection: string): string {
  if (!sortBy) {
    return '';
  }
  if (sortBy === 'source_type_id') {
    return `sort_by: { name: "source_type.product_name", direction: ${sortDirection} }`;
  }
  if (sortBy === 'applications') {
    return `sort_by: { name: "applications", direction: ${sortDirection} }`;
  }
  return `sort_by: { name: "${sortBy}", direction: ${sortDirection} }`;
}

export interface DoLoadEntitiesOptions {
  pageSize: number;
  pageNumber: number;
  sortBy: string;
  sortDirection: string;
  filterValue?: Record<string, unknown>;
  activeCategory?: string | null;
}

const FILTER_COLUMN_KEYS = ['name', 'source_type_id', 'applications', 'availability_status'] as const;
type FilterColumnKey = (typeof FILTER_COLUMN_KEYS)[number];

function conditionalFilter(filterValue?: Record<string, unknown>): string {
  const column = (filterValue?.filterColumn as FilterColumnKey) ?? 'name';
  const key = FILTER_COLUMN_KEYS.includes(column) ? column : 'name';
  const raw = filterValue?.[key];
  const value = typeof raw === 'string' ? raw.trim() : '';
  if (!value) {
    return '';
  }
  const escaped = value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
  return `filter: { name: "${key}", operation: "contains", value: "${escaped}" }`;
}

export function doLoadEntities(options: DoLoadEntitiesOptions): Promise<GraphQLSourcesResponse> {
  const { pageSize, pageNumber, sortBy, sortDirection, filterValue } = options;
  const filterSection = [
    pagination(pageSize, pageNumber),
    sorting(sortBy, sortDirection),
    conditionalFilter(filterValue),
  ]
    .filter(Boolean)
    .join(', ');
  return getSourcesApi()
    .postGraphQL({
      query: `{ sources(${filterSection}) { ${graphQlAttributes} }, meta{count} }`,
    })
    .then(data => data as GraphQLSourcesResponse);
}

export function doLoadSource(id: string): Promise<GraphQLSourcesResponse> {
  return getSourcesApi().postGraphQL({
    query: `{ sources(filter: { name: "id", operation: "eq", value: "${id}" }) { ${graphQlAttributes} } }`,
  }) as Promise<GraphQLSourcesResponse>;
}

export function doLoadSourceTypes(): Promise<unknown[]> {
  return getSourcesApi().listSourceTypes();
}

export function doLoadAppTypes(): Promise<unknown[]> {
  return getSourcesApi().doLoadAppTypes();
}
