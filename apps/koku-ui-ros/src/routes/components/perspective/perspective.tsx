import { Perspective as UiPerspective } from '@koku-ui/ui-lib/components/perspective';
import messages from 'locales/messages';
import React from 'react';
import { useIntl } from 'react-intl';

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
  isInfrastructureTab?: boolean; // Used by the overview page
  isRhelTab?: boolean; // Used by the overview page,
  onSelect?: (value: string) => void;
}

// No local options or builders; these are now handled by ui-lib Perspective with labelFor

const Perspective: React.FC<PerspectiveProps> = props => {
  const intl = useIntl();
  const labelFor = (value: string) => intl.formatMessage(messages.perspectiveValues, { value });
  return <UiPerspective {...props} labelFor={labelFor} />;
};

export default Perspective;
