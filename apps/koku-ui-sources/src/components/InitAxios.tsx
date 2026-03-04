import { useChrome } from '@koku-ui/onprem-cloud-deps/frontend-components/useChrome';
import React, { useEffect } from 'react';

import { initAxios } from '../api/entities';

interface InitAxiosProps {
  children: React.ReactNode;
}

const InitAxios: React.FC<InitAxiosProps> = ({ children }) => {
  const chrome = useChrome();
  useEffect(() => {
    initAxios(chrome?.auth?.getUser, chrome?.auth?.logout);
  }, [chrome]);
  return <>{children}</>;
};

export default InitAxios;
