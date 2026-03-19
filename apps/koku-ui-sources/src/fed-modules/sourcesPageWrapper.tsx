import React from 'react';

export interface SourcesPageWrapperProps {
  canWrite?: boolean;
}

/**
 * PR 1 stub: full Sources UI is added in later PRs. Exposes the federated module entry
 * so webpack / DynamicRemotePlugin can build the `sources` remote.
 */
const SourcesPageWrapper: React.FC<SourcesPageWrapperProps> = () => (
  <div data-testid="sources-skeleton" data-ouia-component-id="sources-skeleton">
    Sources UI (skeleton — PR 1)
  </div>
);

export default SourcesPageWrapper;
