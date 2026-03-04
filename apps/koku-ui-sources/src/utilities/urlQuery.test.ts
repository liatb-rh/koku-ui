import { parseQueryFromSearch } from './urlQuery';

describe('urlQuery', () => {
  describe('parseQueryFromSearch', () => {
    it('returns empty object for empty search', () => {
      expect(parseQueryFromSearch('')).toEqual({});
    });

    it('parses activeCategory', () => {
      expect(parseQueryFromSearch('?activeCategory=Red%20Hat')).toEqual({ activeCategory: 'Red Hat' });
    });

    it('parses page and perPage', () => {
      expect(parseQueryFromSearch('?page=2&perPage=25')).toEqual({ pageNumber: 2, pageSize: 25 });
    });

    it('parses sortBy and sortDirection', () => {
      expect(parseQueryFromSearch('?sortBy=name&sortDirection=asc')).toEqual({
        sortBy: 'name',
        sortDirection: 'asc',
      });
    });

    it('defaults pageNumber to 1 when page is invalid', () => {
      expect(parseQueryFromSearch('?page=abc&perPage=50')).toEqual({ pageNumber: 1, pageSize: 50 });
    });

    it('defaults pageSize to 50 when perPage is invalid', () => {
      expect(parseQueryFromSearch('?page=1&perPage=xyz')).toEqual({ pageNumber: 1, pageSize: 50 });
    });

    it('parses combined query', () => {
      expect(
        parseQueryFromSearch('?activeCategory=Cloud&page=3&perPage=20&sortBy=created_at&sortDirection=desc')
      ).toEqual({
        activeCategory: 'Cloud',
        pageNumber: 3,
        pageSize: 20,
        sortBy: 'created_at',
        sortDirection: 'desc',
      });
    });
  });
});
