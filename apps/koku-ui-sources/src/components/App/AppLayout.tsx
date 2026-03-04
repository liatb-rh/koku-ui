import { Masthead, MastheadBrand, MastheadMain, Page, PageSection } from '@patternfly/react-core';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import DetailPage from '../../pages/Detail';
import SourcesPage from '../../pages/Sources';
import { routes } from '../../routes';
import AddSourceWizard from '../add-source-wizard/AddSourceWizard';
import DataLoader from '../DataLoader';
import ErrorBoundary from '../ErrorBoundary';

const AppLayout: React.FC = () => {
  const masthead = (
    <Masthead>
      <MastheadMain>
        <MastheadBrand>Integrations</MastheadBrand>
      </MastheadMain>
    </Masthead>
  );

  return (
    <Page mainContainerId="primary-app-container" masthead={masthead}>
      <DataLoader />
      <PageSection isFilled>
        <ErrorBoundary>
          <Routes>
            <Route path={routes.sources.path} element={<SourcesPage />} />
            <Route path={routes.sourcesNew.path} element={<AddSourceWizard />} />
            <Route path={routes.sourcesRemove.path} element={<div>Remove source modal (placeholder)</div>} />
            <Route path={routes.sourcesDetail.path} element={<DetailPage />} />
            <Route path={`${routes.sourcesDetail.path}/rename`} element={<DetailPage />} />
            <Route path={`${routes.sourcesDetail.path}/remove`} element={<DetailPage />} />
            <Route path={`${routes.sourcesDetail.path}/add_app/:app_type_id`} element={<DetailPage />} />
            <Route path={`${routes.sourcesDetail.path}/remove_app/:app_id`} element={<DetailPage />} />
            <Route path={`${routes.sourcesDetail.path}/edit_credentials`} element={<DetailPage />} />
          </Routes>
        </ErrorBoundary>
      </PageSection>
    </Page>
  );
};

export default AppLayout;
