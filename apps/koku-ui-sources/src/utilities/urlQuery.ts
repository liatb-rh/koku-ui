import type { SourcesState } from '../redux/sources/reducer';

/** Parse URL search string into partial SourcesState. Used by parseQuery and by tests. */
export function parseQueryFromSearch(search: string): Partial<SourcesState> {
  const params = new URLSearchParams(search);
  const activeCategory = params.get('activeCategory');
  const pageNumber = params.get('page');
  const pageSize = params.get('perPage');
  const sortBy = params.get('sortBy');
  const sortDirection = params.get('sortDirection');
  const result: Partial<SourcesState> = {};
  if (activeCategory) {
    result.activeCategory = activeCategory;
  }
  if (pageNumber) {
    result.pageNumber = parseInt(pageNumber, 10) || 1;
  }
  if (pageSize) {
    result.pageSize = parseInt(pageSize, 10) || 50;
  }
  if (sortBy) {
    result.sortBy = sortBy;
  }
  if (sortDirection) {
    result.sortDirection = sortDirection;
  }
  return result;
}

export function parseQuery(): Partial<SourcesState> {
  if (typeof window === 'undefined') {
    return {};
  }
  return parseQueryFromSearch(window.location.search);
}

export function updateQuery(_sources: Partial<SourcesState>): void {
  // Optional: update window.location.search from sources state
}
