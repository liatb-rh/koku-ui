import React from 'react';

interface OptimizationsTableLayoutProps {
  topToolbar?: React.ReactNode;
  isLoading?: boolean;
  loading?: React.ReactNode;
  table?: React.ReactNode;
  bottomPagination?: React.ReactNode;
}

const OptimizationsTableLayout: React.FC<OptimizationsTableLayoutProps> = ({
  topToolbar,
  isLoading,
  loading,
  table,
  bottomPagination,
}) => {
  return (
    <>
      {topToolbar}
      {isLoading ? (
        loading
      ) : (
        <>
          {table}
          {bottomPagination}
        </>
      )}
    </>
  );
};

export { OptimizationsTableLayout };


