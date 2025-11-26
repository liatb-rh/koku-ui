import React from 'react';

import { PerspectiveSelect } from './perspectiveSelect';

// Options
const infrastructureAwsOptions = [{ value: 'aws' }];
const infrastructureAwsOcpOptions = [{ value: 'aws_ocp' }];
const infrastructureAzureOptions = [{ value: 'azure' }];
const infrastructureAzureOcpOptions = [{ value: 'azure_ocp' }];
const infrastructureGcpOptions = [{ value: 'gcp' }];
const infrastructureGcpOcpOptions = [{ value: 'gcp_ocp' }];
const infrastructureIbmOptions = [{ value: 'ibm' }];
const infrastructureIbmOcpOptions = [{ value: 'ibm_ocp' }];
const infrastructureOciOptions = [{ value: 'oci' }];
const infrastructureOcpCloudOptions = [{ value: 'ocp_cloud' }];
const ocpOptions = [{ value: 'ocp' }];
const rhelOptions = [{ value: 'rhel' }];

interface PerspectiveProps {
  currentItem?: string;
  hasAws?: boolean;
  hasAwsOcp?: boolean;
  hasAzure?: boolean;
  hasAzureOcp?: boolean;
  hasGcp?: boolean;
  hasGcpOcp?: boolean;
  hasIbm?: boolean;
  hasIbmOcp?: boolean;
  hasOci?: boolean;
  hasOcp?: boolean;
  hasOcpCloud?: boolean;
  hasRhel?: boolean;
  isDisabled?: boolean;
  isIbmFlagEnabled?: boolean;
  isOciFlagEnabled?: boolean;
  isInfrastructureTab?: boolean;
  isRhelTab?: boolean;
  onSelect?: (value: string) => void;
  labelFor?: (value: string) => string; // UI-only label resolver
  title?: string;
}

function getInfrastructureOptions({
  hasAws,
  hasAwsOcp,
  hasAzure,
  hasAzureOcp,
  hasGcp,
  hasGcpOcp,
  hasIbm,
  hasIbmOcp,
  hasOci,
  isIbmFlagEnabled,
}) {
  const options: Array<{ value: string }> = [];
  if (hasAws) options.push(...infrastructureAwsOptions);
  if (hasAwsOcp) options.push(...infrastructureAwsOcpOptions);
  if (hasGcp) options.push(...infrastructureGcpOptions);
  if (hasGcpOcp) options.push(...infrastructureGcpOcpOptions);
  if (hasIbm) options.push(...infrastructureIbmOptions);
  if (hasIbmOcp && isIbmFlagEnabled) options.push(...infrastructureIbmOcpOptions);
  if (hasAzure) options.push(...infrastructureAzureOptions);
  if (hasAzureOcp) options.push(...infrastructureAzureOcpOptions);
  if (hasOci) options.push(...infrastructureOciOptions);
  return options;
}

const Perspective: React.FC<PerspectiveProps> = ({
  currentItem,
  hasAws,
  hasAwsOcp,
  hasAzure,
  hasAzureOcp,
  hasGcp,
  hasGcpOcp,
  hasIbm,
  hasIbmOcp,
  hasOci,
  hasOcp,
  hasOcpCloud,
  hasRhel,
  isDisabled,
  isIbmFlagEnabled,
  isInfrastructureTab,
  isRhelTab,
  labelFor = v => v,
  onSelect,
  title,
}) => {
  const options: Array<{ label: string; value: string }> = [];

  if (isInfrastructureTab !== undefined || isRhelTab !== undefined) {
    if (isInfrastructureTab) {
      if (hasOcpCloud) options.push(...infrastructureOcpCloudOptions.map(o => ({ ...o, label: labelFor(o.value) })));
      options.push(
        ...getInfrastructureOptions({
          hasAws,
          hasAwsOcp,
          hasAzure,
          hasAzureOcp,
          hasGcp,
          hasGcpOcp,
          hasIbm,
          hasIbmOcp,
          hasOci,
          isIbmFlagEnabled,
        }).map(o => ({ ...o, label: labelFor(o.value) }))
      );
    } else if (isRhelTab) {
      if (hasRhel) options.push(...rhelOptions.map(o => ({ ...o, label: labelFor(o.value) })));
    } else if (hasOcp) {
      options.push(...ocpOptions.map(o => ({ ...o, label: labelFor(o.value) })));
    }
  } else {
    if (hasOcp) options.push(...ocpOptions.map(o => ({ ...o, label: labelFor(o.value) })));
    if (hasOcpCloud) options.push(...infrastructureOcpCloudOptions.map(o => ({ ...o, label: labelFor(o.value) })));
    if (hasRhel) options.push(...rhelOptions.map(o => ({ ...o, label: labelFor(o.value) })));
    options.push(
      ...getInfrastructureOptions({
        hasAws,
        hasAwsOcp,
        hasAzure,
        hasAzureOcp,
        hasGcp,
        hasGcpOcp,
        hasIbm,
        hasIbmOcp,
        hasOci,
        isIbmFlagEnabled,
      }).map(o => ({ ...o, label: labelFor(o.value) }))
    );
  }

  return (
    <PerspectiveSelect
      currentItem={currentItem || options[0]?.value}
      isDisabled={isDisabled}
      onSelect={onSelect}
      options={options}
      title={title}
    />
  );
};

export default Perspective;


