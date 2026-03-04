export const routes = {
  sources: {
    path: '/',
  },
  sourcesNew: {
    path: 'new',
  },
  sourcesRemove: {
    path: 'remove/:id',
  },
  sourcesDetail: {
    path: 'detail/:id',
  },
  sourcesDetailRename: {
    path: 'detail/:id/rename',
  },
  sourcesDetailRemove: {
    path: 'detail/:id/remove',
  },
  sourcesDetailAddApp: {
    path: 'detail/:id/add_app/:app_type_id',
  },
  sourcesDetailRemoveApp: {
    path: 'detail/:id/remove_app/:app_id',
  },
  sourcesDetailEditCredentials: {
    path: 'detail/:id/edit_credentials',
  },
} as const;

export function replaceRouteId(path: string, id: string): string {
  return path.replace(':id', id);
}
