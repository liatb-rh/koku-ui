import { loadSourceTypes, loadAppTypes, loadHcsEnrollment, setCategory } from './actions';
import { SET_CATEGORY } from './actionTypes';
import * as api from '../../api/entities';

jest.mock('../../api/entities');

describe('redux sources actions', () => {
  let dispatch: jest.Mock;

  beforeEach(() => {
    dispatch = jest.fn().mockImplementation(x => (typeof x === 'function' ? x(dispatch) : x));
    jest.clearAllMocks();
  });

  describe('setCategory', () => {
    it('dispatches SET_CATEGORY with category', () => {
      const action = setCategory('Cloud');
      expect(action).toEqual({ type: SET_CATEGORY, payload: { category: 'Cloud' } });
    });
  });

  describe('loadSourceTypes', () => {
    it('dispatches PENDING then FULFILLED with source types', async () => {
      const types = [{ id: '1', name: 'openshift' }];
      (api.doLoadSourceTypes as jest.Mock).mockResolvedValue(types);

      await loadSourceTypes()(dispatch);

      expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: 'LOAD_SOURCE_TYPES_PENDING' }));
      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'LOAD_SOURCE_TYPES_FULFILLED', payload: types })
      );
    });

    it('dispatches REJECTED on API error', async () => {
      (api.doLoadSourceTypes as jest.Mock).mockRejectedValue(new Error('Network error'));

      await loadSourceTypes()(dispatch);

      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'LOAD_SOURCE_TYPES_REJECTED',
          payload: { error: expect.any(Error) },
        })
      );
    });
  });

  describe('loadAppTypes', () => {
    it('dispatches PENDING then FULFILLED with app types', async () => {
      const types = [{ id: '1', display_name: 'Catalog' }];
      (api.doLoadAppTypes as jest.Mock).mockResolvedValue(types);

      await loadAppTypes()(dispatch);

      expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: 'LOAD_APP_TYPES_PENDING' }));
      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'LOAD_APP_TYPES_FULFILLED', payload: types })
      );
    });
  });

  describe('loadHcsEnrollment', () => {
    it('dispatches LOAD_HCS_ENROLLMENT_FULFILLED with false (on-prem)', async () => {
      await loadHcsEnrollment('token', false)(dispatch);

      expect(dispatch).toHaveBeenCalledWith({
        type: 'LOAD_HCS_ENROLLMENT_FULFILLED',
        payload: false,
      });
    });
  });
});
