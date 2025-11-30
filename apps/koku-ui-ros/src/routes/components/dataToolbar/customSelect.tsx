import '@koku-ui/ui-lib/components/data-toolbar/dataToolbar.css';

import type { ToolbarChipGroupExt } from '@koku-ui/ui-lib/components/data-toolbar';
import { CustomSelect as UiCustomSelect } from '@koku-ui/ui-lib/components/data-toolbar';
import type { SelectWrapperOption } from '@koku-ui/ui-lib/components/selects/select-wrapper';
import type { Filter } from '@koku-ui/utils/routing/filter';
import messages from 'locales/messages';
import React from 'react';
import type { WrappedComponentProps } from 'react-intl';
import { injectIntl } from 'react-intl';
import type { RouterComponentProps } from 'utils/router';
import { withRouter } from 'utils/router';

interface CustomSelectOwnProps extends RouterComponentProps, WrappedComponentProps {
  className?: string;
  filters?: Filter[];
  isDisabled?: boolean;
  onSelect(event, selection: SelectWrapperOption);
  options: ToolbarChipGroupExt[];
}

interface CustomSelectStateProps {
  // TBD...
}

interface CustomSelectDispatchProps {
  // TBD...
}

interface CustomSelectState {
  // TBD...
}

type CustomSelectProps = CustomSelectOwnProps & CustomSelectStateProps & CustomSelectDispatchProps;

class CustomSelectBase extends React.Component<CustomSelectProps, CustomSelectState> {
  protected defaultState: CustomSelectState = {
    // TBD...
  };
  public state: CustomSelectState = { ...this.defaultState };

  private getSelectOptions = () => {
    const { options } = this.props;

    const selectOptions: { label: string; value: string }[] = [];

    options.map(option => {
      selectOptions.push({
        label: option.name,
        value: option.key,
      });
    });
    return selectOptions;
  };

  public render() {
    const { className, filters, intl, isDisabled, onSelect } = this.props;

    const selectOptions = this.getSelectOptions();
    const selections = filters?.map(filter => filter.value);

    return (
      <UiCustomSelect
        ariaLabel={intl.formatMessage(messages.filterByValuesAriaLabel)}
        className={className}
        id="custom-select"
        isDisabled={isDisabled}
        onSelect={onSelect}
        options={selectOptions}
        placeholder={intl.formatMessage(messages.chooseValuePlaceholder)}
        selections={selections as any}
      />
    );
  }
}

const CustomSelect = injectIntl(withRouter(CustomSelectBase));

export { CustomSelect };
