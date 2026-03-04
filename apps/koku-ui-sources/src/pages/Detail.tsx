import { Breadcrumb, BreadcrumbItem, PageSection, Title } from '@patternfly/react-core';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { getSourcesApi } from '../api/entities';
import type { Source } from '../api/types';
import type { RootState } from '../redux/store';
import { routes } from '../routes';

const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const entities = useSelector((state: RootState) => state.sources.entities);
  const [source, setSource] = useState<Source | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    const fromState = (entities as Source[]).find(e => e.id === id);
    if (fromState) {
      setSource(fromState);
      setLoading(false);
      return;
    }
    getSourcesApi()
      .showSource(id)
      .then(s => {
        setSource(s);
      })
      .finally(() => setLoading(false));
  }, [id, entities]);

  if (loading) {
    return (
      <PageSection>
        <p>Loading source...</p>
      </PageSection>
    );
  }

  if (!source) {
    return (
      <PageSection>
        <p>Source not found.</p>
        <Link to={routes.sources.path}>Back to sources</Link>
      </PageSection>
    );
  }

  return (
    <>
      <PageSection>
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to={routes.sources.path}>Sources</Link>
          </BreadcrumbItem>
          <BreadcrumbItem isActive>{source.name ?? source.id}</BreadcrumbItem>
        </Breadcrumb>
      </PageSection>
      <PageSection>
        <Title headingLevel="h1">{source.name ?? source.id}</Title>
        <dl style={{ marginTop: '1rem' }}>
          <dt>ID</dt>
          <dd>{source.id}</dd>
          <dt>Source type</dt>
          <dd>{source.source_type_id}</dd>
          <dt>Availability</dt>
          <dd>{source.availability_status ?? '—'}</dd>
          <dt>Applications</dt>
          <dd>{source.applications?.length ?? 0}</dd>
        </dl>
        <p style={{ marginTop: '1rem' }}>
          <Link to={routes.sources.path}>Back to sources</Link>
        </p>
      </PageSection>
    </>
  );
};

export default DetailPage;
