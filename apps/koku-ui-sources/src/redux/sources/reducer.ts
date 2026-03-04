import type { AnyAction } from 'redux';

import {
  ACTION_TYPES,
  ADD_APP_TO_SOURCE,
  CLEAR_FILTERS,
  FILTER_SOURCES,
  PAGE_AND_SIZE,
  SET_CATEGORY,
  SET_COUNT,
  SORT_ENTITIES,
  STATUS_CHECK_PENDING,
} from './actionTypes';

export interface SourceEntity {
  id: string;
  name?: string;
  source_type_id?: string;
  created_at?: string;
  availability_status?: string;
  paused_at?: string | null;
  applications?: { id: string; application_type_id?: string; isDeleting?: boolean }[];
  endpoints?: unknown[];
  authentications?: unknown[];
  hidden?: boolean;
  isCheckPending?: boolean;
}

export interface SourcesState {
  loaded: number;
  pageSize: number;
  pageNumber: number;
  entities: SourceEntity[];
  numberOfEntities: number;
  appTypesLoaded: boolean;
  sourceTypesLoaded: boolean;
  filterValue: Record<string, unknown>;
  sortBy: string;
  sortDirection: string;
  removingSources: string[];
  activeCategory: string | null;
  appTypes: unknown[];
  sourceTypes: unknown[];
  hcsEnrolled: boolean;
  hcsEnrolledLoaded: boolean;
  fetchingError?: { detail?: string };
}

export const defaultSourcesState: SourcesState = {
  loaded: 0,
  pageSize: 50,
  pageNumber: 1,
  entities: [],
  numberOfEntities: 0,
  appTypesLoaded: false,
  sourceTypesLoaded: false,
  filterValue: {},
  sortBy: 'created_at',
  sortDirection: 'desc',
  removingSources: [],
  activeCategory: null,
  appTypes: [],
  sourceTypes: [],
  hcsEnrolled: false,
  hcsEnrolledLoaded: false,
};

function applyReducerHash<TState>(
  state: TState,
  action: AnyAction,
  hash: Record<string, (s: TState, a: AnyAction) => TState>
): TState {
  const handler = hash[action.type];
  if (handler) {
    return handler(state, action);
  }
  return state;
}

const reducerHash: Record<string, (s: SourcesState, a: AnyAction) => SourcesState> = {
  [ACTION_TYPES.LOAD_ENTITIES_PENDING]: (state, { options }: AnyAction) => ({
    ...state,
    loaded: state.loaded + 1,
    ...options,
  }),
  [ACTION_TYPES.LOAD_ENTITIES_FULFILLED]: (state, { payload, options }: AnyAction) => ({
    ...state,
    loaded: Math.max(state.loaded - 1, 0),
    entities: payload?.sources ?? state.entities,
    numberOfEntities: payload?.meta?.count ?? state.numberOfEntities,
    ...options,
  }),
  [ACTION_TYPES.LOAD_ENTITIES_REJECTED]: (state, { payload }: AnyAction) => ({
    ...state,
    loaded: Math.max(state.loaded - 1, 0),
    fetchingError: payload?.error,
  }),
  [ACTION_TYPES.LOAD_SOURCE_TYPES_PENDING]: state => ({
    ...state,
    sourceTypes: [],
    sourceTypesLoaded: false,
  }),
  [ACTION_TYPES.LOAD_SOURCE_TYPES_FULFILLED]: (state, { payload }: AnyAction) => ({
    ...state,
    sourceTypes: payload ?? [],
    sourceTypesLoaded: true,
  }),
  [ACTION_TYPES.LOAD_SOURCE_TYPES_REJECTED]: (state, { payload }: AnyAction) => ({
    ...state,
    fetchingError: payload?.error,
  }),
  [ACTION_TYPES.LOAD_HCS_ENROLLMENT_FULFILLED]: (state, { payload }: AnyAction) => ({
    ...state,
    hcsEnrolled: !!payload,
    hcsEnrolledLoaded: true,
  }),
  [ACTION_TYPES.LOAD_HCS_ENROLLMENT_REJECTED]: state => ({
    ...state,
    hcsEnrolledLoaded: true,
  }),
  [ACTION_TYPES.LOAD_APP_TYPES_PENDING]: state => ({
    ...state,
    appTypes: [],
    appTypesLoaded: false,
  }),
  [ACTION_TYPES.LOAD_APP_TYPES_FULFILLED]: (state, { payload }: AnyAction) => ({
    ...state,
    appTypes: payload ?? [],
    appTypesLoaded: true,
  }),
  [ACTION_TYPES.LOAD_APP_TYPES_REJECTED]: (state, { payload }: AnyAction) => ({
    ...state,
    fetchingError: payload?.error,
  }),
  [ACTION_TYPES.REMOVE_SOURCE_FULFILLED]: (state, { meta }: AnyAction) => ({
    ...state,
    removingSources: state.removingSources.filter(id => id !== meta?.sourceId),
    entities: state.entities.filter(e => e.id !== meta?.sourceId),
  }),
  [ACTION_TYPES.REMOVE_APPLICATION_FULFILLED]: (state, { meta }: AnyAction) => ({
    ...state,
    entities: state.entities.map(entity =>
      entity.id === meta?.sourceId
        ? {
            ...entity,
            applications: (entity.applications ?? []).filter(app => app.id !== meta?.appId),
          }
        : entity
    ),
  }),
  [SORT_ENTITIES]: (state, { payload }: AnyAction) => ({
    ...state,
    sortBy: payload?.column ?? state.sortBy,
    sortDirection: payload?.direction ?? state.sortDirection,
  }),
  [PAGE_AND_SIZE]: (state, { payload }: AnyAction) => ({
    ...state,
    pageSize: payload?.size ?? state.pageSize,
    pageNumber: payload?.page ?? state.pageNumber,
  }),
  [FILTER_SOURCES]: (state, { payload }: AnyAction) => ({
    ...state,
    filterValue: { ...state.filterValue, ...payload?.value },
    pageNumber: 1,
  }),
  [ADD_APP_TO_SOURCE]: (state, { payload }: AnyAction) => ({
    ...state,
    entities: state.entities.map(entity =>
      entity.id === payload?.sourceId
        ? { ...entity, applications: [...(entity.applications ?? []), payload?.app] }
        : entity
    ),
  }),
  [SET_COUNT]: (state, { payload }: AnyAction) => ({
    ...state,
    numberOfEntities: payload?.count ?? state.numberOfEntities,
  }),
  [CLEAR_FILTERS]: state => ({
    ...state,
    filterValue: {},
    pageNumber: 1,
  }),
  [STATUS_CHECK_PENDING]: (state, { payload }: AnyAction) => ({
    ...state,
    entities: state.entities.map(entity =>
      entity.id === payload?.sourceId ? { ...entity, isCheckPending: true } : entity
    ),
  }),
  [SET_CATEGORY]: (state, { payload }: AnyAction) => ({
    ...state,
    filterValue: { ...state.filterValue, source_type_id: [], applications: [] },
    activeCategory: payload?.category ?? state.activeCategory,
  }),
};

export default function sourcesReducer(state: SourcesState = defaultSourcesState, action: AnyAction): SourcesState {
  return applyReducerHash(state, action, reducerHash);
}
