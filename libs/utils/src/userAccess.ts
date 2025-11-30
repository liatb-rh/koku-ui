import type { Providers } from './http/providers';
import type { UserAccess } from './http/userAccess';
import { UserAccessType } from './http/userAccess';

function hasAccess(userAccess: UserAccess, userAccessType: UserAccessType) {
  let result = false;
  if (userAccess && Array.isArray(userAccess.data)) {
    const data = (userAccess.data as any).find(d => d.type === userAccessType);
    result = (data as any)?.access;
  } else {
    result = (userAccess as any)?.data === true;
  }
  return result;
}

function hasProviders(providers: Providers) {
  let result = false;
  if (providers?.meta) {
    result = providers.meta.count > 0;
  }
  return result;
}

export const hasAwsAccess = (userAccess: UserAccess) => hasAccess(userAccess, UserAccessType.aws);
export const isAwsAvailable = (userAccess: UserAccess, awsProviders: Providers) =>
  hasAwsAccess(userAccess) && hasProviders(awsProviders);

export const hasAzureAccess = (userAccess: UserAccess) => hasAccess(userAccess, UserAccessType.azure);
export const isAzureAvailable = (userAccess: UserAccess, azureProviders: Providers) =>
  hasAzureAccess(userAccess) && hasProviders(azureProviders);

export const hasOciAccess = (userAccess: UserAccess) => hasAccess(userAccess, UserAccessType.oci);
export const isOciAvailable = (userAccess: UserAccess, ociProviders: Providers) =>
  hasOciAccess(userAccess) && hasProviders(ociProviders);

export const hasCostModelAccess = (userAccess: UserAccess) => hasAccess(userAccess, UserAccessType.cost_model);

export const hasGcpAccess = (userAccess: UserAccess) => hasAccess(userAccess, UserAccessType.gcp);
export const isGcpAvailable = (userAccess: UserAccess, gcpProviders: Providers) =>
  hasGcpAccess(userAccess) && hasProviders(gcpProviders);

export const hasIbmAccess = (userAccess: UserAccess) => hasGcpAccess(userAccess);
export const isIbmAvailable = (userAccess: UserAccess, ibmProviders: Providers) =>
  hasIbmAccess(userAccess) && hasProviders(ibmProviders);

export const hasOcpAccess = (userAccess: UserAccess) => hasAccess(userAccess, UserAccessType.ocp);
export const isOcpAvailable = (userAccess: UserAccess, ocpProviders: Providers) =>
  hasOcpAccess(userAccess) && hasProviders(ocpProviders);

export const hasRhelAccess = (userAccess: UserAccess) => hasAccess(userAccess, UserAccessType.rhel);
export const isRhelAvailable = (userAccess: UserAccess, rhelProviders: Providers) =>
  hasRhelAccess(userAccess) && hasProviders(rhelProviders);

export const hasRosAccess = (userAccess: UserAccess) => hasAccess(userAccess, UserAccessType.ros);
export const isRosAvailable = (userAccess: UserAccess, rosProviders: Providers) =>
  hasRosAccess(userAccess) && hasProviders(rosProviders);

export const hasSettingsAccess = (userAccess: UserAccess) => hasAccess(userAccess, UserAccessType.settings);


