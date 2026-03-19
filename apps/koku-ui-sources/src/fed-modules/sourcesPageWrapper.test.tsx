import { render, screen } from '@testing-library/react';
import React from 'react';

import SourcesPageWrapper from './sourcesPageWrapper';

describe('SourcesPageWrapper (PR1 stub)', () => {
  it('renders skeleton placeholder', () => {
    render(<SourcesPageWrapper />);
    expect(screen.getByTestId('sources-skeleton')).toBeInTheDocument();
  });
});
