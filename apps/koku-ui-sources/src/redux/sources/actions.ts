import type { Dispatch } from 'redux';

import { doLoadAppTypes, doLoadEntities, doLoadSourceTypes } from '../../api/entities';
import { ACTION_TYPES, FILTER_SOURCES, PAGE_AND_SIZE, SET_CATEGORY } from './actionTypes';
import type { SourcesState } from './reducer';

export function loadSourceTypes() {
  return (dispatch: Dispatch) => {
    dispatch({ type: ACTION_TYPES.LOAD_SOURCE_TYPES_PENDING });
    return doLoadSourceTypes()
      .then(payload => dispatch({ type: ACTION_TYPES.LOAD_SOURCE_TYPES_FULFILLED, payload }))
      .catch(error => dispatch({ type: ACTION_TYPES.LOAD_SOURCE_TYPES_REJECTED, payload: { error } }));
  };
}

export function loadAppTypes() {
  return (dispatch: Dispatch) => {
    dispatch({ type: ACTION_TYPES.LOAD_APP_TYPES_PENDING });
    return doLoadAppTypes()
      .then(payload => dispatch({ type: ACTION_TYPES.LOAD_APP_TYPES_FULFILLED, payload }))
      .catch(error => dispatch({ type: ACTION_TYPES.LOAD_APP_TYPES_REJECTED, payload: { error } }));
  };
}

/** On-prem: never call console.redhat.com; resolve with false. */
export function loadHcsEnrollment(_token: string, _isProd: boolean) {
  return (dispatch: Dispatch) => {
    dispatch({ type: ACTION_TYPES.LOAD_HCS_ENROLLMENT_FULFILLED, payload: false });
  };
}

export function loadEntities(parseQuery: () => Partial<SourcesState>) {
  return (dispatch: Dispatch, getState: () => { sources: SourcesState }) => {
    const state = getState().sources;
    const options = parseQuery ? parseQuery() : {};
    const { pageSize, pageNumber, sortBy, sortDirection, filterValue, activeCategory } = {
      ...state,
      ...options,
    };
    dispatch({
      type: ACTION_TYPES.LOAD_ENTITIES_PENDING,
      options: { pageNumber, pageSize, sortBy, sortDirection, filterValue, activeCategory },
    });
    return doLoadEntities({
      pageSize,
      pageNumber,
      sortBy,
      sortDirection,
      filterValue,
      activeCategory: activeCategory ?? undefined,
    })
      .then(response => {
        const data = (response as { data?: { sources?: unknown[]; meta?: { count: number } } })?.data ?? response;
        const payload = data as { sources?: unknown[]; meta?: { count: number } };
        return dispatch({
          type: ACTION_TYPES.LOAD_ENTITIES_FULFILLED,
          payload: { sources: payload?.sources ?? [], meta: payload?.meta ?? { count: 0 } },
          options: {},
        });
      })
      .catch(error => dispatch({ type: ACTION_TYPES.LOAD_ENTITIES_REJECTED, payload: { error } }));
  };
}

export function setCategory(category: string | null) {
  return { type: SET_CATEGORY, payload: { category } };
}

export function pageAndSize(page: number, size: number) {
  return (dispatch: Dispatch, getState: () => { sources: SourcesState }) => {
    dispatch({ type: PAGE_AND_SIZE, payload: { page, size } });
    dispatch(loadEntities(() => getState().sources) as never);
  };
}

export function filterSources(value: Record<string, unknown>) {
  return (dispatch: Dispatch, getState: () => { sources: SourcesState }) => {
    dispatch({ type: FILTER_SOURCES, payload: { value } });
    dispatch(loadEntities(() => getState().sources) as never);
  };
}
