import { replaceRouteId, routes } from './routes';

describe('routes', () => {
  describe('replaceRouteId', () => {
    const id = '628782';

    it('does nothing when path has no :id', () => {
      expect(replaceRouteId(routes.sources.path, id)).toBe(routes.sources.path);
    });

    it('replaces :id with id in detail path', () => {
      expect(replaceRouteId(routes.sourcesDetail.path, id)).toBe(`detail/${id}`);
    });

    it('replaces :id in removal path', () => {
      expect(replaceRouteId(routes.sourcesRemove.path, id)).toBe(`remove/${id}`);
    });

    it('replaces :id in detail/rename path', () => {
      expect(replaceRouteId(routes.sourcesDetailRename.path, id)).toBe(`detail/${id}/rename`);
    });

    it('replaces :id in detail/remove path', () => {
      expect(replaceRouteId(routes.sourcesDetailRemove.path, id)).toBe(`detail/${id}/remove`);
    });

    it('replaces :id in detail/addApp path', () => {
      expect(replaceRouteId(routes.sourcesDetailAddApp.path, id)).toBe(`detail/${id}/add_app/:app_type_id`);
    });

    it('replaces :id in detail/removeApp path', () => {
      expect(replaceRouteId(routes.sourcesDetailRemoveApp.path, id)).toBe(`detail/${id}/remove_app/:app_id`);
    });

    it('replaces :id in detail/edit_credentials path', () => {
      expect(replaceRouteId(routes.sourcesDetailEditCredentials.path, id)).toBe(`detail/${id}/edit_credentials`);
    });
  });

  describe('route paths', () => {
    it('defines expected route paths', () => {
      expect(routes.sources.path).toBe('/');
      expect(routes.sourcesNew.path).toBe('new');
      expect(routes.sourcesRemove.path).toBe('remove/:id');
      expect(routes.sourcesDetail.path).toBe('detail/:id');
    });
  });
});
