import type { ToolbarLabelGroup } from '@patternfly/react-core';

export interface ToolbarChipGroupExt extends ToolbarLabelGroup {
  ariaLabelKey?: string;
  placeholderKey?: string;
  selectClassName?: string;
  selectOptions?: ToolbarLabelGroup[];
}


