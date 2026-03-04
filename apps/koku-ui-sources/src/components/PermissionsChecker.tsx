import { useChrome } from '@koku-ui/onprem-cloud-deps/frontend-components/useChrome';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import {
  loadIntegrationsEndpointsPermissions,
  loadIntegrationsReadPermissions,
  loadOrgAdmin,
  loadWritePermissions,
} from '../redux/user/actions';

interface PermissionsCheckerProps {
  children: React.ReactNode;
}

const PermissionsChecker: React.FC<PermissionsCheckerProps> = ({ children }) => {
  const dispatch = useDispatch();
  const chrome = useChrome();
  const getUser = chrome?.auth?.getUser ?? (async () => ({}));
  const getUserPermissions = chrome?.getUserPermissions ?? (async () => []);

  useEffect(() => {
    Promise.all([
      dispatch(loadWritePermissions(getUserPermissions) as never),
      dispatch(loadOrgAdmin(getUser) as never),
      dispatch(loadIntegrationsEndpointsPermissions(getUserPermissions) as never),
      dispatch(loadIntegrationsReadPermissions(getUserPermissions) as never),
    ]);
  }, [dispatch, getUser, getUserPermissions]);

  return <>{children}</>;
};

export default PermissionsChecker;
