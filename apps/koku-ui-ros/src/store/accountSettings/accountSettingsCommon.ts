import type { AccountSettingsType } from '@koku-ui/utils/http/accountSettings';

export const stateKey = 'accountSettings';

export function getFetchId(settingsType: AccountSettingsType) {
  return `${settingsType}`;
}
