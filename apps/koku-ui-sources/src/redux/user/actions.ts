import type { Dispatch } from 'redux';

import { ACTION_TYPES } from './actionTypes';

export function loadWritePermissions(getUserPermissions: () => Promise<unknown[]>) {
  return (dispatch: Dispatch) => {
    dispatch({ type: ACTION_TYPES.SET_WRITE_PERMISSIONS_PENDING });
    return getUserPermissions()
      .then(permissions => {
        const list = Array.isArray(permissions) ? permissions : [];
        const writePermissions =
          list.some((p: unknown) => (p as { permission?: string })?.permission === 'sources:*:*') ||
          list.some((p: unknown) => (p as { permission?: string })?.permission === 'sources:*:write');
        dispatch({ type: ACTION_TYPES.SET_WRITE_PERMISSIONS_FULFILLED, payload: !!writePermissions });
      })
      .catch(() => dispatch({ type: ACTION_TYPES.SET_WRITE_PERMISSIONS_FULFILLED, payload: true }));
  };
}

export function loadOrgAdmin(getUser: () => Promise<{ identity?: { user?: { is_org_admin?: boolean } } }>) {
  return (dispatch: Dispatch) => {
    dispatch({ type: ACTION_TYPES.SET_ORG_ADMIN_PENDING });
    return getUser()
      .then(data => {
        const isOrgAdmin = data?.identity?.user?.is_org_admin ?? true;
        dispatch({ type: ACTION_TYPES.SET_ORG_ADMIN_FULFILLED, payload: isOrgAdmin });
      })
      .catch(() => dispatch({ type: ACTION_TYPES.SET_ORG_ADMIN_FULFILLED, payload: true }));
  };
}

export function loadIntegrationsEndpointsPermissions(getUserPermissions: () => Promise<unknown[]>) {
  return (dispatch: Dispatch) => {
    dispatch({ type: ACTION_TYPES.SET_INTEGRATIONS_ENDPOINTS_PERMISSIONS_PENDING });
    return getUserPermissions()
      .then(() => dispatch({ type: ACTION_TYPES.SET_INTEGRATIONS_ENDPOINTS_PERMISSIONS_FULFILLED, payload: true }))
      .catch(() => dispatch({ type: ACTION_TYPES.SET_INTEGRATIONS_ENDPOINTS_PERMISSIONS_FULFILLED, payload: true }));
  };
}

export function loadIntegrationsReadPermissions(getUserPermissions: () => Promise<unknown[]>) {
  return (dispatch: Dispatch) => {
    dispatch({ type: ACTION_TYPES.SET_INTEGRATIONS_READ_PERMISSIONS_PENDING });
    return getUserPermissions()
      .then(() => dispatch({ type: ACTION_TYPES.SET_INTEGRATIONS_READ_PERMISSIONS_FULFILLED, payload: true }))
      .catch(() => dispatch({ type: ACTION_TYPES.SET_INTEGRATIONS_READ_PERMISSIONS_FULFILLED, payload: true }));
  };
}
