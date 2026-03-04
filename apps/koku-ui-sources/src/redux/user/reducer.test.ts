import userReducer, { defaultUserState } from './reducer';
import { ACTION_TYPES } from './actionTypes';

describe('redux user reducer', () => {
  describe('SET_WRITE_PERMISSIONS_FULFILLED', () => {
    it('sets writePermissions', () => {
      const state = userReducer(defaultUserState, {
        type: ACTION_TYPES.SET_WRITE_PERMISSIONS_FULFILLED,
        payload: true,
      });
      expect(state.writePermissions).toBe(true);
    });
  });

  describe('SET_ORG_ADMIN_FULFILLED', () => {
    it('sets isOrgAdmin', () => {
      const state = userReducer(defaultUserState, {
        type: ACTION_TYPES.SET_ORG_ADMIN_FULFILLED,
        payload: true,
      });
      expect(state.isOrgAdmin).toBe(true);
    });
  });

  describe('default state', () => {
    it('returns same state for unknown action', () => {
      const state = userReducer(defaultUserState, { type: 'UNKNOWN' });
      expect(state).toBe(defaultUserState);
    });
  });
});
