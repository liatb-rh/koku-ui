import React from 'react';
import { Link } from 'react-router-dom';

interface OptimizationsLinkProps {
  count?: number;
  linkPath?: string;
  linkState?: any;
}

const OptimizationsLink: React.FC<OptimizationsLinkProps> = ({ count = 0, linkPath, linkState }) => {
  if (!count || count === 0) {
    return <>{count}</>;
  }
  if (!linkPath) {
    return <>{count}</>;
  }
  return (
    <Link
      to={linkPath}
      state={{
        ...(linkState && linkState),
      }}
    >
      {count}
    </Link>
  );
};

export { OptimizationsLink };


