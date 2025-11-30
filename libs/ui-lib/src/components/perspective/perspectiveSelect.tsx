import type { SelectWrapperOption } from '../selects/select-wrapper';
import { SelectWrapper } from '../selects/select-wrapper';
import { Title } from '@patternfly/react-core';
import { FilterIcon } from '@patternfly/react-icons/dist/esm/icons/filter-icon';
import React from 'react';

import { styles } from './perspective.styles';

interface PerspectiveSelectOwnProps {
  currentItem: string;
  isDisabled?: boolean;
  onSelect(value: string);
  options?: {
    isDisabled?: boolean;
    label: string;
    value: string;
  }[];
  title?: string;
}

interface PerspectiveSelectState {
  // TBD...
}

type PerspectiveSelectProps = PerspectiveSelectOwnProps;

class PerspectiveSelect extends React.Component<PerspectiveSelectProps, PerspectiveSelectState> {
  protected defaultState: PerspectiveSelectState = {
    // TBD...
  };
  public state: PerspectiveSelectState = { ...this.defaultState };

  private getSelectOptions = (): SelectWrapperOption[] => {
    const { options } = this.props;

    const selections: SelectWrapperOption[] = [];

    options &&options.map(option => {
      selections.push({
        isDisabled: option.isDisabled,
        toString: () => option.label,
        value: option.value,
      });
    });
    return selections;
  };

  private getSelect = () => {
    const { currentItem, isDisabled, options } = this.props;

    if (options && options.length === 1) {
      return <div style={styles.perspectiveOptionLabel}>{options[0].label}</div>;
    }

    const selectOptions = this.getSelectOptions();
    const selection = selectOptions.find(option => option.value === currentItem);

    return (
      <SelectWrapper
        id="perspective-select"
        isDisabled={isDisabled}
        onSelect={this.handleOnSelect}
        options={selectOptions}
        selection={selection}
        toggleIcon={<FilterIcon />}
      />
    );
  };

  private handleOnSelect = (_evt, selection: SelectWrapperOption) => {
    const { onSelect } = this.props;

    if (onSelect) {
      onSelect(selection.value || '');
    }
  };

  public render() {
    const { title } = this.props;

    return (
      <div style={styles.perspectiveSelector}>
        <Title headingLevel="h3" size="md" style={styles.perspectiveLabel}>
          {title ?? 'Perspective'}
        </Title>
        {this.getSelect()}
      </div>
    );
  }
}

export { PerspectiveSelect };


