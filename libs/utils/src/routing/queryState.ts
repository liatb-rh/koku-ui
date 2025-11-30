import type * as H from 'history';
import { cloneDeep } from 'lodash';

export function clearQueryState(location: H.Location, key: string) {
  if ((location as any)?.state?.[key]) {
    (location as any).state[key] = undefined;
  }
}

export function getQueryState(location: H.Location, key: string) {
  return (location as any)?.state?.[key] ? cloneDeep((location as any).state[key]) : undefined;
}


