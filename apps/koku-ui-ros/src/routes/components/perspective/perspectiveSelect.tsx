import type { MessageDescriptor } from '@formatjs/intl/src/types';
import { PerspectiveSelect as UiPerspectiveSelect } from '@koku-ui/ui-lib/components/perspective';
import messages from 'locales/messages';
import React from 'react';
import type { WrappedComponentProps } from 'react-intl';
import { injectIntl } from 'react-intl';

interface PerspectiveSelectOwnProps {
  currentItem: string;
  isDisabled?: boolean;
  onSelect(value: string);
  options?: {
    isDisabled?: boolean;
    label: MessageDescriptor;
    value: string;
  }[];
  title?: MessageDescriptor;
}

type PerspectiveSelectProps = PerspectiveSelectOwnProps & WrappedComponentProps;

const PerspectiveSelectBase: React.FC<PerspectiveSelectProps> = ({
  currentItem,
  intl,
  isDisabled,
  onSelect,
  options,
  title,
}) => {
  const uiOptions =
    options?.map(o => ({
      isDisabled: o.isDisabled,
      label: intl.formatMessage(o.label, { value: o.value }),
      value: o.value,
    })) ?? [];

  return (
    <UiPerspectiveSelect
      currentItem={currentItem}
      isDisabled={isDisabled}
      onSelect={onSelect}
      options={uiOptions}
      title={intl.formatMessage(title || messages.perspective)}
    />
  );
};

const PerspectiveSelect = injectIntl(PerspectiveSelectBase);

export { PerspectiveSelect };
