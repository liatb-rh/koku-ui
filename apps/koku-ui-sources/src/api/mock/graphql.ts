import type { GraphQLSourcesResponse, Source } from '../types';
import { mockApplicationTypes } from './applicationTypes';
import { mockSources } from './sources';

function parseGraphQLQuery(body: { query?: string }): {
  operation?: string;
  filter?: string;
  applicationsForEdit?: string;
  limit?: number;
  offset?: number;
  filterColumn?: string;
  filterValue?: string;
} {
  const query = body?.query ?? '';
  const sourcesMatch = query.match(/sources\s*\(([^)]*)\)/);
  const args = sourcesMatch?.[1] ?? '';
  const filterMatch = query.match(/filter:\s*\{\s*name:\s*"id"/);
  const applicationsMatch = query.includes('applications {');
  const limitMatch = args.match(/limit:\s*(\d+)/);
  const offsetMatch = args.match(/offset:\s*(\d+)/);
  const conditionalMatch = query.match(
    /filter:\s*\{\s*name:\s*"(name|source_type_id|applications|availability_status)",\s*operation:\s*"contains",\s*value:\s*"((?:[^"\\]|\\.)*)"\s*\}/
  );
  const filterColumn = conditionalMatch?.[1];
  const filterValue = conditionalMatch?.[2]?.replace(/\\"/g, '"').replace(/\\\\/g, '\\');
  return {
    operation: sourcesMatch ? 'sources' : undefined,
    filter: filterMatch ? query : undefined,
    applicationsForEdit: applicationsMatch && filterMatch ? 'edit' : undefined,
    limit: limitMatch ? parseInt(limitMatch[1], 10) : undefined,
    offset: offsetMatch ? parseInt(offsetMatch[1], 10) : undefined,
    filterColumn,
    filterValue,
  };
}

function matchesFilter(source: Source, column: string, value: string): boolean {
  const lower = value.toLowerCase();
  if (column === 'name') {
    return (source.name ?? '').toLowerCase().includes(lower);
  }
  if (column === 'source_type_id') {
    if (!value) {
      return true;
    }
    return source.source_type_id === value;
  }
  if (column === 'applications') {
    const appIds = (source.applications ?? []).map(a => a.application_type_id);
    const matchApp = mockApplicationTypes.some(
      t => appIds.includes(t.id) && (t.display_name?.toLowerCase().includes(lower) ?? false)
    );
    return matchApp;
  }
  if (column === 'availability_status') {
    const status = source.paused_at ? 'paused' : (source.availability_status ?? '').toLowerCase();
    const normalized =
      status === 'available'
        ? 'available'
        : status === 'unavailable'
          ? 'unavailable'
          : status === 'partially_available'
            ? 'partially available'
            : status;
    return normalized.includes(lower);
  }
  return false;
}

export function mockGraphQL(body: { query?: string }): GraphQLSourcesResponse {
  const parsed = parseGraphQLQuery(body);
  const query = body?.query ?? '';

  if (parsed.filter && parsed.applicationsForEdit) {
    const idMatch = query.match(/value:\s*"([^"]+)"/);
    const id = idMatch?.[1];
    const source = mockSources.find(s => s.id === id);
    return {
      data: {
        sources: source
          ? [
              {
                ...source,
                applications: source.applications ?? [],
              },
            ]
          : [],
      },
    };
  }

  if (parsed.filter && parsed.operation && !parsed.limit) {
    const idMatch = query.match(/value:\s*"([^"]+)"/);
    const id = idMatch?.[1];
    const source = mockSources.find(s => s.id === id);
    return {
      data: {
        sources: source ? [source] : [],
      },
    };
  }

  let list: Source[] = [...mockSources];
  if (parsed.filterColumn && parsed.filterValue) {
    list = list.filter(s => matchesFilter(s, parsed.filterColumn!, parsed.filterValue!));
  }
  const count = list.length;
  const limit = parsed.limit ?? list.length;
  const offset = parsed.offset ?? 0;
  const sources = list.slice(offset, offset + limit);

  return {
    data: {
      sources: sources as Source[],
      meta: { count },
    },
  };
}
