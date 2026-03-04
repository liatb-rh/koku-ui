import { loadOrgAdmin, loadWritePermissions } from './actions';

describe('redux user actions', () => {
  let dispatch: jest.Mock;

  beforeEach(() => {
    dispatch = jest.fn().mockImplementation(x => (typeof x === 'function' ? x(dispatch) : x));
    jest.clearAllMocks();
  });

  describe('loadOrgAdmin', () => {
    it('dispatches SET_ORG_ADMIN_FULFILLED with is_org_admin from getUser', async () => {
      const getUser = jest.fn().mockResolvedValue({
        identity: { user: { is_org_admin: true } },
      });

      await loadOrgAdmin(getUser)(dispatch);

      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'SET_ORG_ADMIN_FULFILLED', payload: true })
      );
    });

    it('dispatches FULFILLED with true on error (on-prem fallback)', async () => {
      const getUser = jest.fn().mockRejectedValue(new Error('Auth error'));

      await loadOrgAdmin(getUser)(dispatch);

      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'SET_ORG_ADMIN_FULFILLED', payload: true })
      );
    });
  });

  describe('loadWritePermissions', () => {
    it('dispatches SET_WRITE_PERMISSIONS_FULFILLED when permission present', async () => {
      const getUserPermissions = jest.fn().mockResolvedValue([{ permission: 'sources:*:write' }]);

      await loadWritePermissions(getUserPermissions)(dispatch);

      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'SET_WRITE_PERMISSIONS_FULFILLED', payload: true })
      );
    });

    it('dispatches FULFILLED with true on error (on-prem fallback)', async () => {
      const getUserPermissions = jest.fn().mockRejectedValue(new Error('Permissions error'));

      await loadWritePermissions(getUserPermissions)(dispatch);

      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'SET_WRITE_PERMISSIONS_FULFILLED', payload: true })
      );
    });
  });
});
