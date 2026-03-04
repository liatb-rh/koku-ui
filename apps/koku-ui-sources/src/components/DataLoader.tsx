import { useChrome } from '@koku-ui/onprem-cloud-deps/frontend-components/useChrome';
import { useFlag } from '@koku-ui/onprem-cloud-deps/unleash/proxy-client-react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loadAppTypes, loadEntities, loadHcsEnrollment, loadSourceTypes } from '../redux/sources/actions';
import { ACTION_TYPES } from '../redux/sources/actionTypes';
import type { RootState } from '../redux/store';
import { OVERVIEW } from '../utilities/constants';
import { parseQuery } from '../utilities/urlQuery';

const DataLoader: React.FC = () => {
  const dispatch = useDispatch();
  const sources = useSelector((state: RootState) => state.sources);
  const hcsDisabled = useFlag('platform.integrations.hcs-disable');
  const chrome = useChrome();
  const getToken = chrome?.auth?.getToken ?? (async () => '');
  const isProd = chrome?.isProd ?? (() => false);

  const loadHcsData = async (token: string) => {
    if (hcsDisabled()) {
      dispatch({ type: ACTION_TYPES.LOAD_HCS_ENROLLMENT_FULFILLED, payload: false });
      return;
    }
    dispatch(loadHcsEnrollment(token, isProd()) as never);
  };

  useEffect(() => {
    const noEntities = sources.activeCategory === OVERVIEW;
    const loadData = async () => {
      const token = await getToken();
      Promise.all([
        dispatch(loadSourceTypes() as never),
        dispatch(loadAppTypes() as never),
        loadHcsData(token as string),
      ]).then(() => {
        if (!noEntities) {
          dispatch(loadEntities(parseQuery) as never);
        }
      });
    };
    loadData();
  }, []);

  return null;
};

export default DataLoader;
