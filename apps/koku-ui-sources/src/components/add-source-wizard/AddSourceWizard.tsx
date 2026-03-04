import { Button, PageSection, Title } from '@patternfly/react-core';
import React from 'react';
import { Link } from 'react-router-dom';

import { routes } from '../../routes';

/** Placeholder Add Source wizard. Cloud-specific steps show a "cloud" label per plan. */
const AddSourceWizard: React.FC = () => {
  return (
    <>
      <PageSection>
        <Title headingLevel="h1">Add source</Title>
        <p>
          <Link to={routes.sources.path}>Back to sources</Link>
        </p>
      </PageSection>
      <PageSection>
        <p>Add source wizard (placeholder). Steps: Select type → Endpoint → Authentication → Cost (cloud) → Review.</p>
        <div style={{ marginTop: '1rem', padding: '1rem', border: '1px solid #ccc', borderRadius: 4 }}>
          <span style={{ fontWeight: 'bold', padding: '4px 8px', background: '#eee', borderRadius: 4 }}>cloud</span>
          <p style={{ marginTop: '0.5rem' }}>Cost management / AWS regions step (mocked for on-prem).</p>
        </div>
        <Button variant="primary" component={props => <Link {...props} to={routes.sources.path} />}>
          Cancel
        </Button>
      </PageSection>
    </>
  );
};

export default AddSourceWizard;
