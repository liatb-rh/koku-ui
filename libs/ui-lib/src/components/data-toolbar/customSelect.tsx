import type { SelectWrapperOption } from '../selects/select-wrapper';
import { SelectCheckboxWrapper } from '../selects/select-wrapper';
import React from 'react';

interface UiCustomSelectOption {
  label: string;
  value: string;
  isDisabled?: boolean;
}

interface UiCustomSelectProps {
  ariaLabel?: string;
  className?: string;
  id?: string;
  isDisabled?: boolean;
  onSelect(event: any, selection: SelectWrapperOption): void;
  options: UiCustomSelectOption[];
  placeholder?: string;
  selections?: string | string[];
}

function toSelectOptions(options: UiCustomSelectOption[]): SelectWrapperOption[] {
  return options.map(o => ({
    isDisabled: o.isDisabled,
    toString: () => o.label,
    value: o.value,
  }));
}

function toSelections(selections: UiCustomSelectProps['selections'], selectOptions: SelectWrapperOption[]) {
  if (Array.isArray(selections)) {
    return selections
      .map(v => selectOptions.find(o => o.value === v))
      .filter(Boolean) as SelectWrapperOption[];
  }
  if (typeof selections === 'string') {
    return selectOptions.find(o => o.value === selections);
  }
  return undefined;
}

const CustomSelect: React.FC<UiCustomSelectProps> = ({
  ariaLabel,
  className,
  id = 'custom-select',
  isDisabled,
  onSelect,
  options,
  placeholder,
  selections,
}) => {
  const selectOptions = toSelectOptions(options);
  const selected = toSelections(selections, selectOptions);

  return (
    <SelectCheckboxWrapper
      ariaLabel={ariaLabel}
      className={className}
      id={id}
      isDisabled={isDisabled}
      onSelect={onSelect}
      options={selectOptions}
      placeholder={placeholder}
      selections={selected as any}
    />
  );
};

export { CustomSelect };


