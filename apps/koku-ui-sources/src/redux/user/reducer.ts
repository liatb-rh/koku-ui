import type { AnyAction } from 'redux';

import { ACTION_TYPES } from './actionTypes';

export interface UserState {
  writePermissions: boolean | undefined;
  integrationsEndpointsPermissions: boolean | undefined;
  integrationsReadPermissions: boolean | undefined;
  isOrgAdmin: boolean | undefined;
}

export const defaultUserState: UserState = {
  writePermissions: undefined,
  integrationsEndpointsPermissions: undefined,
  integrationsReadPermissions: undefined,
  isOrgAdmin: undefined,
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

const reducerHash: Record<string, (s: UserState, a: AnyAction) => UserState> = {
  [ACTION_TYPES.SET_WRITE_PERMISSIONS_FULFILLED]: (state, { payload }: AnyAction) => ({
    ...state,
    writePermissions: payload,
  }),
  [ACTION_TYPES.SET_ORG_ADMIN_FULFILLED]: (state, { payload }: AnyAction) => ({
    ...state,
    isOrgAdmin: payload,
  }),
  [ACTION_TYPES.SET_INTEGRATIONS_ENDPOINTS_PERMISSIONS_FULFILLED]: (state, { payload }: AnyAction) => ({
    ...state,
    integrationsEndpointsPermissions: payload,
  }),
  [ACTION_TYPES.SET_INTEGRATIONS_READ_PERMISSIONS_FULFILLED]: (state, { payload }: AnyAction) => ({
    ...state,
    integrationsReadPermissions: payload,
  }),
};

export default function userReducer(state: UserState = defaultUserState, action: AnyAction): UserState {
  return applyReducerHash(state, action, reducerHash);
}
