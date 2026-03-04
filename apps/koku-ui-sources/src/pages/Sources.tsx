import {
  Button,
  InputGroup,
  MenuToggle,
  PageSection,
  Pagination,
  PaginationVariant,
  Select,
  SelectList,
  SelectOption,
  Split,
  SplitItem,
  TextInput,
  Title,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
} from '@patternfly/react-core';
import FilterIcon from '@patternfly/react-icons/dist/esm/icons/filter-icon';
import SearchIcon from '@patternfly/react-icons/dist/esm/icons/search-icon';
import { Table, Tbody, Td, Th, Thead, Tr } from '@patternfly/react-table';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import type { ApplicationType, SourceType } from '../api/types';
import { filterSources, loadEntities, pageAndSize } from '../redux/sources/actions';
import type { SourceEntity } from '../redux/sources/reducer';
import type { RootState } from '../redux/store';
import { routes } from '../routes';
import { parseQuery } from '../utilities/urlQuery';

function getSourceTypeName(sourceTypeId: string | undefined, sourceTypes: SourceType[]): string {
  if (!sourceTypeId) {
    return '—';
  }
  const type = sourceTypes.find(t => t.id === sourceTypeId);
  return type?.product_name ?? type?.name ?? sourceTypeId;
}

function getConnectedApplicationsDisplay(source: SourceEntity, appTypes: ApplicationType[]): string {
  const apps = source.applications ?? [];
  if (apps.length === 0) {
    return '—';
  }
  const names = apps
    .map(app => appTypes.find(t => t.id === app.application_type_id)?.display_name)
    .filter(Boolean) as string[];
  return names.length > 0 ? names.sort().join(', ') : String(apps.length);
}

function formatDateAdded(createdAt: string | undefined): string {
  if (!createdAt) {
    return '—';
  }
  try {
    const d = new Date(createdAt);
    return Number.isNaN(d.getTime()) ? createdAt : d.toLocaleDateString(undefined, { dateStyle: 'medium' });
  } catch {
    return createdAt;
  }
}

function getStatus(source: SourceEntity): string {
  if (source.paused_at) {
    return 'Paused';
  }
  const status = source.availability_status;
  if (!status) {
    return '—';
  }
  if (status === 'available') {
    return 'Available';
  }
  if (status === 'unavailable') {
    return 'Unavailable';
  }
  if (status === 'partially_available') {
    return 'Partially available';
  }
  return status;
}

const FILTER_DEBOUNCE_MS = 300;

const FILTER_COLUMN_OPTIONS: { key: string; label: string }[] = [
  { key: 'name', label: 'Name' },
  { key: 'source_type_id', label: 'Type' },
  { key: 'applications', label: 'Application' },
  { key: 'availability_status', label: 'Status' },
];

const SourcesPage: React.FC = () => {
  const dispatch = useDispatch();
  const {
    entities,
    numberOfEntities,
    sourceTypesLoaded,
    loaded,
    sourceTypes,
    appTypes,
    filterValue,
    pageSize,
    pageNumber,
  } = useSelector((state: RootState) => state.sources);
  const isLoading = loaded > 0;

  const filterColumn = (filterValue?.filterColumn as string) ?? 'name';
  const filterText = typeof filterValue?.[filterColumn] === 'string' ? (filterValue[filterColumn] as string) : '';
  const filterLabel = FILTER_COLUMN_OPTIONS.find(o => o.key === filterColumn)?.label ?? 'Name';

  const [filterInput, setFilterInput] = useState(filterText);
  const [filterSelectOpen, setFilterSelectOpen] = useState(false);
  const [typeSelectOpen, setTypeSelectOpen] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setFilterInput(filterText);
  }, [filterText, filterColumn]);

  const applyFilter = useCallback(
    (value: string, column: string) => {
      dispatch(filterSources({ filterColumn: column, [column]: value }) as never);
    },
    [dispatch]
  );

  const onFilterChange = useCallback(
    (_event: React.FormEvent<HTMLInputElement>, value: string) => {
      setFilterInput(value);
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      debounceRef.current = setTimeout(() => applyFilter(value, filterColumn), FILTER_DEBOUNCE_MS);
    },
    [applyFilter, filterColumn]
  );

  const onFilterColumnSelect = useCallback(
    (_event: React.MouseEvent | undefined, value: string | object | undefined) => {
      const option = value as { key?: string } | undefined;
      const key = typeof option === 'object' && option?.key != null ? option.key : 'name';
      setFilterSelectOpen(false);
      const valueForColumn = key === 'source_type_id' ? '' : filterInput;
      dispatch(filterSources({ filterColumn: key, [key]: valueForColumn }) as never);
    },
    [dispatch, filterInput]
  );

  useEffect(
    () => () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    },
    []
  );

  const sourceTypesList = useMemo(() => (sourceTypes ?? []) as SourceType[], [sourceTypes]);
  const appTypesList = useMemo(() => (appTypes ?? []) as ApplicationType[], [appTypes]);

  const typeFilterOptions = useMemo(() => {
    const sourceList = entities as SourceEntity[];
    const uniqueTypeIds = Array.from(new Set(sourceList.map(e => e.source_type_id).filter(Boolean))) as string[];
    const options = uniqueTypeIds
      .map(id => {
        const t = sourceTypesList.find(ty => ty.id === id);
        return t ? { value: t.id, label: t.product_name ?? t.name ?? t.id } : null;
      })
      .filter((o): o is { value: string; label: string } => o != null);
    return [{ value: '', label: 'Any type' }, ...options];
  }, [entities, sourceTypesList]);

  const onTypeFilterSelect = useCallback(
    (_event: React.MouseEvent | undefined, value: string | number | undefined) => {
      setTypeSelectOpen(false);
      applyFilter(value != null ? String(value) : '', 'source_type_id');
    },
    [applyFilter]
  );

  const refresh = () => {
    dispatch(loadEntities(parseQuery) as never);
  };

  const onSetPage = useCallback(
    (_event: React.MouseEvent | React.KeyboardEvent, page: number) => {
      dispatch(pageAndSize(page, pageSize) as never);
    },
    [dispatch, pageSize]
  );

  const onPerPageSelect = useCallback(
    (_event: React.MouseEvent | React.KeyboardEvent, perPage: number) => {
      dispatch(pageAndSize(1, perPage) as never);
    },
    [dispatch]
  );

  const paginationProps = {
    itemCount: numberOfEntities,
    onPerPageSelect,
    onSetPage,
    page: pageNumber,
    perPage: pageSize,
    perPageOptions: [
      { title: '10', value: 10 },
      { title: '20', value: 20 },
      { title: '50', value: 50 },
    ],
  };

  const topPagination =
    numberOfEntities > 0 ? (
      <Pagination
        {...paginationProps}
        isCompact
        variant={PaginationVariant.top}
        widgetId="integrations-top-pagination"
      />
    ) : null;

  const bottomPagination =
    numberOfEntities > 0 ? (
      <Pagination {...paginationProps} variant={PaginationVariant.bottom} widgetId="integrations-bottom-pagination" />
    ) : null;

  return (
    <>
      <PageSection>
        <Toolbar>
          <ToolbarContent>
            <ToolbarItem>
              <Title headingLevel="h1">Integrations</Title>
            </ToolbarItem>
            <ToolbarItem>
              <Split hasGutter className="ins-c-conditional-filter">
                <SplitItem>
                  <Select
                    aria-label="Conditional filter toggle"
                    isOpen={filterSelectOpen}
                    onOpenChange={open => setFilterSelectOpen(open)}
                    onSelect={onFilterColumnSelect}
                    selected={FILTER_COLUMN_OPTIONS.find(o => o.key === filterColumn)}
                    toggle={toggleRef => (
                      <MenuToggle
                        ref={toggleRef}
                        icon={<FilterIcon />}
                        isExpanded={filterSelectOpen}
                        onClick={() => setFilterSelectOpen(!filterSelectOpen)}
                        aria-label="Conditional filter toggle"
                      >
                        {filterLabel}
                      </MenuToggle>
                    )}
                  >
                    <SelectList aria-label="Filter by">
                      {FILTER_COLUMN_OPTIONS.map(opt => (
                        <SelectOption key={opt.key} value={opt} isSelected={filterColumn === opt.key}>
                          {opt.label}
                        </SelectOption>
                      ))}
                    </SelectList>
                  </Select>
                </SplitItem>
                <SplitItem isFilled>
                  {filterColumn === 'source_type_id' ? (
                    <Select
                      aria-label="Filter by type"
                      isOpen={typeSelectOpen}
                      onOpenChange={setTypeSelectOpen}
                      onSelect={onTypeFilterSelect}
                      selected={typeFilterOptions.find(o => o.value === filterText) ?? typeFilterOptions[0]}
                      toggle={toggleRef => (
                        <MenuToggle
                          ref={toggleRef}
                          isExpanded={typeSelectOpen}
                          onClick={() => setTypeSelectOpen(o => !o)}
                          aria-label="Filter by type"
                        >
                          {typeFilterOptions.find(o => o.value === filterText)?.label ?? 'Any type'}
                        </MenuToggle>
                      )}
                    >
                      <SelectList aria-label="Filter by type">
                        {typeFilterOptions.map(opt => (
                          <SelectOption
                            key={opt.value || 'any'}
                            value={opt.value}
                            isSelected={filterText === opt.value}
                          >
                            {opt.label}
                          </SelectOption>
                        ))}
                      </SelectList>
                    </Select>
                  ) : (
                    <InputGroup>
                      <TextInput
                        aria-label={`Filter by ${filterLabel.toLowerCase()}`}
                        onChange={onFilterChange}
                        placeholder={`Filter by ${filterLabel}`}
                        type="search"
                        value={filterInput}
                      />
                      <Button variant="control" aria-label="Search" isDisabled>
                        <SearchIcon />
                      </Button>
                    </InputGroup>
                  )}
                </SplitItem>
              </Split>
            </ToolbarItem>
            <ToolbarItem align={{ default: 'alignEnd' }}>
              <Button variant="primary" component={props => <Link {...props} to={routes.sourcesNew.path} />}>
                Add integration
              </Button>
              <Button variant="secondary" onClick={refresh} isDisabled={isLoading}>
                Refresh
              </Button>
            </ToolbarItem>
            <ToolbarItem align={{ default: 'alignEnd' }}>{topPagination}</ToolbarItem>
          </ToolbarContent>
        </Toolbar>
      </PageSection>
      <PageSection>
        {!sourceTypesLoaded ? (
          <p>Loading source types...</p>
        ) : (
          <Table aria-label="List of Integrations">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Type</Th>
                <Th>Connected applications</Th>
                <Th>Date added</Th>
                <Th>Status</Th>
                <Th modifier="fitContent">Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {(entities as SourceEntity[]).map(source => (
                <Tr key={source.id}>
                  <Td dataLabel="Name">
                    <Link to={`${routes.sourcesDetail.path.replace(':id', source.id)}`}>
                      {source.name ?? source.id}
                    </Link>
                  </Td>
                  <Td dataLabel="Type">{getSourceTypeName(source.source_type_id, sourceTypesList)}</Td>
                  <Td dataLabel="Connected applications">{getConnectedApplicationsDisplay(source, appTypesList)}</Td>
                  <Td dataLabel="Date added">{formatDateAdded(source.created_at)}</Td>
                  <Td dataLabel="Status">{getStatus(source)}</Td>
                  <Td modifier="fitContent">
                    <Link to={`${routes.sourcesDetail.path.replace(':id', source.id)}`}>View</Link>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
        {sourceTypesLoaded && entities.length === 0 && !isLoading && (
          <p>No integrations found. Add an integration to get started.</p>
        )}
        {bottomPagination}
      </PageSection>
    </>
  );
};

export default SourcesPage;
