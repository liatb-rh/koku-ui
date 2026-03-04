import sourcesReducer, { defaultSourcesState } from './reducer';
import { ACTION_TYPES, FILTER_SOURCES, PAGE_AND_SIZE, SET_CATEGORY, SORT_ENTITIES } from './actionTypes';

describe('redux sources reducer', () => {
  const SOURCES = [
    { id: '1', name: 'name1' },
    { id: '2', name: 'name2' },
  ];
  const COUNT = 1234;

  describe('LOAD_ENTITIES', () => {
    it('LOAD_ENTITIES_PENDING increments loaded and merges options', () => {
      const state = sourcesReducer(defaultSourcesState, {
        type: ACTION_TYPES.LOAD_ENTITIES_PENDING,
        options: { pageNumber: 2, pageSize: 25 },
      });
      expect(state.loaded).toBe(1);
      expect(state.pageNumber).toBe(2);
      expect(state.pageSize).toBe(25);
    });

    it('LOAD_ENTITIES_FULFILLED sets entities and meta count', () => {
      const pendingState = { ...defaultSourcesState, loaded: 1 };
      const state = sourcesReducer(pendingState, {
        type: ACTION_TYPES.LOAD_ENTITIES_FULFILLED,
        payload: { sources: SOURCES, meta: { count: COUNT } },
        options: {},
      });
      expect(state.loaded).toBe(0);
      expect(state.entities).toEqual(SOURCES);
      expect(state.numberOfEntities).toBe(COUNT);
    });

    it('LOAD_ENTITIES_REJECTED decrements loaded and sets fetchingError', () => {
      const pendingState = { ...defaultSourcesState, loaded: 1 };
      const state = sourcesReducer(pendingState, {
        type: ACTION_TYPES.LOAD_ENTITIES_REJECTED,
        payload: { error: { detail: 'Failed' } },
      });
      expect(state.loaded).toBe(0);
      expect(state.fetchingError).toEqual({ detail: 'Failed' });
    });
  });

  describe('LOAD_SOURCE_TYPES', () => {
    it('LOAD_SOURCE_TYPES_FULFILLED sets sourceTypes', () => {
      const types = [{ id: '1', name: 'openshift' }];
      const state = sourcesReducer(defaultSourcesState, {
        type: ACTION_TYPES.LOAD_SOURCE_TYPES_FULFILLED,
        payload: types,
      });
      expect(state.sourceTypes).toEqual(types);
      expect(state.sourceTypesLoaded).toBe(true);
    });
  });

  describe('LOAD_APP_TYPES', () => {
    it('LOAD_APP_TYPES_FULFILLED sets appTypes', () => {
      const types = [{ id: '1', display_name: 'Catalog' }];
      const state = sourcesReducer(defaultSourcesState, {
        type: ACTION_TYPES.LOAD_APP_TYPES_FULFILLED,
        payload: types,
      });
      expect(state.appTypes).toEqual(types);
      expect(state.appTypesLoaded).toBe(true);
    });
  });

  describe('FILTER_SOURCES', () => {
    it('merges filter value and resets pageNumber', () => {
      const state = sourcesReducer(
        { ...defaultSourcesState, pageNumber: 5 },
        { type: FILTER_SOURCES, payload: { value: { name: 'test' } } }
      );
      expect(state.filterValue).toEqual({ name: 'test' });
      expect(state.pageNumber).toBe(1);
    });
  });

  describe('PAGE_AND_SIZE', () => {
    it('updates pageSize and pageNumber', () => {
      const state = sourcesReducer(defaultSourcesState, {
        type: PAGE_AND_SIZE,
        payload: { page: 3, size: 20 },
      });
      expect(state.pageNumber).toBe(3);
      expect(state.pageSize).toBe(20);
    });
  });

  describe('SORT_ENTITIES', () => {
    it('updates sortBy and sortDirection', () => {
      const state = sourcesReducer(defaultSourcesState, {
        type: SORT_ENTITIES,
        payload: { column: 'name', direction: 'asc' },
      });
      expect(state.sortBy).toBe('name');
      expect(state.sortDirection).toBe('asc');
    });
  });

  describe('SET_CATEGORY', () => {
    it('sets activeCategory and clears filter lists', () => {
      const state = sourcesReducer(
        { ...defaultSourcesState, filterValue: { source_type_id: ['1'] } },
        { type: SET_CATEGORY, payload: { category: 'Cloud' } }
      );
      expect(state.activeCategory).toBe('Cloud');
      expect(state.filterValue.source_type_id).toEqual([]);
      expect(state.filterValue.applications).toEqual([]);
    });
  });

  describe('default state', () => {
    it('returns same state for unknown action', () => {
      const state = sourcesReducer(defaultSourcesState, { type: 'UNKNOWN' });
      expect(state).toBe(defaultSourcesState);
    });
  });
});
