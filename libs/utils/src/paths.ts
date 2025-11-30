import { useLocation } from 'react-router-dom';

// Prefixes the given path with a basename
// Note the basename does not include a release prefix (/beta, /preview, etc.)
export const formatPath = (path: string) => {
  const basePath = '/staging/cost-management/ros';
  // routes.welcome.path is expected to be '/'
  return path === '/' ? basePath : `${basePath}${path}`;
};

export const getReleasePath = () => {
  const pathName = window.location.pathname.split('/');
  pathName.shift();

  let release = '';
  if (pathName[0] === 'beta') {
    release = `/beta`;
  }
  if (pathName[0] === 'preview') {
    release = `/preview`;
  }
  return release;
};

export const usePathname = () => {
  const location = useLocation();
  return location.pathname.replace(/\/$/, '');
};


