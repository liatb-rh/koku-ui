import type { Query } from '../http/queries/query';

export interface Filter {
  isExcludes?: boolean;
  toString?: () => string;
  type?: string;
  value?: string;
}

enum QueryFilterType {
  filter = 'filter_by',
  exclude = 'exclude',
}

export const addFilterToQuery = (query: Query, filter: Filter) => {
  return addQueryFilter(
    query,
    filter.type as string,
    filter.value as string,
    filter.isExcludes ? QueryFilterType.exclude : QueryFilterType.filter
  );
};

export const addQueryFilter = (query: Query, filterType: string, filterValue: string, type: QueryFilterType) => {
  const newQuery: any = { ...JSON.parse(JSON.stringify(query)) };
  if (!newQuery[type]) {
    newQuery[type] = {};
  }
  if (filterValue === '*' && newQuery.group_by[filterType] === '*') {
    return;
  }
  if (newQuery[type] && newQuery[type][filterType]) {
    let found = false;
    const filters = newQuery[type][filterType];
    if (!Array.isArray(filters)) {
      found = filterValue === newQuery[type][filterType];
    } else {
      for (const filter of filters) {
        if (filter === filterValue) {
          found = true;
          break;
        }
      }
    }
    if (!found) {
      if (Array.isArray(newQuery[type][filterType])) {
        newQuery[type][filterType] = [...newQuery[type][filterType], filterValue];
      } else {
        newQuery[type][filterType] = [newQuery[type][filterType], filterValue];
      }
    }
  } else {
    newQuery[type][filterType] = [filterValue];
  }
  return newQuery;
};

export const removeFilterFromQuery = (query: Query, filter: Filter | null) => {
  if (filter === null) {
    const excludesQuery = removeQueryFilter(query, null as any, null as any, QueryFilterType.exclude);
    return removeQueryFilter(excludesQuery as any, null as any, null as any, QueryFilterType.filter);
  } else {
    return removeQueryFilter(
      query,
      filter.type as string,
      filter.value as string,
      filter.isExcludes ? QueryFilterType.exclude : QueryFilterType.filter
    );
  }
};

export const removeQueryFilter = (query: Query, filterType: string | null, filterValue: string | null, type: QueryFilterType) => {
  const newQuery: any = { ...JSON.parse(JSON.stringify(query)) };
  if (!newQuery[type]) {
    newQuery[type] = {};
  }
  if (filterType === null) {
    newQuery[type] = undefined;
  } else if (filterValue === null) {
    newQuery[type][filterType] = undefined;
  } else if (Array.isArray(newQuery[type][filterType])) {
    const index = newQuery[type][filterType].indexOf(filterValue);
    if (index > -1) {
      newQuery[type][filterType] = [...query[type][filterType].slice(0, index), ...query[type][filterType].slice(index + 1)];
    }
  } else {
    newQuery[type][filterType] = undefined;
  }
  return newQuery;
};


