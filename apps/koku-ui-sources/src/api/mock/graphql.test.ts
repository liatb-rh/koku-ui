import { mockGraphQL } from './graphql';
import { mockSources } from './sources';

describe('mock graphql', () => {
  it('returns sources list and meta count for list query', () => {
    const result = mockGraphQL({
      query: '{ sources(limit:50, offset:0) { id name } meta{count} }',
    });
    expect(result.data?.sources).toEqual(mockSources);
    expect(result.data?.meta?.count).toBe(mockSources.length);
  });

  it('returns single source for filter by id query', () => {
    const id = mockSources[0].id;
    const result = mockGraphQL({
      query: `{ sources(filter: { name: "id", operation: "eq", value: "${id}" }) { id name } }`,
    });
    expect(result.data?.sources).toHaveLength(1);
    expect(result.data?.sources?.[0].id).toBe(id);
  });

  it('returns empty array for unknown id', () => {
    const result = mockGraphQL({
      query: '{ sources(filter: { name: "id", operation: "eq", value: "nonexistent" }) { id } }',
    });
    expect(result.data?.sources).toEqual([]);
  });
});
